from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, ForeignKey, String
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel
from app.storage.constants import StorageFolder

if TYPE_CHECKING:
    from app.users.model import User


class Asset(BaseModel):
    """
    Represents a physical file stored in the storage provider.

    An Asset belongs to a single user and can later be referenced by
    other modules such as Profiles, Projects, Certificates, Boards,
    Achievements, and Resumes.
    """

    __tablename__ = "assets"

    owner_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    storage_key: Mapped[str] = mapped_column(
        String(512),
        nullable=False,
        unique=True,
    )

    original_filename: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    content_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    size: Mapped[int] = mapped_column(
        BigInteger,
        nullable=False,
    )

    folder: Mapped[StorageFolder] = mapped_column(
        SqlEnum(
            StorageFolder,
            name="storage_folder",
        ),
        nullable=False,
        index=True,
    )

    is_public: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    owner: Mapped["User"] = relationship(
        back_populates="assets",
    )