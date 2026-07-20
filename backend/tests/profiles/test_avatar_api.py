from __future__ import annotations

import uuid

from app.auth.jwt import create_access_token
from app.assets.repository import AssetRepository
from app.profiles.model import Profile
from app.profiles.repository import ProfileRepository
from app.storage.constants import MAX_FILE_SIZE


def _auth_headers(user_id: uuid.UUID) -> dict[str, str]:
    token = create_access_token({"sub": str(user_id)})
    return {"Authorization": f"Bearer {token}"}


def _upload_avatar(
    client,
    headers: dict[str, str],
    *,
    filename: str = "avatar.png",
    content_type: str = "image/png",
    body: bytes = b"avatar-bytes",
):
    return client.post(
        "/api/v1/profiles/me/avatar",
        headers=headers,
        files={"file": (filename, body, content_type)},
    )


def test_upload_avatar_successfully(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    user, profile = seeded_user_profile

    response = _upload_avatar(
        client,
        _auth_headers(user.id),
    )

    assert response.status_code == 200

    body = response.json()
    assert body["id"] == str(profile.id)
    assert body["user_id"] == str(user.id)
    assert body["avatar_url"] is not None


    refreshed_profile = ProfileRepository(db_session).get_by_user_id(user.id)


    assert refreshed_profile is not None
    assert refreshed_profile.avatar_asset_id is not None

    asset = AssetRepository(db_session).get_by_id(refreshed_profile.avatar_asset_id)
    assert asset is not None
    assert asset.owner_id == user.id
    assert asset.storage_key in fake_storage_provider.objects
    assert fake_storage_provider.upload_calls


def test_replace_existing_avatar_removes_old_asset_and_keeps_new_one(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    user, _ = seeded_user_profile
    headers = _auth_headers(user.id)

    first_response = _upload_avatar(
        client,
        headers,
        filename="avatar-1.png",
        body=b"first-avatar",
    )
    assert first_response.status_code == 200

    first_profile = ProfileRepository(db_session).get_by_user_id(user.id)
    assert first_profile is not None
    first_asset_id = first_profile.avatar_asset_id
    assert first_asset_id is not None

    first_asset = AssetRepository(db_session).get_by_id(first_asset_id)
    assert first_asset is not None
    first_storage_key = first_asset.storage_key

    second_response = _upload_avatar(
        client,
        headers,
        filename="avatar-2.png",
        body=b"second-avatar",
    )
    assert second_response.status_code == 200

    refreshed_profile = ProfileRepository(db_session).get_by_user_id(user.id)
   
    assert refreshed_profile is not None
    assert refreshed_profile.avatar_asset_id is not None
    assert refreshed_profile.avatar_asset_id != first_asset_id

    second_asset = AssetRepository(db_session).get_by_id(refreshed_profile.avatar_asset_id)
    assert second_asset is not None
    assert second_asset.storage_key in fake_storage_provider.objects
    assert AssetRepository(db_session).get_by_id(first_asset_id) is None
    assert first_storage_key not in fake_storage_provider.objects
    assert first_storage_key in fake_storage_provider.delete_calls


def test_replace_avatar_keeps_new_avatar_when_old_cleanup_fails(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    user, _ = seeded_user_profile
    headers = _auth_headers(user.id)

    first_response = _upload_avatar(
        client,
        headers,
        filename="avatar-1.png",
        body=b"first-avatar",
    )
    assert first_response.status_code == 200

    first_profile = ProfileRepository(db_session).get_by_user_id(user.id)
    assert first_profile is not None
    first_asset = AssetRepository(db_session).get_by_id(first_profile.avatar_asset_id)
    assert first_asset is not None
    fake_storage_provider.delete_fail_keys.add(first_asset.storage_key)

    second_response = _upload_avatar(
        client,
        headers,
        filename="avatar-2.png",
        body=b"second-avatar",
    )

    assert second_response.status_code == 500

    refreshed_profile = ProfileRepository(db_session).get_by_user_id(user.id)
    assert refreshed_profile is not None
    assert refreshed_profile.avatar_asset_id is not None

    new_asset = AssetRepository(db_session).get_by_id(refreshed_profile.avatar_asset_id)
    assert new_asset is not None
    assert new_asset.storage_key in fake_storage_provider.objects
    assert AssetRepository(db_session).get_by_id(first_asset.id) is None


def test_delete_avatar_removes_asset_and_clears_profile_reference(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    user, _ = seeded_user_profile
    headers = _auth_headers(user.id)

    upload_response = _upload_avatar(client, headers)
    assert upload_response.status_code == 200

    profile_before_delete = ProfileRepository(db_session).get_by_user_id(user.id)
    assert profile_before_delete is not None
    asset_id = profile_before_delete.avatar_asset_id
    assert asset_id is not None

    asset = AssetRepository(db_session).get_by_id(asset_id)
    assert asset is not None
    storage_key = asset.storage_key

    response = client.delete(
        "/api/v1/profiles/me/avatar",
        headers=headers,
    )

    assert response.status_code == 204
    assert response.content == b""

    refreshed_profile = ProfileRepository(db_session).get_by_user_id(user.id)
    assert refreshed_profile is not None
    assert refreshed_profile.avatar_asset_id is None
    assert AssetRepository(db_session).get_by_id(asset_id) is None
    assert storage_key not in fake_storage_provider.objects
    assert storage_key in fake_storage_provider.delete_calls


def test_upload_avatar_with_unsupported_content_type_returns_error_and_does_not_store(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    user, profile = seeded_user_profile
    headers = _auth_headers(user.id)

    response = _upload_avatar(
        client,
        headers,
        filename="avatar.txt",
        content_type="text/plain",
        body=b"not-an-image",
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported file type."
    assert fake_storage_provider.upload_calls == []
    assert ProfileRepository(db_session).get_by_user_id(user.id).avatar_asset_id is None
    assert AssetRepository(db_session).get_all() == []


def test_upload_avatar_with_oversized_file_returns_validation_error(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    user, profile = seeded_user_profile
    headers = _auth_headers(user.id)

    response = _upload_avatar(
        client,
        headers,
        body=b"x" * (MAX_FILE_SIZE + 1),
    )

    assert response.status_code == 413
    assert response.json()["detail"] == "File exceeds the maximum allowed size."
    assert fake_storage_provider.upload_calls == []
    refreshed_profile = ProfileRepository(db_session).get_by_user_id(user.id)
    assert refreshed_profile is not None
    assert refreshed_profile.avatar_asset_id is None
    assert AssetRepository(db_session).get_all() == []


def test_upload_avatar_requires_authentication(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    _, profile = seeded_user_profile
    before_profile_count = db_session.query(Profile).count()

    response = _upload_avatar(client, headers={})

    assert response.status_code == 401
    assert db_session.query(Profile).count() == before_profile_count
    assert fake_storage_provider.upload_calls == []
    assert ProfileRepository(db_session).get_by_user_id(profile.user_id) is not None


def test_delete_avatar_requires_authentication(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    user, profile = seeded_user_profile
    headers = _auth_headers(user.id)

    upload_response = _upload_avatar(client, headers)
    assert upload_response.status_code == 200

    before_profile_count = db_session.query(Profile).count()
    response = client.delete("/api/v1/profiles/me/avatar")

    assert response.status_code == 401
    assert db_session.query(Profile).count() == before_profile_count
    refreshed_profile = ProfileRepository(db_session).get_by_user_id(user.id)
    assert refreshed_profile is not None
    assert refreshed_profile.avatar_asset_id is not None
    assert fake_storage_provider.objects


def test_profile_response_populates_avatar_url_dynamically(
    client,
    db_session,
    fake_storage_provider,
    seeded_user_profile,
):
    user, _ = seeded_user_profile
    headers = _auth_headers(user.id)

    upload_response = _upload_avatar(client, headers)
    assert upload_response.status_code == 200

    profile_response = client.get(
        "/api/v1/profiles/me",
        headers=headers,
    )

    assert profile_response.status_code == 200
    body = profile_response.json()
    assert body["avatar_url"] is not None

    db_session.expunge_all()
    
    refreshed_profile = ProfileRepository(db_session).get_by_user_id(user.id)
    assert refreshed_profile is not None
    assert not hasattr(refreshed_profile, "avatar_url")
    assert "avatar_url" not in Profile.__table__.columns
    assert body["avatar_url"] == fake_storage_provider.generate_public_url(
        object_key=AssetRepository(db_session).get_by_id(refreshed_profile.avatar_asset_id).storage_key,
    )