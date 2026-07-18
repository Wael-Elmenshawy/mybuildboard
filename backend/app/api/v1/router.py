from app.portfolio.router import router as portfolio_router
from app.experiences.router import router as experiences_router
from fastapi import APIRouter

from app.achievements.router import router as achievements_router
from app.auth.router import router as auth_router
from app.boards.router import router as boards_router
from app.certificates.router import router as certificates_router
from app.educations.router import router as educations_router
from app.github.router import router as github_router
from app.profiles.router import router as profiles_router
from app.projects.router import router as projects_router
from app.skills.router import router as skills_router
from app.social_links.router import router as social_links_router
from app.users.router import router as users_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(users_router)
router.include_router(profiles_router)
router.include_router(boards_router)
router.include_router(projects_router)
router.include_router(skills_router)
router.include_router(experiences_router)
router.include_router(certificates_router)
router.include_router(educations_router)
router.include_router(social_links_router)
router.include_router(achievements_router)
router.include_router(github_router)
router.include_router(portfolio_router)