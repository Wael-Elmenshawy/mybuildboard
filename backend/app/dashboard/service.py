from __future__ import annotations

import uuid

from app.dashboard.repository import DashboardRepository
from app.dashboard.schema import (
    DashboardResponse,
    DashboardStats,
    RecentActivity,
    RecentProject,
)


class DashboardService:
    def __init__(
        self,
        repository: DashboardRepository,
    ):
        self.repository = repository

    def get_dashboard(
        self,
        user_id: uuid.UUID,
    ) -> DashboardResponse:

        profile = self.repository.get_profile(user_id)

        projects = self.repository.count_projects(user_id)
        skills = self.repository.count_skills(user_id)
        experiences = self.repository.count_experiences(user_id)
        educations = self.repository.count_educations(user_id)
        certificates = self.repository.count_certificates(user_id)

        recent_projects = self.repository.get_recent_projects(user_id)
        recent_activity = self.repository.get_recent_activity(user_id)

        completion = 0

        if profile:
            completion += 10

            if profile.avatar_asset_id:
                completion += 10

            if profile.full_name:
                completion += 10

            if profile.headline:
                completion += 10

            if profile.bio:
                completion += 15

            if profile.website:
                completion += 5

            if profile.country:
                completion += 5

            if profile.city:
                completion += 5

        if projects > 0:
            completion += 10

        if skills > 0:
            completion += 10

        if experiences > 0:
            completion += 5

        if educations > 0:
            completion += 3

        if certificates > 0:
            completion += 2

        return DashboardResponse(
            profile_completion=completion,
            stats=DashboardStats(
                projects=projects,
                skills=skills,
                experiences=experiences,
                educations=educations,
                certificates=certificates,
            ),
            recent_projects=[
                RecentProject(
                    id=project.id,
                    title=project.title,
                    updated_at=project.updated_at,
                )
                for project in recent_projects
            ],
            recent_activity=[
                RecentActivity(
                    type=activity["type"],
                    title=activity["title"],
                    created_at=activity["created_at"],
                )
                for activity in recent_activity
            ],
        )
