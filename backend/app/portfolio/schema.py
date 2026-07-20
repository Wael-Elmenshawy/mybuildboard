from __future__ import annotations

from pydantic import BaseModel, ConfigDict

from app.achievements.schema import AchievementResponse
from app.boards.schema import BoardResponse
from app.certificates.schema import CertificateResponse
from app.educations.schema import EducationResponse
from app.experiences.schema import ExperienceResponse
from app.profiles.schema import ProfileResponse
from app.projects.schema import ProjectResponse
from app.skills.schema import SkillResponse
from app.social_links.schema import SocialLinkResponse


class PublicPortfolioResponse(BaseModel):
    username: str

    board: BoardResponse

    profile: ProfileResponse | None

    projects: list[ProjectResponse]

    skills: list[SkillResponse]

    experiences: list[ExperienceResponse]

    educations: list[EducationResponse]

    certificates: list[CertificateResponse]

    social_links: list[SocialLinkResponse]

    achievements: list[AchievementResponse]

    model_config = ConfigDict(
        from_attributes=True,
    )
