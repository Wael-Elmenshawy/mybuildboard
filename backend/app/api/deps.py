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
    repository = ProjectRepository(db)
    return ProjectService(repository)


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