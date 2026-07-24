from __future__ import annotations

import uuid

from app.dashboard.repository import DashboardRepository
from app.dashboard.schema import (
    ActivityResponse,
    DashboardResponse,
    RecentProjectResponse,
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

        completed_fields = 0
        total_fields = 6

        if profile:
            fields = [
                profile.first_name,
                profile.last_name,
                profile.headline,
                profile.bio,
                profile.location,
                profile.avatar_asset_id,
            ]

            completed_fields = sum(
                1 for value in fields if value
            )

        profile_completion = int(
            (completed_fields / total_fields) * 100
        )

        recent_projects = [
            RecentProjectResponse(
                id=str(project.id),
                title=project.title,
            )
            for project in self.repository.get_recent_projects(user_id)
        ]

        recent_activity = [
            ActivityResponse(**activity)
            for activity in self.repository.get_recent_activity(user_id)
        ]

        return DashboardResponse(
            total_projects=self.repository.count_projects(user_id),
            total_skills=self.repository.count_skills(user_id),
            total_experiences=self.repository.count_experiences(user_id),
            total_educations=self.repository.count_educations(user_id),
            total_certificates=self.repository.count_certificates(user_id),
            profile_completion=profile_completion,
            recent_projects=recent_projects,
            recent_activity=recent_activity,
        )
