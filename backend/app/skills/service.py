from __future__ import annotations

import uuid

from fastapi import HTTPException, status

from app.skills.model import Skill
from app.skills.repository import SkillRepository
from app.skills.schema import SkillCreate, SkillUpdate


class SkillService:
    def __init__(
        self,
        repository: SkillRepository,
    ):
        self.repository = repository

    def create(
        self,
        user_id: uuid.UUID,
        data: SkillCreate,
    ) -> Skill:

        if self.repository.name_exists(
            user_id,
            data.name,
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Skill already exists.",
            )

        skill = Skill(
            user_id=user_id,
            **data.model_dump(),
        )

        return self.repository.create(skill)

    def get_all(
        self,
        user_id: uuid.UUID,
    ) -> list[Skill]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(
        self,
        skill_id: uuid.UUID,
    ) -> Skill:

        skill = self.repository.get_by_id(skill_id)

        if skill is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Skill not found.",
            )

        return skill

    def update(
        self,
        skill: Skill,
        data: SkillUpdate,
    ) -> Skill:

        values = data.model_dump(
            exclude_unset=True,
        )

        if (
            "name" in values
            and values["name"] != skill.name
            and self.repository.name_exists(
                skill.user_id,
                values["name"],
            )
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Skill already exists.",
            )

        for key, value in values.items():
            setattr(skill, key, value)

        return self.repository.update(skill)

    def delete(
        self,
        skill: Skill,
    ) -> None:
        self.repository.delete(skill)