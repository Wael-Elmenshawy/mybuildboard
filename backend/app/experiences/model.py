from __future__ import annotations

import uuid
from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.users.model import User


class EmploymentType(StrEnum):
    FULL_TIME = "full_time"
    PART_TIME = "part_time"
    CONTRACT = "contract"
    FREELANCE = "freelance"
    INTERNSHIP = "internship"
    VOLUNTEER = "volunteer"


class Experience(BaseModel):
    __tablename__ = "experiences"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    company: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    position: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    employment_type: Mapped[EmploymentType] = mapped_column(
        SqlEnum(
            EmploymentType,
            values_callable=lambda enum: [e.value for e in enum],
            native_enum=True,
        ),
        default=EmploymentType.FULL_TIME,
        nullable=False,
    )

    location: Mapped[str | None] = mapped_column(
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
        back_populates="experiences",
    )
