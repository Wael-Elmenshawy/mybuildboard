from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_experience_service
from app.auth.dependencies import get_current_user
from app.experiences.schema import (
    ExperienceCreate,
    ExperienceResponse,
    ExperienceUpdate,
)
from app.experiences.service import ExperienceService

router = APIRouter(
    prefix="/experiences",
    tags=["Experiences"],
)


@router.post(
    "",
    response_model=ExperienceResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_experience(
    data: ExperienceCreate,
    current_user=Depends(get_current_user),
    service: ExperienceService = Depends(get_experience_service),
):
    return service.create(
        current_user.id,
        data,
    )


@router.get(
    "/me",
    response_model=list[ExperienceResponse],
)
def get_my_experiences(
    current_user=Depends(get_current_user),
    service: ExperienceService = Depends(get_experience_service),
):
    return service.get_all(current_user.id)


@router.patch(
    "/{experience_id}",
    response_model=ExperienceResponse,
)
def update_experience(
    experience_id,
    data: ExperienceUpdate,
    current_user=Depends(get_current_user),
    service: ExperienceService = Depends(get_experience_service),
):
    experience = service.get_by_id(experience_id)

    if experience is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience not found",
        )

    if experience.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission denied.",
        )

    return service.update(
        experience,
        data,
    )


@router.delete(
    "/{experience_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_experience(
    experience_id,
    current_user=Depends(get_current_user),
    service: ExperienceService = Depends(get_experience_service),
):
    experience = service.get_by_id(experience_id)

    if experience is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience not found",
        )

    if experience.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission denied.",
        )

    service.delete(experience)