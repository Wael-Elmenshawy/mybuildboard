from __future__ import annotations

import uuid

from fastapi import HTTPException, status

from app.achievements.model import Achievement
from app.achievements.repository import AchievementRepository
from app.achievements.schema import (
    AchievementCreate,
    AchievementUpdate,
)
from app.users.model import User


class AchievementService:
    def __init__(
        self,
        repository: AchievementRepository,
    ):
        self.repository = repository

    def create(
        self,
        user_id: uuid.UUID,
        data: AchievementCreate,
    ) -> Achievement:
        achievement = Achievement(
            user_id=user_id,
            **data.model_dump(),
        )

        return self.repository.create(achievement)

    def get_all(
        self,
        user_id: uuid.UUID,
    ) -> list[Achievement]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(
        self,
        achievement_id: uuid.UUID,
    ) -> Achievement:

        achievement = self.repository.get_by_id(achievement_id)

        if achievement is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Achievement not found.",
            )

        return achievement

    def update(
        self,
        achievement: Achievement,
        data: AchievementUpdate,
        current_user: User,
    ) -> Achievement:

        if achievement.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this achievement.",
            )

        values = data.model_dump(exclude_unset=True)

        for key, value in values.items():
            setattr(achievement, key, value)

        return self.repository.update(achievement)

    def delete(
        self,
        achievement: Achievement,
        current_user: User,
    ) -> None:

        if achievement.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this achievement.",
            )

        self.repository.delete(achievement)
