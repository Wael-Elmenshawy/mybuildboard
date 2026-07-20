from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.users.model import User


class Certificate(BaseModel):
    __tablename__ = "certificates"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    name: Mapped[str] = mapped_column(String(200), nullable=False)

    issuer: Mapped[str] = mapped_column(String(200), nullable=False)

    credential_id: Mapped[str | None] = mapped_column(String(150), nullable=True)

    credential_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    issue_date: Mapped[str] = mapped_column(String(20), nullable=False)

    expiration_date: Mapped[str | None] = mapped_column(String(20), nullable=True)

    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="certificates")
