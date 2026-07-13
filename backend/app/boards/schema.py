from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field

from app.boards.model import BoardStatus, BoardVisibility


class BoardCreate(BaseModel):
    title: str = Field(min_length=3, max_length=150)
    slug: str = Field(min_length=3, max_length=150)
    description: str | None = None


class BoardUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=150)
    description: str | None = None
    visibility: BoardVisibility | None = None
    status: BoardStatus | None = None
    is_featured: bool | None = None


class BoardResponse(BaseModel):
    id: uuid.UUID
    owner_id: uuid.UUID
    title: str
    slug: str
    description: str | None
    visibility: BoardVisibility
    status: BoardStatus
    is_featured: bool

    model_config = ConfigDict(
        from_attributes=True,
    )
