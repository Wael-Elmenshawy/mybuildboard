from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field

from app.skills.model import SkillLevel


class SkillCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
    )

    level: SkillLevel = SkillLevel.INTERMEDIATE

    display_order: int = 0


class SkillUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    level: SkillLevel | None = None

    display_order: int | None = None


class SkillResponse(BaseModel):
    id: uuid.UUID

    user_id: uuid.UUID

    name: str

    level: SkillLevel

    display_order: int

    model_config = ConfigDict(
        from_attributes=True,
    )