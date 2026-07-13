from sqlalchemy.orm import Session

from app.profiles.model import Profile
from app.profiles.repository import ProfileRepository
from app.profiles.schema import ProfileCreate, ProfileUpdate


class ProfileService:
    def __init__(self, db: Session):
        self.repository = ProfileRepository(db)

    def get_profile(self, user_id: str):
        return self.repository.get_by_user_id(user_id)

    def create_profile(
        self,
        user_id: str,
        profile: ProfileCreate,
    ) -> Profile:
        new_profile = Profile(
            user_id=user_id,
            **profile.model_dump(),
        )

        return self.repository.create(new_profile)

    def update_profile(
        self,
        user_id: str,
        profile: ProfileUpdate,
    ) -> Profile | None:
        existing = self.repository.get_by_user_id(user_id)

        if existing is None:
            return None

        for key, value in profile.model_dump(
            exclude_unset=True,
        ).items():
            setattr(existing, key, value)

        return self.repository.update(existing)
