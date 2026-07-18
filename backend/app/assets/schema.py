"""
Asset schemas.
"""

from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.storage.constants import StorageFolder


class AssetCreate(BaseModel):
    """
    Data required to create a new asset.
    """

    owner_id: uuid.UUID

    storage_key: str

    original_filename: str

    content_type: str

    size: int

    folder: StorageFolder

    is_public: bool = True


class AssetResponse(BaseModel):
    """
    Asset response schema.
    """

    id: uuid.UUID

    owner_id: uuid.UUID

    storage_key: str

    original_filename: str

    content_type: str

    size: int

    folder: StorageFolder

    is_public: bool

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )