"""
Storage service.
"""

from __future__ import annotations

import uuid
from datetime import UTC, datetime
from pathlib import Path

from fastapi import HTTPException, status

from app.storage.constants import (
    ALLOWED_DOCUMENT_CONTENT_TYPES,
    ALLOWED_IMAGE_CONTENT_TYPES,
    DOCUMENT_EXTENSIONS,
    IMAGE_EXTENSIONS,
    MAX_FILE_SIZE,
    StorageFolder,
)
from app.storage.interfaces import StorageProvider
from app.storage.schema import StorageUploadResult


class StorageService:
    """
    Business logic for file storage.
    """

    def __init__(
        self,
        provider: StorageProvider,
    ) -> None:
        self.provider = provider

    def upload(
        self,
        *,
        file_bytes: bytes,
        filename: str,
        content_type: str,
        folder: StorageFolder,
    ) -> StorageUploadResult:
        """
        Validate and upload a file.
        """

        self._validate_file_size(file_bytes)
        extension = self._validate_file_type(
            filename=filename,
            content_type=content_type,
        )

        object_key = self._generate_object_key(
            folder=folder,
            extension=extension,
        )

        public_url = self.provider.upload(
            file_bytes=file_bytes,
            object_key=object_key,
            content_type=content_type,
        )

        return StorageUploadResult(
            object_key=object_key,
            public_url=public_url,
            content_type=content_type,
        )

    def delete(
        self,
        *,
        object_key: str,
    ) -> None:
        """
        Delete an uploaded object.
        """

        self.provider.delete(
            object_key=object_key,
        )

    def get_public_url(
        self,
        *,
        object_key: str,
    ) -> str:
        """
        Generate the public URL for an object.
        """

        return self.provider.generate_public_url(
            object_key=object_key,
        )

    @staticmethod
    def _validate_file_size(
        file_bytes: bytes,
    ) -> None:
        """
        Validate maximum upload size.
        """

        if len(file_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File exceeds the maximum allowed size.",
            )

    @staticmethod
    def _validate_file_type(
        *,
        filename: str,
        content_type: str,
    ) -> str:
        """
        Validate file extension and MIME type.
        """

        extension = Path(filename).suffix.lower().lstrip(".")

        if extension in IMAGE_EXTENSIONS:
            if content_type not in ALLOWED_IMAGE_CONTENT_TYPES:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid image content type.",
                )

            return extension

        if extension in DOCUMENT_EXTENSIONS:
            if content_type not in ALLOWED_DOCUMENT_CONTENT_TYPES:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid document content type.",
                )

            return extension

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type.",
        )

    @staticmethod
    def _generate_object_key(
        *,
        folder: StorageFolder,
        extension: str,
    ) -> str:
        """
        Generate a unique storage object key.
        """

        today = datetime.now(UTC)

        return (
            f"{folder.value}/"
            f"{today.year}/"
            f"{today.month:02d}/"
            f"{uuid.uuid4()}.{extension}"
        )