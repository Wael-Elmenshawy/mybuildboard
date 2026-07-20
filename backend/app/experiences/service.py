from __future__ import annotations

import uuid

from fastapi import HTTPException, status

from app.experiences.model import Experience
from app.experiences.repository import ExperienceRepository
from app.experiences.schema import (
    ExperienceCreate,
    ExperienceUpdate,
)
from app.users.model import User


class ExperienceService:
    def __init__(
        self,
        repository: ExperienceRepository,
    ):
        self.repository = repository

    def create(
        self,
        user_id: uuid.UUID,
        data: ExperienceCreate,
    ) -> Experience:
        experience = Experience(
            user_id=user_id,
            **data.model_dump(),
        )

        return self.repository.create(experience)

    def get_all(
        self,
        user_id: uuid.UUID,
    ) -> list[Experience]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(
        self,
        experience_id: uuid.UUID,
    ) -> Experience:

        experience = self.repository.get_by_id(experience_id)

        if experience is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Experience not found.",
            )

        return experience

    def update(
        self,
        experience: Experience,
        data: ExperienceUpdate,
        current_user: User,
    ) -> Experience:

        if experience.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this experience.",
            )

        values = data.model_dump(exclude_unset=True)

        for key, value in values.items():
            setattr(experience, key, value)

        return self.repository.update(experience)

    def delete(
        self,
        experience: Experience,
        current_user: User,
    ) -> None:

        if experience.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this experience.",
            )

        self.repository.delete(experience)
