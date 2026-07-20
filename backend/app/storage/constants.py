"""
Storage constants.

This module contains all storage-related constants shared across
the application.
"""

from __future__ import annotations

from enum import StrEnum


class StorageFolder(StrEnum):
    """
    Storage folders inside the bucket.
    """

    AVATARS = "avatars"
    PROJECTS = "projects"
    CERTIFICATES = "certificates"
    ACHIEVEMENTS = "achievements"
    RESUMES = "resumes"
    BOARDS = "boards"


MAX_FILE_SIZE = 10 * 1024 * 1024
"""
Maximum allowed upload size (10 MB).
"""


ALLOWED_IMAGE_CONTENT_TYPES: frozenset[str] = frozenset(
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
    }
)


ALLOWED_DOCUMENT_CONTENT_TYPES: frozenset[str] = frozenset(
    {
        "application/pdf",
    }
)


IMAGE_EXTENSIONS: frozenset[str] = frozenset(
    {
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif",
    }
)


DOCUMENT_EXTENSIONS: frozenset[str] = frozenset(
    {
        "pdf",
    }
)
