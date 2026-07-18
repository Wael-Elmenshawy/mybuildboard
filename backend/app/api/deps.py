from app.portfolio.service import PortfolioService
from app.users.repository import UserRepository
from app.profiles.repository import ProfileRepository
from app.experiences.repository import ExperienceRepository
from app.experiences.service import ExperienceService
from fastapi import Depends
from sqlalchemy.orm import Session

from app.achievements.repository import AchievementRepository
from app.achievements.service import AchievementService
from app.auth.service import AuthService
from app.boards.repository import BoardRepository
from app.boards.service import BoardService
from app.certificates.repository import CertificateRepository
from app.certificates.service import CertificateService
from app.db.session import get_db
from app.educations.repository import EducationRepository
from app.educations.service import EducationService
from app.github.repository import GithubConnectionRepository, GithubRepoRepository
from app.github.service import GithubService
from app.profiles.service import ProfileService
from app.projects.repository import ProjectRepository
from app.projects.service import ProjectService
from app.skills.repository import SkillRepository
from app.skills.service import SkillService
from app.social_links.repository import SocialLinkRepository
from app.social_links.service import SocialLinkService
from app.users.service import UserService


def get_user_service(
    db: Session = Depends(get_db),
) -> UserService:
    return UserService(db)


def get_profile_service(
    db: Session = Depends(get_db),
) -> ProfileService:
    return ProfileService(db)


def get_auth_service(
    db: Session = Depends(get_db),
) -> AuthService:
    return AuthService(db)


def get_board_service(
    db: Session = Depends(get_db),
) -> BoardService:
    repository = BoardRepository(db)
    return BoardService(repository)

def get_project_service(
    db: Session = Depends(get_db),
) -> ProjectService:
    project_repository = ProjectRepository(db)
    github_repo_repository = GithubRepoRepository(db)

    return ProjectService(
        repository=project_repository,
        github_repo_repository=github_repo_repository,
    )

def get_skill_service(
    db: Session = Depends(get_db),
) -> SkillService:
    repository = SkillRepository(db)
    return SkillService(repository)


def get_experience_service(
    db: Session = Depends(get_db),
) -> ExperienceService:
    repository = ExperienceRepository(db)
    return ExperienceService(repository)


def get_certificate_service(
    db: Session = Depends(get_db),
) -> CertificateService:
    repository = CertificateRepository(db)
    return CertificateService(repository)


def get_education_service(
    db: Session = Depends(get_db),
) -> EducationService:
    repository = EducationRepository(db)
    return EducationService(repository)


def get_social_link_service(
    db: Session = Depends(get_db),
) -> SocialLinkService:
    repository = SocialLinkRepository(db)
    return SocialLinkService(repository)


def get_achievement_service(
    db: Session = Depends(get_db),
) -> AchievementService:
    repository = AchievementRepository(db)
    return AchievementService(repository)


def get_github_service(
    db: Session = Depends(get_db),
) -> GithubService:
    connection_repository = GithubConnectionRepository(db)
    repo_repository = GithubRepoRepository(db)
    return GithubService(connection_repository, repo_repository)
def get_portfolio_service(
    db: Session = Depends(get_db),
) -> PortfolioService:
    return PortfolioService(
        user_repository=UserRepository(db),
        board_repository=BoardRepository(db),
        profile_repository=ProfileRepository(db),
        project_repository=ProjectRepository(db),
        skill_repository=SkillRepository(db),
        experience_repository=ExperienceRepository(db),
        education_repository=EducationRepository(db),
        certificate_repository=CertificateRepository(db),
        social_link_repository=SocialLinkRepository(db),
        achievement_repository=AchievementRepository(db),
    )