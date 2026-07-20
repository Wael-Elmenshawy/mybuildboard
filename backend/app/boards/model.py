from __future__ import annotations

import uuid
from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.projects.model import Project
    from app.users.model import User


class BoardVisibility(StrEnum):
    PUBLIC = "public"
    PRIVATE = "private"
    UNLISTED = "unlisted"


class BoardStatus(StrEnum):
    ACTIVE = "active"
    ARCHIVED = "archived"
    DRAFT = "draft"


class Board(BaseModel):
    __tablename__ = "boards"

    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    slug: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        index=True,
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        String(1000),
        nullable=True,
    )

    visibility: Mapped[BoardVisibility] = mapped_column(
        SqlEnum(
            BoardVisibility,
            values_callable=lambda enum: [e.value for e in enum],
            native_enum=True,
        ),
        default=BoardVisibility.PUBLIC,
        nullable=False,
    )

    status: Mapped[BoardStatus] = mapped_column(
        SqlEnum(
            BoardStatus,
            values_callable=lambda enum: [e.value for e in enum],
            native_enum=True,
        ),
        default=BoardStatus.ACTIVE,
        nullable=False,
    )

    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    user: Mapped[User] = relationship(
        "User",
        back_populates="boards",
    )

    projects: Mapped[list[Project]] = relationship(
        "Project",
        back_populates="board",
        cascade="all, delete-orphan",
    )
