from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.experiences.model import Experience
from app.shared.repositories.base_repository import BaseRepository


class ExperienceRepository(BaseRepository[Experience]):
    def __init__(
        self,
        db: Session,
    ):
        super().__init__(db, Experience)

    def get_by_id(
        self,
        experience_id: uuid.UUID,
    ) -> Experience | None:
        return (
            self.db.query(Experience)
            .filter(Experience.id == experience_id)
            .first()
        )

    def get_all_by_user(
        self,
        user_id: uuid.UUID,
    ) -> list[Experience]:
        return (
            self.db.query(Experience)
            .filter(Experience.user_id == user_id)
            .order_by(Experience.display_order.asc())
            .all()
        )