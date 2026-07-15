from fastapi import APIRouter

from app.auth.router import router as auth_router
from app.boards.router import router as boards_router
from app.profiles.router import router as profiles_router
from app.projects.router import router as projects_router
from app.skills.router import router as skills_router
from app.users.router import router as users_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(users_router)
router.include_router(profiles_router)
router.include_router(boards_router)
router.include_router(projects_router)
router.include_router(skills_router)