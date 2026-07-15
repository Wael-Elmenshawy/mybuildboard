from __future__ import annotations

import uuid

from app.experiences.model import Experience
from app.experiences.repository import ExperienceRepository
from app.experiences.schema import (
    ExperienceCreate,
    ExperienceUpdate,
)


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
    ) -> Experience | None:
        return self.repository.get_by_id(experience_id)

    def update(
        self,
        experience: Experience,
        data: ExperienceUpdate,
    ) -> Experience:
        values = data.model_dump(exclude_unset=True)

        for key, value in values.items():
            setattr(experience, key, value)

        return self.repository.update(experience)

    def delete(
        self,
        experience: Experience,
    ) -> None:
        self.repository.delete(experience)