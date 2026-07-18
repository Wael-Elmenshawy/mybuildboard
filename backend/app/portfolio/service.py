from __future__ import annotations

from fastapi import HTTPException, status

from app.achievements.repository import AchievementRepository
from app.boards.repository import BoardRepository
from app.certificates.repository import CertificateRepository
from app.educations.repository import EducationRepository
from app.experiences.repository import ExperienceRepository
from app.portfolio.schema import PublicPortfolioResponse
from app.profiles.repository import ProfileRepository
from app.projects.repository import ProjectRepository
from app.skills.repository import SkillRepository
from app.social_links.repository import SocialLinkRepository
from app.users.model import User
from app.users.repository import UserRepository


class PortfolioService:
    def __init__(
        self,
        user_repository: UserRepository,
        board_repository: BoardRepository,
        profile_repository: ProfileRepository,
        project_repository: ProjectRepository,
        skill_repository: SkillRepository,
        experience_repository: ExperienceRepository,
        education_repository: EducationRepository,
        certificate_repository: CertificateRepository,
        social_link_repository: SocialLinkRepository,
        achievement_repository: AchievementRepository,
    ) -> None:
        self.user_repository = user_repository
        self.board_repository = board_repository
        self.profile_repository = profile_repository
        self.project_repository = project_repository
        self.skill_repository = skill_repository
        self.experience_repository = experience_repository
        self.education_repository = education_repository
        self.certificate_repository = certificate_repository
        self.social_link_repository = social_link_repository
        self.achievement_repository = achievement_repository

    def get_public_portfolio(
        self,
        username: str,
    ) -> PublicPortfolioResponse:
        user = self._get_user(username)
        board = self._get_public_board(user)

        return self._build_response(
            user=user,
            board=board,
        )

    def _get_user(
        self,
        username: str,
    ) -> User:
        user = self.user_repository.get_by_username(username)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )

        return user

    def _get_public_board(
        self,
        user: User,
    ):
        board = self.board_repository.get_public_board_by_owner(
            user.id,
        )

        if board is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Public board not found.",
            )

        return board

    def _build_response(
        self,
        user: User,
        board,
    ) -> PublicPortfolioResponse:
        profile = self.profile_repository.get_by_user_id(
            str(user.id),
        )

        projects = self.project_repository.get_all_by_board(
            board.id,
        )

        skills = self.skill_repository.get_all_by_user(
            user.id,
        )

        experiences = self.experience_repository.get_all_by_user(
            user.id,
        )

        educations = self.education_repository.get_all_by_user(
            user.id,
        )

        certificates = self.certificate_repository.get_all_by_user(
            user.id,
        )

        social_links = self.social_link_repository.get_all_by_user(
            user.id,
        )

        achievements = self.achievement_repository.get_all_by_user(
            user.id,
        )

        return PublicPortfolioResponse(
            username=user.username,
            board=board,
            profile=profile,
            projects=projects,
            skills=skills,
            experiences=experiences,
            educations=educations,
            certificates=certificates,
            social_links=social_links,
            achievements=achievements,
        )