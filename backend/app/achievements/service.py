from __future__ import annotations

import uuid

from app.achievements.model import Achievement
from app.achievements.repository import AchievementRepository
from app.achievements.schema import AchievementCreate, AchievementUpdate


class AchievementService:
    def __init__(self, repository: AchievementRepository):
        self.repository = repository

    def create(self, user_id: uuid.UUID, data: AchievementCreate) -> Achievement:
        achievement = Achievement(user_id=user_id, **data.model_dump())
        return self.repository.create(achievement)

    def get_all(self, user_id: uuid.UUID) -> list[Achievement]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(self, achievement_id: uuid.UUID) -> Achievement | None:
        return self.repository.get_by_id(achievement_id)

    def update(self, achievement: Achievement, data: AchievementUpdate) -> Achievement:
        values = data.model_dump(exclude_unset=True)
        for key, value in values.items():
            setattr(achievement, key, value)
        return self.repository.update(achievement)

    def delete(self, achievement: Achievement) -> None:
        self.repository.delete(achievement)