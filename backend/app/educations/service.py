from __future__ import annotations

import uuid

from fastapi import HTTPException, status

from app.educations.model import Education
from app.educations.repository import EducationRepository
from app.educations.schema import (
    EducationCreate,
    EducationUpdate,
)
from app.users.model import User


class EducationService:
    def __init__(
        self,
        repository: EducationRepository,
    ):
        self.repository = repository

    def create(
        self,
        user_id: uuid.UUID,
        data: EducationCreate,
    ) -> Education:
        education = Education(
            user_id=user_id,
            **data.model_dump(),
        )

        return self.repository.create(education)

    def get_all(
        self,
        user_id: uuid.UUID,
    ) -> list[Education]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(
        self,
        education_id: uuid.UUID,
    ) -> Education:

        education = self.repository.get_by_id(education_id)

        if education is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Education not found.",
            )

        return education

    def update(
        self,
        education: Education,
        data: EducationUpdate,
        current_user: User,
    ) -> Education:

        if education.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this education.",
            )

        values = data.model_dump(exclude_unset=True)

        for key, value in values.items():
            setattr(education, key, value)

        return self.repository.update(education)

    def delete(
        self,
        education: Education,
        current_user: User,
    ) -> None:

        if education.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this education.",
            )

        self.repository.delete(education)
