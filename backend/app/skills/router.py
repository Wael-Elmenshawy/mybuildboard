from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, status

from app.api.deps import get_skill_service
from app.auth.dependencies import get_current_user
from app.skills.schema import (
    SkillCreate,
    SkillResponse,
    SkillUpdate,
)
from app.skills.service import SkillService
from app.users.model import User

router = APIRouter(
    prefix="/skills",
    tags=["Skills"],
)


@router.post(
    "",
    response_model=SkillResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_skill(
    data: SkillCreate,
    current_user: User = Depends(get_current_user),
    service: SkillService = Depends(get_skill_service),
):
    return service.create(
        current_user.id,
        data,
    )


@router.get(
    "/me",
    response_model=list[SkillResponse],
)
def get_my_skills(
    current_user: User = Depends(get_current_user),
    service: SkillService = Depends(get_skill_service),
):
    return service.get_all(
        current_user.id,
    )


@router.patch(
    "/{skill_id}",
    response_model=SkillResponse,
)
def update_skill(
    skill_id: uuid.UUID,
    data: SkillUpdate,
    current_user: User = Depends(get_current_user),
    service: SkillService = Depends(get_skill_service),
):
    skill = service.get_by_id(skill_id)

    return service.update(
        skill,
        data,
        current_user,
    )


@router.delete(
    "/{skill_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_skill(
    skill_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    service: SkillService = Depends(get_skill_service),
):
    skill = service.get_by_id(skill_id)

    service.delete(
        skill,
        current_user,
    )

    return None
