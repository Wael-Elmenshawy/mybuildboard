from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, status

from app.achievements.schema import (
    AchievementCreate,
    AchievementResponse,
    AchievementUpdate,
)
from app.achievements.service import AchievementService
from app.api.deps import get_achievement_service
from app.auth.dependencies import get_current_user
from app.users.model import User

router = APIRouter(
    prefix="/achievements",
    tags=["Achievements"],
)


@router.post(
    "",
    response_model=AchievementResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_achievement(
    data: AchievementCreate,
    current_user: User = Depends(get_current_user),
    service: AchievementService = Depends(get_achievement_service),
):
    return service.create(
        current_user.id,
        data,
    )


@router.get(
    "/me",
    response_model=list[AchievementResponse],
)
def get_my_achievements(
    current_user: User = Depends(get_current_user),
    service: AchievementService = Depends(get_achievement_service),
):
    return service.get_all(
        current_user.id,
    )


@router.patch(
    "/{achievement_id}",
    response_model=AchievementResponse,
)
def update_achievement(
    achievement_id: uuid.UUID,
    data: AchievementUpdate,
    current_user: User = Depends(get_current_user),
    service: AchievementService = Depends(get_achievement_service),
):
    achievement = service.get_by_id(achievement_id)

    return service.update(
        achievement,
        data,
        current_user,
    )


@router.delete(
    "/{achievement_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_achievement(
    achievement_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    service: AchievementService = Depends(get_achievement_service),
):
    achievement = service.get_by_id(achievement_id)

    service.delete(
        achievement,
        current_user,
    )

    return None