"""
Storage schemas.
"""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class StorageUploadResult(BaseModel):
    """
    Result returned after a successful upload.
    """

    object_key: str
    public_url: str
    content_type: str

    model_config = ConfigDict(
        frozen=True,
    )
