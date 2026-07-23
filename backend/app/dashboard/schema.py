from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class DashboardStats(BaseModel):
    projects: int
    skills: int
    experiences: int
    educations: int
    certificates: int


class RecentProject(BaseModel):
    id: UUID
    title: str
    updated_at: datetime


class RecentActivity(BaseModel):
    type: str
    title: str
    created_at: datetime


class DashboardResponse(BaseModel):
    profile_completion: int
    stats: DashboardStats
    recent_projects: list[RecentProject]
    recent_activity: list[RecentActivity]
