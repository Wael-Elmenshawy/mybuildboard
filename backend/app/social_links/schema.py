from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field

from app.social_links.model import SocialPlatform


class SocialLinkCreate(BaseModel):
    platform: SocialPlatform
    url: str = Field(min_length=3, max_length=500)
    display_order: int = 0


class SocialLinkUpdate(BaseModel):
    platform: SocialPlatform | None = None
    url: str | None = Field(default=None, max_length=500)
    display_order: int | None = None


class SocialLinkResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    platform: SocialPlatform
    url: str
    display_order: int

    model_config = ConfigDict(from_attributes=True)