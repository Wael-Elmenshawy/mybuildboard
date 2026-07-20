from uuid import UUID

from pydantic import BaseModel, ConfigDict, HttpUrl


class ProfileBase(BaseModel):
    full_name: str | None = None
    headline: str | None = None
    bio: str | None = None

    cover_url: HttpUrl | None = None
    website: HttpUrl | None = None

    country: str | None = None
    city: str | None = None
    timezone: str | None = None

    is_public: bool = True


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: UUID
    user_id: UUID
    avatar_url: HttpUrl | None = None

    model_config = ConfigDict(
        from_attributes=True,
    )
