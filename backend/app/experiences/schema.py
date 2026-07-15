from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field

from app.experiences.model import EmploymentType


class ExperienceCreate(BaseModel):
    company: str = Field(
        min_length=2,
        max_length=200,
    )

    position: str = Field(
        min_length=2,
        max_length=200,
    )

    employment_type: EmploymentType = EmploymentType.FULL_TIME

    location: str | None = Field(
        default=None,
        max_length=200,
    )

    description: str | None = None

    start_date: str

    end_date: str | None = None

    is_current: bool = False

    display_order: int = 0


class ExperienceUpdate(BaseModel):
    company: str | None = Field(
        default=None,
        max_length=200,
    )

    position: str | None = Field(
        default=None,
        max_length=200,
    )

    employment_type: EmploymentType | None = None

    location: str | None = Field(
        default=None,
        max_length=200,
    )

    description: str | None = None

    start_date: str | None = None

    end_date: str | None = None

    is_current: bool | None = None

    display_order: int | None = None


class ExperienceResponse(BaseModel):
    id: uuid.UUID

    user_id: uuid.UUID

    company: str

    position: str

    employment_type: EmploymentType

    location: str | None

    description: str | None

    start_date: str

    end_date: str | None

    is_current: bool

    display_order: int

    model_config = ConfigDict(
        from_attributes=True,
    )