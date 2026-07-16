from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.shared.database.base_model import BaseModel

if TYPE_CHECKING:
    from app.achievements.model import Achievement
    from app.boards.model import Board
    from app.certificates.model import Certificate
    from app.educations.model import Education
    from app.experiences.model import Experience
    from app.github.model import GithubConnection
    from app.profiles.model import Profile
    from app.skills.model import Skill
    from app.social_links.model import SocialLink


class User(BaseModel):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(
        String,
        unique=True,
        index=True,
    )

    username: Mapped[str] = mapped_column(
        String,
        unique=True,
        index=True,
    )

    name: Mapped[str | None] = mapped_column(
        String,
        nullable=True,
    )

    avatar_url: Mapped[str | None] = mapped_column(
        String,
        nullable=True,
    )

    provider: Mapped[str] = mapped_column(
        String,
    )

    provider_id: Mapped[str] = mapped_column(
        String,
    )

    password: Mapped[str | None] = mapped_column(
        String,
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    profile: Mapped[Profile] = relationship(
        "Profile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )

    boards: Mapped[list[Board]] = relationship(
        "Board",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    skills: Mapped[list[Skill]] = relationship(
        "Skill",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    experiences: Mapped[list[Experience]] = relationship(
        "Experience",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    certificates: Mapped[list[Certificate]] = relationship(
        "Certificate",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    educations: Mapped[list[Education]] = relationship(
        "Education",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    social_links: Mapped[list[SocialLink]] = relationship(
        "SocialLink",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    achievements: Mapped[list[Achievement]] = relationship(
        "Achievement",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    github_connection: Mapped["GithubConnection | None"] = relationship(
        "GithubConnection",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )