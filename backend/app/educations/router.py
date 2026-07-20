from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, status

from app.api.deps import get_education_service
from app.auth.dependencies import get_current_user
from app.educations.schema import (
    EducationCreate,
    EducationResponse,
    EducationUpdate,
)
from app.educations.service import EducationService
from app.users.model import User

router = APIRouter(
    prefix="/educations",
    tags=["Educations"],
)


@router.post(
    "",
    response_model=EducationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_education(
    data: EducationCreate,
    current_user: User = Depends(get_current_user),
    service: EducationService = Depends(get_education_service),
):
    return service.create(
        current_user.id,
        data,
    )


@router.get(
    "/me",
    response_model=list[EducationResponse],
)
def get_my_educations(
    current_user: User = Depends(get_current_user),
    service: EducationService = Depends(get_education_service),
):
    return service.get_all(
        current_user.id,
    )


@router.patch(
    "/{education_id}",
    response_model=EducationResponse,
)
def update_education(
    education_id: uuid.UUID,
    data: EducationUpdate,
    current_user: User = Depends(get_current_user),
    service: EducationService = Depends(get_education_service),
):
    education = service.get_by_id(education_id)

    return service.update(
        education,
        data,
        current_user,
    )


@router.delete(
    "/{education_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_education(
    education_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    service: EducationService = Depends(get_education_service),
):
    education = service.get_by_id(education_id)

    service.delete(
        education,
        current_user,
    )

    return None
