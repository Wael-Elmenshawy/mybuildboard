from __future__ import annotations

import uuid
from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.users.model import User


class SocialPlatform(StrEnum):
    GITHUB = "github"
    LINKEDIN = "linkedin"
    TWITTER = "twitter"
    WEBSITE = "website"
    YOUTUBE = "youtube"
    INSTAGRAM = "instagram"
    FACEBOOK = "facebook"
    DRIBBBLE = "dribbble"
    BEHANCE = "behance"
    OTHER = "other"


class SocialLink(BaseModel):
    __tablename__ = "social_links"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    platform: Mapped[SocialPlatform] = mapped_column(
        SqlEnum(
            SocialPlatform,
            values_callable=lambda enum: [e.value for e in enum],
            native_enum=True,
        ),
        nullable=False,
    )

    url: Mapped[str] = mapped_column(String(500), nullable=False)

    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="social_links")