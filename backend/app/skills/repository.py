from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.shared.repositories.base_repository import BaseRepository
from app.skills.model import Skill


class SkillRepository(BaseRepository[Skill]):
    def __init__(
        self,
        db: Session,
    ):
        super().__init__(
            db,
            Skill,
        )

    def get_by_id(
        self,
        skill_id: uuid.UUID,
    ) -> Skill | None:
        return (
            self.db.query(Skill)
            .filter(Skill.id == skill_id)
            .first()
        )

    def get_all_by_user(
        self,
        user_id: uuid.UUID,
    ) -> list[Skill]:
        return (
            self.db.query(Skill)
            .filter(Skill.user_id == user_id)
            .order_by(Skill.display_order.asc())
            .all()
        )

    def name_exists(
        self,
        user_id: uuid.UUID,
        name: str,
    ) -> bool:
        return (
            self.db.query(Skill)
            .filter(
                Skill.user_id == user_id,
                Skill.name == name,
            )
            .first()
            is not None
        )