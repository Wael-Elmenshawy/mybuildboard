from __future__ import annotations

import uuid
from itertools import chain

from sqlalchemy.orm import Session

from app.boards.model import Board
from app.certificates.model import Certificate
from app.educations.model import Education
from app.experiences.model import Experience
from app.profiles.model import Profile
from app.projects.model import Project
from app.skills.model import Skill


class DashboardRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_profile(
        self,
        user_id: uuid.UUID,
    ) -> Profile | None:
        return (
            self.db.query(Profile)
            .filter(Profile.user_id == user_id)
            .first()
        )

    def count_projects(
        self,
        user_id: uuid.UUID,
    ) -> int:
        return (
            self.db.query(Project)
            .join(Board)
            .filter(Board.owner_id == user_id)
            .count()
        )

    def count_skills(
        self,
        user_id: uuid.UUID,
    ) -> int:
        return (
            self.db.query(Skill)
            .filter(Skill.user_id == user_id)
            .count()
        )

    def count_experiences(
        self,
        user_id: uuid.UUID,
    ) -> int:
        return (
            self.db.query(Experience)
            .filter(Experience.user_id == user_id)
            .count()
        )

    def count_educations(
        self,
        user_id: uuid.UUID,
    ) -> int:
        return (
            self.db.query(Education)
            .filter(Education.user_id == user_id)
            .count()
        )

    def count_certificates(
        self,
        user_id: uuid.UUID,
    ) -> int:
        return (
            self.db.query(Certificate)
            .filter(Certificate.user_id == user_id)
            .count()
        )

    def get_recent_projects(
        self,
        user_id: uuid.UUID,
        limit: int = 5,
    ) -> list[Project]:
        return (
            self.db.query(Project)
            .join(Board)
            .filter(Board.owner_id == user_id)
            .order_by(Project.updated_at.desc())
            .limit(limit)
            .all()
        )

    def get_recent_activity(
        self,
        user_id: uuid.UUID,
        limit: int = 5,
    ) -> list[dict]:

        activities = list(
            chain(
                [
                    {
                        "type": "project",
                        "title": project.title,
                        "created_at": project.created_at,
                    }
                    for project in (
                        self.db.query(Project)
                        .join(Board)
                        .filter(Board.owner_id == user_id)
                        .all()
                    )
                ],
                [
                    {
                        "type": "skill",
                        "title": skill.name,
                        "created_at": skill.created_at,
                    }
                    for skill in (
                        self.db.query(Skill)
                        .filter(Skill.user_id == user_id)
                        .all()
                    )
                ],
                [
                    {
                        "type": "experience",
                        "title": experience.position,
                        "created_at": experience.created_at,
                    }
                    for experience in (
                        self.db.query(Experience)
                        .filter(Experience.user_id == user_id)
                        .all()
                    )
                ],
                [
                    {
                        "type": "education",
                        "title": education.degree,
                        "created_at": education.created_at,
                    }
                    for education in (
                        self.db.query(Education)
                        .filter(Education.user_id == user_id)
                        .all()
                    )
                ],
                [
                    {
                        "type": "certificate",
                        "title": certificate.name,
                        "created_at": certificate.created_at,
                    }
                    for certificate in (
                        self.db.query(Certificate)
                        .filter(Certificate.user_id == user_id)
                        .all()
                    )
                ],
            )
        )

        activities.sort(
            key=lambda activity: activity["created_at"],
            reverse=True,
        )

        return activities[:limit]
