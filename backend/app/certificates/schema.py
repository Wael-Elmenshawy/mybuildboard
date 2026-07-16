from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field


class CertificateCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    issuer: str = Field(min_length=2, max_length=200)
    credential_id: str | None = Field(default=None, max_length=150)
    credential_url: str | None = Field(default=None, max_length=500)
    issue_date: str
    expiration_date: str | None = None
    description: str | None = None
    display_order: int = 0


class CertificateUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=200)
    issuer: str | None = Field(default=None, max_length=200)
    credential_id: str | None = Field(default=None, max_length=150)
    credential_url: str | None = Field(default=None, max_length=500)
    issue_date: str | None = None
    expiration_date: str | None = None
    description: str | None = None
    display_order: int | None = None


class CertificateResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    name: str
    issuer: str
    credential_id: str | None
    credential_url: str | None
    issue_date: str
    expiration_date: str | None
    description: str | None
    display_order: int

    model_config = ConfigDict(from_attributes=True)