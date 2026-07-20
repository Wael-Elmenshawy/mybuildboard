"""
Storage provider interface.

This module defines the contract that every storage provider
(Cloudflare R2, AWS S3, Azure Blob, MinIO, etc.) must implement.
"""

from __future__ import annotations

from abc import ABC, abstractmethod


class StorageProvider(ABC):
    """
    Abstract storage provider.

    Every storage implementation must inherit from this interface.
    """

    @abstractmethod
    def upload(
        self,
        *,
        file_bytes: bytes,
        object_key: str,
        content_type: str,
    ) -> str:
        """
        Upload a file and return its public URL.
        """
        raise NotImplementedError

    @abstractmethod
    def delete(
        self,
        *,
        object_key: str,
    ) -> None:
        """
        Delete an object from storage.
        """
        raise NotImplementedError

    @abstractmethod
    def exists(
        self,
        *,
        object_key: str,
    ) -> bool:
        """
        Check whether an object exists.
        """
        raise NotImplementedError

    @abstractmethod
    def generate_public_url(
        self,
        *,
        object_key: str,
    ) -> str:
        """
        Generate the public URL for an object.
        """
        raise NotImplementedError
