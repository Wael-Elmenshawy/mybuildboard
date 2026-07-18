from __future__ import annotations

import uuid

from fastapi import HTTPException, status

from app.assets.service import AssetService
from app.assets.schema import AssetCreate
from app.profiles.model import Profile
from app.profiles.repository import ProfileRepository
from app.profiles.schema import ProfileCreate, ProfileUpdate
from app.storage.constants import StorageFolder
from app.storage.service import StorageService


class ProfileService:
    def __init__(
        self,
        repository: ProfileRepository,
        asset_service: AssetService,
        storage_service: StorageService,
    ):
        self.repository = repository
        self.asset_service = asset_service
        self.storage_service = storage_service

    def get_profile(self, user_id: uuid.UUID) -> Profile | None:
        profile = self.repository.get_by_user_id_with_avatar(user_id)

        return self._attach_avatar_url(profile)

    def create_profile(
        self,
        user_id: uuid.UUID,
        profile: ProfileCreate,
    ) -> Profile:
        new_profile = Profile(
            user_id=user_id,
            **profile.model_dump(),
        )

        created_profile = self.repository.create(new_profile)

        return self._attach_avatar_url(created_profile)

    def update_profile(
        self,
        user_id: uuid.UUID,
        profile: ProfileUpdate,
    ) -> Profile | None:
        existing = self.repository.get_by_user_id_with_avatar(user_id)

        if existing is None:
            return None

        for key, value in profile.model_dump(
            exclude_unset=True,
        ).items():
            setattr(existing, key, value)

        updated_profile = self.repository.update(existing)

        return self._attach_avatar_url(updated_profile)

    def upload_avatar(
        self,
        user_id: uuid.UUID,
        *,
        file_bytes: bytes,
        filename: str,
        content_type: str,
    ) -> Profile:
        profile = self._get_profile_or_404(user_id)
        previous_avatar = profile.avatar

        upload_result = self.storage_service.upload(
            file_bytes=file_bytes,
            filename=filename,
            content_type=content_type,
            folder=StorageFolder.AVATARS,
        )

        asset_data = AssetCreate(
            owner_id=profile.user_id,
            storage_key=upload_result.object_key,
            original_filename=filename,
            content_type=content_type,
            size=len(file_bytes),
            folder=StorageFolder.AVATARS,
            is_public=True,
        )

        try:
            asset = self.asset_service.create(asset_data)
        except Exception:
            self.storage_service.delete(
                object_key=upload_result.object_key,
            )
            raise

        try:
            updated_profile = self.repository.update_avatar_reference(
                profile.id,
                asset.id,
            )

            if updated_profile is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Profile not found.",
                )
        except Exception:
            self._cleanup_avatar_resources(
                object_key=upload_result.object_key,
                asset_id=asset.id,
            )
            raise

        updated_profile.avatar_url = upload_result.public_url

        if previous_avatar is not None:
            self._cleanup_avatar_resources(
                object_key=previous_avatar.storage_key,
                asset_id=previous_avatar.id,
            )

        return updated_profile

    def remove_avatar(
        self,
        user_id: uuid.UUID,
    ) -> Profile:
        profile = self._get_profile_or_404(user_id)
        previous_avatar = profile.avatar

        if previous_avatar is None:
            profile.avatar_url = None
            return profile

        updated_profile = self.repository.remove_avatar_reference(profile.id)

        if updated_profile is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found.",
            )

        updated_profile.avatar_url = None

        self._cleanup_avatar_resources(
            object_key=previous_avatar.storage_key,
            asset_id=previous_avatar.id,
        )

        return updated_profile

    def _get_profile_or_404(
        self,
        user_id: uuid.UUID,
    ) -> Profile:
        profile = self.repository.get_by_user_id_with_avatar(user_id)

        if profile is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Profile not found.",
            )

        return profile

    def _attach_avatar_url(
        self,
        profile: Profile | None,
    ) -> Profile | None:
        if profile is None:
            return None

        avatar = getattr(profile, "avatar", None)

        if avatar is None:
            profile.avatar_url = None
            return profile

        profile.avatar_url = self.storage_service.get_public_url(
            object_key=avatar.storage_key,
        )

        return profile

    def _cleanup_avatar_resources(
        self,
        *,
        object_key: str,
        asset_id: uuid.UUID,
    ) -> None:
        cleanup_error: Exception | None = None

        try:
            self.storage_service.delete(
                object_key=object_key,
            )
        except Exception as exc:
            cleanup_error = exc

        asset = self.asset_service.get_by_id(asset_id)

        if asset is not None:
            try:
                self.asset_service.delete(asset)
            except Exception as exc:
                if cleanup_error is None:
                    cleanup_error = exc
        elif cleanup_error is None:
            cleanup_error = HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Asset not found during cleanup.",
            )

        if cleanup_error is not None:
            raise cleanup_error
