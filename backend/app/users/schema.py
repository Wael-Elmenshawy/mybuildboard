from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: EmailStr
    username: str
    name: str | None = None
    avatar_url: str | None = None

    model_config = {"from_attributes": True}
