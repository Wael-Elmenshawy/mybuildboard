from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field

from app.projects.model import (
    ProjectStatus,
    ProjectVisibility,
)


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

    github_url: str | None = None
    live_url: str | None = None
    video_url: str | None = None
    thumbnail_url: str | None = None

    display_order: int = 0

    is_featured: bool = False

    visibility: ProjectVisibility = ProjectVisibility.PUBLIC

    status: ProjectStatus = ProjectStatus.PUBLISHED


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

    github_url: str | None = None
    live_url: str | None = None
    video_url: str | None = None
    thumbnail_url: str | None = None

    display_order: int | None = None

    is_featured: bool | None = None

    visibility: ProjectVisibility | None = None

    status: ProjectStatus | None = None


class ProjectResponse(BaseModel):
    id: uuid.UUID
    board_id: uuid.UUID

    title: str
    slug: str

    short_description: str | None
    description: str | None

    github_url: str | None
    live_url: str | None
    video_url: str | None
    thumbnail_url: str | None

    display_order: int

    is_featured: bool

    visibility: ProjectVisibility

    status: ProjectStatus

    model_config = ConfigDict(
        from_attributes=True,
    )