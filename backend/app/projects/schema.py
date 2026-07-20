from __future__ import annotations

import re
import uuid

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    HttpUrl,
    field_validator,
)

from app.projects.model import (
    ProjectStatus,
    ProjectVisibility,
)

SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


class ProjectCreate(BaseModel):
    board_id: uuid.UUID

    title: str = Field(
        min_length=3,
        max_length=200,
    )

    slug: str = Field(
        min_length=3,
        max_length=200,
    )

    short_description: str | None = Field(
        default=None,
        max_length=500,
    )

    description: str | None = None

    github_url: HttpUrl | None = None
    live_url: HttpUrl | None = None
    video_url: HttpUrl | None = None
    thumbnail_url: HttpUrl | None = None

    technologies: list[str] = Field(
        default_factory=list,
        max_length=20,
    )

    display_order: int = Field(
        default=0,
        ge=0,
    )

    is_featured: bool = False

    visibility: ProjectVisibility = ProjectVisibility.PUBLIC

    status: ProjectStatus = ProjectStatus.PUBLISHED

    @field_validator("slug")
    @classmethod
    def validate_slug(cls, value: str) -> str:
        if not SLUG_PATTERN.fullmatch(value):
            raise ValueError(
                "Slug must contain only lowercase letters, numbers and hyphens."
            )
        return value

    @field_validator("technologies")
    @classmethod
    def validate_technologies(
        cls,
        value: list[str],
    ) -> list[str]:
        cleaned: list[str] = []

        for item in value:
            item = item.strip()

            if not item:
                continue

            if len(item) > 50:
                raise ValueError("Technology name is too long.")

            if item not in cleaned:
                cleaned.append(item)

        return cleaned


class ProjectUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        max_length=200,
    )

    slug: str | None = Field(
        default=None,
        max_length=200,
    )

    short_description: str | None = Field(
        default=None,
        max_length=500,
    )

    description: str | None = None

    github_url: HttpUrl | None = None
    live_url: HttpUrl | None = None
    video_url: HttpUrl | None = None
    thumbnail_url: HttpUrl | None = None

    technologies: list[str] | None = Field(
        default=None,
        max_length=20,
    )

    display_order: int | None = Field(
        default=None,
        ge=0,
    )

    is_featured: bool | None = None

    visibility: ProjectVisibility | None = None

    status: ProjectStatus | None = None

    @field_validator("slug")
    @classmethod
    def validate_slug(
        cls,
        value: str | None,
    ) -> str | None:
        if value is None:
            return value

        if not SLUG_PATTERN.fullmatch(value):
            raise ValueError(
                "Slug must contain only lowercase letters, numbers and hyphens."
            )

        return value

    @field_validator("technologies")
    @classmethod
    def validate_technologies(
        cls,
        value: list[str] | None,
    ) -> list[str] | None:
        if value is None:
            return value

        cleaned: list[str] = []

        for item in value:
            item = item.strip()

            if not item:
                continue

            if len(item) > 50:
                raise ValueError("Technology name is too long.")

            if item not in cleaned:
                cleaned.append(item)

        return cleaned


class ProjectResponse(BaseModel):
    id: uuid.UUID
    board_id: uuid.UUID

    title: str
    slug: str

    short_description: str | None
    description: str | None

    github_url: HttpUrl | None
    live_url: HttpUrl | None
    video_url: HttpUrl | None
    thumbnail_url: HttpUrl | None

    technologies: list[str]

    display_order: int

    is_featured: bool

    is_imported_from_github: bool

    visibility: ProjectVisibility

    status: ProjectStatus

    model_config = ConfigDict(
        from_attributes=True,
    )
