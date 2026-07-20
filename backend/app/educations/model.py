from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.users.model import User


class Education(BaseModel):
    __tablename__ = "educations"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    institution: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    degree: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    field_of_study: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    start_date: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    end_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    is_current: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    display_order: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        "User",
        back_populates="educations",
    )
