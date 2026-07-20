from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class GithubConnectionResponse(BaseModel):
    id: uuid.UUID
    github_username: str
    scope: str | None
    connected_at: datetime

    model_config = ConfigDict(from_attributes=True)


class GithubRepoResponse(BaseModel):
    id: uuid.UUID
    github_repo_id: int
    name: str
    full_name: str
    description: str | None
    html_url: str
    language: str | None
    stars_count: int
    forks_count: int
    is_private: bool
    is_fork: bool
    is_imported: bool

    model_config = ConfigDict(from_attributes=True)


class GithubAuthorizeResponse(BaseModel):
    authorize_url: str
