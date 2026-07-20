"""
Custom exceptions for the Cloudflare R2 integration.

These exceptions isolate provider-specific errors from the rest
of the application, allowing the Storage layer to remain provider-agnostic.
"""


class CloudflareStorageError(Exception):
    """
    Base exception for all Cloudflare R2 storage errors.
    """

    def __init__(self, message: str = "Cloudflare storage error.") -> None:
        super().__init__(message)


class CloudflareUploadError(CloudflareStorageError):
    """
    Raised when an upload operation fails.
    """

    def __init__(
        self, message: str = "Failed to upload file to Cloudflare R2."
    ) -> None:
        super().__init__(message)


class CloudflareDeleteError(CloudflareStorageError):
    """
    Raised when a delete operation fails.
    """

    def __init__(
        self, message: str = "Failed to delete file from Cloudflare R2."
    ) -> None:
        super().__init__(message)


class CloudflareFileNotFoundError(CloudflareStorageError):
    """
    Raised when the requested object does not exist.
    """

    def __init__(self, message: str = "File not found in Cloudflare R2.") -> None:
        super().__init__(message)


class CloudflareConfigurationError(CloudflareStorageError):
    """
    Raised when Cloudflare R2 configuration is invalid or incomplete.
    """

    def __init__(
        self,
        message: str = "Cloudflare R2 configuration is invalid.",
    ) -> None:
        super().__init__(message)
