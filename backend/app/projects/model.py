import uuid
from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.boards.model import Board


class ProjectStatus(StrEnum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class ProjectVisibility(StrEnum):
    PUBLIC = "public"
    PRIVATE = "private"
    UNLISTED = "unlisted"


class Project(BaseModel):
    __tablename__ = "projects"

    board_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("boards.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    slug: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
        index=True,
    )

    short_description: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    github_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    live_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    video_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    thumbnail_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )
    technologies: Mapped[list[str]] = mapped_column(
    ARRAY(String),
    default=list,
    nullable=False,
    )

    display_order: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )
    is_imported_from_github: Mapped[bool] = mapped_column(
    Boolean,
    default=False,
    nullable=False,
    )
    source_github_repo_id: Mapped[uuid.UUID | None] = mapped_column(
    UUID(as_uuid=True),
    nullable=True,
    )

    visibility: Mapped[ProjectVisibility] = mapped_column(
    SqlEnum(
        ProjectVisibility,
        values_callable=lambda enum: [e.value for e in enum],
        native_enum=True,
    ),
    default=ProjectVisibility.PUBLIC,
    nullable=False,
    )

    status: Mapped[ProjectStatus] = mapped_column(
    SqlEnum(
        ProjectStatus,
        values_callable=lambda enum: [e.value for e in enum],
        native_enum=True,
    ),
    default=ProjectStatus.PUBLISHED,
    nullable=False,
    )

    board: Mapped[Board] = relationship(
        "Board",
        back_populates="projects",
    )
