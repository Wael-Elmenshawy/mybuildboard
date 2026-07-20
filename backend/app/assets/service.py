from __future__ import annotations

import uuid

from app.assets.model import Asset
from app.assets.repository import AssetRepository
from app.assets.schema import AssetCreate, AssetResponse


class AssetService:
    """
    Business logic responsible for managing asset metadata.

    This service only manages database records.
    Uploading and deleting physical files is delegated to StorageService.
    """

    def __init__(
        self,
        repository: AssetRepository,
    ) -> None:
        self.repository = repository

    def create(
        self,
        data: AssetCreate,
    ) -> AssetResponse:
        """
        Create a new asset record.
        """

        asset = Asset(
            owner_id=data.owner_id,
            storage_key=data.storage_key,
            original_filename=data.original_filename,
            content_type=data.content_type,
            size=data.size,
            folder=data.folder,
            is_public=data.is_public,
        )

        asset = self.repository.create(asset)

        return AssetResponse.model_validate(asset)

    def get_by_id(
        self,
        asset_id: uuid.UUID,
    ) -> Asset | None:
        """
        Retrieve an asset by its ID.
        """

        return self.repository.get_by_id(asset_id)

    def get_by_owner(
        self,
        owner_id: uuid.UUID,
    ) -> list[Asset]:
        """
        Retrieve all assets owned by a user.
        """

        return self.repository.get_by_owner(owner_id)

    def get_by_storage_key(
        self,
        storage_key: str,
    ) -> Asset | None:
        """
        Retrieve an asset by its storage key.
        """

        return self.repository.get_by_storage_key(storage_key)

    def delete(
        self,
        asset: Asset,
    ) -> None:
        """
        Delete an asset record from the database.
        """

        self.repository.delete(asset)
