from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field


class EducationCreate(BaseModel):
    institution: str = Field(min_length=2, max_length=200)
    degree: str = Field(min_length=2, max_length=200)
    field_of_study: str | None = Field(default=None, max_length=200)
    description: str | None = None
    start_date: str
    end_date: str | None = None
    is_current: bool = False
    display_order: int = 0


class EducationUpdate(BaseModel):
    institution: str | None = Field(default=None, max_length=200)
    degree: str | None = Field(default=None, max_length=200)
    field_of_study: str | None = Field(default=None, max_length=200)
    description: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    is_current: bool | None = None
    display_order: int | None = None


class EducationResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    institution: str
    degree: str
    field_of_study: str | None
    description: str | None
    start_date: str
    end_date: str | None
    is_current: bool
    display_order: int

    model_config = ConfigDict(from_attributes=True)
