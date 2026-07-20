from __future__ import annotations

import uuid

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str


class UserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    username: str
    name: str | None = None
    avatar_url: str | None = None

    model_config = {
        "from_attributes": True,
    }
