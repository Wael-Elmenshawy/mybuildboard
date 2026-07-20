"""
Cloudflare R2 storage provider implementation.
"""

from __future__ import annotations

from botocore.client import BaseClient
from botocore.exceptions import BotoCoreError, ClientError

from app.core.config.settings import settings
from app.storage.interfaces import StorageProvider

from .client import CloudflareClientFactory
from .exceptions import (
    CloudflareDeleteError,
    CloudflareFileNotFoundError,
    CloudflareUploadError,
)


class CloudflareStorageProvider(StorageProvider):
    """
    Cloudflare R2 implementation of the StorageProvider interface.
    """

    def __init__(
        self,
        client: BaseClient | None = None,
    ) -> None:
        self._client = client or CloudflareClientFactory.create()
        self._bucket_name = settings.R2_BUCKET_NAME
        self._public_url = settings.R2_PUBLIC_URL.rstrip("/")

    def upload(
        self,
        *,
        file_bytes: bytes,
        object_key: str,
        content_type: str,
    ) -> str:
        """
        Upload a file to Cloudflare R2.
        """

        try:
            self._client.put_object(
                Bucket=self._bucket_name,
                Key=object_key,
                Body=file_bytes,
                ContentType=content_type,
            )
        except (BotoCoreError, ClientError) as exc:
            raise CloudflareUploadError() from exc

        return self.generate_public_url(
            object_key=object_key,
        )

    def delete(
        self,
        *,
        object_key: str,
    ) -> None:
        """
        Delete an object from Cloudflare R2.
        """

        try:
            self._client.delete_object(
                Bucket=self._bucket_name,
                Key=object_key,
            )
        except (BotoCoreError, ClientError) as exc:
            raise CloudflareDeleteError() from exc

    def exists(
        self,
        *,
        object_key: str,
    ) -> bool:
        """
        Check whether an object exists.
        """

        try:
            self._client.head_object(
                Bucket=self._bucket_name,
                Key=object_key,
            )
            return True

        except ClientError as exc:
            error_code = exc.response.get("Error", {}).get("Code")

            if error_code in (
                "404",
                "NoSuchKey",
                "NotFound",
            ):
                return False

            raise CloudflareFileNotFoundError() from exc

    def generate_public_url(
        self,
        *,
        object_key: str,
    ) -> str:
        """
        Generate the public URL of an object.
        """

        return f"{self._public_url}/{object_key}"
