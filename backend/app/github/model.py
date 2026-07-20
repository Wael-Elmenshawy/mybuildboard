from __future__ import annotations

import uuid
from datetime import UTC, datetime
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.users.model import User


class GithubConnection(BaseModel):
    __tablename__ = "github_connections"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )

    github_user_id: Mapped[int] = mapped_column(BigInteger, nullable=False)

    github_username: Mapped[str] = mapped_column(String(200), nullable=False)

    access_token_encrypted: Mapped[str] = mapped_column(Text, nullable=False)

    scope: Mapped[str | None] = mapped_column(String(200), nullable=True)

    connected_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    user: Mapped["User"] = relationship("User", back_populates="github_connection")

    repositories: Mapped[list["GithubRepo"]] = relationship(
        "GithubRepo",
        back_populates="connection",
        cascade="all, delete-orphan",
    )


class GithubRepo(BaseModel):
    __tablename__ = "github_repos"

    connection_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("github_connections.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    github_repo_id: Mapped[int] = mapped_column(BigInteger, nullable=False, index=True)

    name: Mapped[str] = mapped_column(String(200), nullable=False)

    full_name: Mapped[str] = mapped_column(String(300), nullable=False)

    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    html_url: Mapped[str] = mapped_column(String(500), nullable=False)

    language: Mapped[str | None] = mapped_column(String(100), nullable=True)

    stars_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    forks_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    is_private: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    is_fork: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    is_imported: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    connection: Mapped["GithubConnection"] = relationship(
        "GithubConnection",
        back_populates="repositories",
    )
