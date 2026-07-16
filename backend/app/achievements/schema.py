from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field


class AchievementCreate(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    description: str | None = None
    date: str | None = None
    url: str | None = Field(default=None, max_length=500)
    display_order: int = 0


class AchievementUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    description: str | None = None
    date: str | None = None
    url: str | None = Field(default=None, max_length=500)
    display_order: int | None = None


class AchievementResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    title: str
    description: str | None
    date: str | None
    url: str | None
    display_order: int

    model_config = ConfigDict(from_attributes=True)