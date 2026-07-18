from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.assets.model import Asset


class Profile(BaseModel):
    __tablename__ = "profiles"

    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    avatar_asset_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("assets.id", ondelete="SET NULL"),
        unique=True,
        nullable=True,
    )

    full_name: Mapped[str | None] = mapped_column(String(150))

    headline: Mapped[str | None] = mapped_column(String(255))

    bio: Mapped[str | None] = mapped_column(String(2000))

    avatar_url: Mapped[str | None] = mapped_column(String(500))

    cover_url: Mapped[str | None] = mapped_column(String(500))

    website: Mapped[str | None] = mapped_column(String(255))

    country: Mapped[str | None] = mapped_column(String(100))

    city: Mapped[str | None] = mapped_column(String(100))

    timezone: Mapped[str | None] = mapped_column(String(100))

    is_public: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    user = relationship(
        "User",
        back_populates="profile",
    )

    avatar: Mapped["Asset | None"] = relationship(
        "Asset",
        back_populates="profile_avatar",
    )
