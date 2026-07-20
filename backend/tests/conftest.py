from __future__ import annotations

import os
import uuid
from pathlib import Path

import pytest
from fastapi import Depends
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

TEST_DB_FILE = Path.cwd() / "tests" / ".test_profile_avatar.db"

os.environ.setdefault("DATABASE_URL", f"sqlite:///{TEST_DB_FILE.as_posix()}")
os.environ.setdefault("SECRET_KEY", "test-secret-key")
os.environ.setdefault("ALGORITHM", "HS256")
os.environ.setdefault("ACCESS_TOKEN_EXPIRE_MINUTES", "60")
os.environ.setdefault("GITHUB_CLIENT_ID", "test-github-client-id")
os.environ.setdefault("GITHUB_CLIENT_SECRET", "test-github-client-secret")
os.environ.setdefault("GITHUB_REDIRECT_URI", "http://testserver/github/callback")
os.environ.setdefault("GITHUB_TOKEN_ENCRYPTION_KEY", "jiA3EC4RohPRAn4Bf8i8-EemHptAoZ_EmDLfaB-NDmM=")
os.environ.setdefault("FRONTEND_URL", "http://testserver")
os.environ.setdefault("R2_ACCOUNT_ID", "test-r2-account-id")
os.environ.setdefault("R2_BUCKET_NAME", "test-r2-bucket")
os.environ.setdefault("R2_ACCESS_KEY_ID", "test-r2-access-key")
os.environ.setdefault("R2_SECRET_ACCESS_KEY", "test-r2-secret-key")
os.environ.setdefault("R2_PUBLIC_URL", "https://storage.test")

if TEST_DB_FILE.exists():
    TEST_DB_FILE.unlink()

from app.api.deps import get_profile_service
from app.assets.repository import AssetRepository
from app.assets.service import AssetService
import app.assets.model  # noqa: F401
from app.db.database import Base, SessionLocal, engine
from app.db.session import get_db
from app.main import app as fastapi_app
from app.profiles.repository import ProfileRepository
from app.profiles.service import ProfileService
from app.storage.interfaces import StorageProvider
from app.storage.service import StorageService

import app.profiles.model  # noqa: F401
import app.users.model  # noqa: F401

from app.assets.model import Asset
from app.profiles.model import Profile
from app.users.model import User

TEST_TABLES = [User.__table__, Profile.__table__, Asset.__table__]


class FakeStorageProvider(StorageProvider):
    def __init__(self) -> None:
        self.objects: dict[str, bytes] = {}
        self.upload_calls: list[dict[str, str]] = []
        self.delete_calls: list[str] = []
        self.public_url_calls: list[str] = []
        self.delete_fail_keys: set[str] = set()

    def upload(
        self,
        *,
        file_bytes: bytes,
        object_key: str,
        content_type: str,
    ) -> str:
        self.upload_calls.append(
            {
                "object_key": object_key,
                "content_type": content_type,
                "size": str(len(file_bytes)),
            }
        )
        self.objects[object_key] = file_bytes

        return self.generate_public_url(
            object_key=object_key,
        )

    def delete(
        self,
        *,
        object_key: str,
    ) -> None:
        self.delete_calls.append(object_key)

        if object_key in self.delete_fail_keys:
            raise RuntimeError(f"Failed to delete {object_key}")

        self.objects.pop(object_key, None)

    def exists(
        self,
        *,
        object_key: str,
    ) -> bool:
        return object_key in self.objects

    def generate_public_url(
        self,
        *,
        object_key: str,
    ) -> str:
        self.public_url_calls.append(object_key)
        return f"https://storage.test/{object_key}"


def _clear_database() -> None:
    with SessionLocal() as db:
        for table in reversed(TEST_TABLES):
            db.execute(table.delete())
        db.commit()


@pytest.fixture(scope="session", autouse=True)
def _prepare_database() -> None:
    Base.metadata.create_all(bind=engine, tables=TEST_TABLES)
    yield
    Base.metadata.drop_all(bind=engine, tables=TEST_TABLES)
    if TEST_DB_FILE.exists():
        TEST_DB_FILE.unlink()


@pytest.fixture(autouse=True)
def _clean_database() -> None:
    _clear_database()
    yield
    _clear_database()


@pytest.fixture
def db_session() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def fake_storage_provider() -> FakeStorageProvider:
    return FakeStorageProvider()


@pytest.fixture
def client(
    db_session: Session,
    fake_storage_provider: FakeStorageProvider,
) -> TestClient:
    def override_get_db():
     yield db_session


    def override_get_profile_service(
        db: Session = Depends(get_db),
    ) -> ProfileService:
        return ProfileService(
            repository=ProfileRepository(db),
            asset_service=AssetService(AssetRepository(db)),
            storage_service=StorageService(fake_storage_provider),
        )

    fastapi_app.dependency_overrides[get_db] = override_get_db
    fastapi_app.dependency_overrides[get_profile_service] = override_get_profile_service

    with TestClient(fastapi_app, raise_server_exceptions=True) as test_client:
        yield test_client

    fastapi_app.dependency_overrides.clear() 


@pytest.fixture
def seeded_user_profile(db_session: Session):
    from app.profiles.model import Profile
    from app.users.model import User

    suffix = uuid.uuid4().hex
    email = f"avatar-{suffix}@example.com"
    username = f"avatar-{suffix}"

    user = User(
        email=email,
        username=username,
        provider="local",
        provider_id=email,
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    profile = Profile(
        user_id=user.id,
        full_name="Avatar User",
        headline="Developer",
        is_public=True,
    )
    db_session.add(profile)
    db_session.commit()
    db_session.refresh(profile)

    return user, profile