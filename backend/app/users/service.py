from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.users.model import User
from app.users.repository import UserRepository
from app.users.schema import UserCreate


class UserService:
    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def get_all_users(self):
        return self.repository.get_all()

    def create_user(self, data: UserCreate) -> User:

        if self.repository.get_by_email(data.email):
            raise ValueError("Email already exists")

        if self.repository.get_by_username(data.username):
            raise ValueError("Username already exists")

        user = User(
            email=data.email,
            username=data.username,
            password=hash_password(data.password),
            provider="local",
            provider_id=data.email,
            is_active=True,
        )

        return self.repository.create(user)
