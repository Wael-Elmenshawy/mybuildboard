from __future__ import annotations

from app.integrations.cloudflare.provider import CloudflareStorageProvider
from app.storage.service import StorageService


def get_storage_service() -> StorageService:
    """
    Dependency that returns the storage service.
    """

    provider = CloudflareStorageProvider()

    return StorageService(
        provider=provider,
    )
