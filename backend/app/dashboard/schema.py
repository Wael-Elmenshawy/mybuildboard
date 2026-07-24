from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RecentProjectResponse(BaseModel):
    id: str
    title: str

    model_config = ConfigDict(from_attributes=True)


class ActivityResponse(BaseModel):
    type: str
    title: str
    created_at: datetime


class DashboardResponse(BaseModel):
    total_projects: int
    total_skills: int
    total_experiences: int
    total_educations: int
    total_certificates: int
    profile_completion: int

    recent_projects: list[RecentProjectResponse]
    recent_activity: list[ActivityResponse]

    model_config = ConfigDict(from_attributes=True)
