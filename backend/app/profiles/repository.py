from sqlalchemy.orm import Session

from app.profiles.model import Profile
from app.shared.repositories.base_repository import BaseRepository


class ProfileRepository(BaseRepository[Profile]):
    def __init__(self, db: Session):
        super().__init__(db, Profile)

    def get_by_user_id(
        self,
        user_id: str,
    ) -> Profile | None:
        return self.db.query(Profile).filter(Profile.user_id == user_id).first()

    def create(
        self,
        profile: Profile,
    ) -> Profile:
        self.db.add(profile)
        self.db.commit()
        self.db.refresh(profile)
        return profile

    def update(
        self,
        profile: Profile,
    ) -> Profile:
        self.db.commit()
        self.db.refresh(profile)
        return profile
