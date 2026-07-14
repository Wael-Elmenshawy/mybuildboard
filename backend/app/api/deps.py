from fastapi import Depends
from sqlalchemy.orm import Session

from app.auth.service import AuthService
from app.boards.repository import BoardRepository
from app.boards.service import BoardService
from app.db.session import get_db
from app.profiles.service import ProfileService
from app.projects.repository import ProjectRepository
from app.projects.service import ProjectService
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