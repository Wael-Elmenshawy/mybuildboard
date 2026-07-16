from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.achievements.model import Achievement
from app.shared.repositories.base_repository import BaseRepository


class AchievementRepository(BaseRepository[Achievement]):
    def __init__(self, db: Session):
        super().__init__(db, Achievement)

    def get_by_id(self, achievement_id: uuid.UUID) -> Achievement | None:
        return (
            self.db.query(Achievement)
            .filter(Achievement.id == achievement_id)
            .first()
        )

    def get_all_by_user(self, user_id: uuid.UUID) -> list[Achievement]:
        return (
            self.db.query(Achievement)
            .filter(Achievement.user_id == user_id)
            .order_by(Achievement.display_order.asc())
            .all()
        )