from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.achievements.schema import (
    AchievementCreate,
    AchievementResponse,
    AchievementUpdate,
)
from app.achievements.service import AchievementService
from app.api.deps import get_achievement_service
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/achievements", tags=["Achievements"])


@router.post("", response_model=AchievementResponse, status_code=status.HTTP_201_CREATED)
def create_achievement(
    data: AchievementCreate,
    current_user=Depends(get_current_user),
    service: AchievementService = Depends(get_achievement_service),
):
    return service.create(current_user.id, data)


@router.get("/me", response_model=list[AchievementResponse])
def get_my_achievements(
    current_user=Depends(get_current_user),
    service: AchievementService = Depends(get_achievement_service),
):
    return service.get_all(current_user.id)


@router.patch("/{achievement_id}", response_model=AchievementResponse)
def update_achievement(
    achievement_id,
    data: AchievementUpdate,
    current_user=Depends(get_current_user),
    service: AchievementService = Depends(get_achievement_service),
):
    achievement = service.get_by_id(achievement_id)
    if achievement is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Achievement not found")
    if achievement.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")
    return service.update(achievement, data)


@router.delete("/{achievement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_achievement(
    achievement_id,
    current_user=Depends(get_current_user),
    service: AchievementService = Depends(get_achievement_service),
):
    achievement = service.get_by_id(achievement_id)
    if achievement is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Achievement not found")
    if achievement.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")
    service.delete(achievement)