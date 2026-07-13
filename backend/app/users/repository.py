from sqlalchemy.orm import Session

from app.shared.repositories.base_repository import BaseRepository
from app.users.model import User


class UserRepository(BaseRepository[User]):
    def __init__(self, db: Session):
        super().__init__(db, User)
