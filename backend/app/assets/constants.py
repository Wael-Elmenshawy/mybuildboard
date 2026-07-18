"""
Asset constants.
"""

from __future__ import annotations

from enum import StrEnum


class AssetFolder(StrEnum):
    """
    Logical folders used for stored assets.
    """

    AVATARS = "avatars"
    PROJECTS = "projects"
    CERTIFICATES = "certificates"
    ACHIEVEMENTS = "achievements"
    RESUMES = "resumes"
    BOARDS = "boards"