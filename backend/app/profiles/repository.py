import uuid

from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.profiles.model import Profile
from app.shared.repositories.base_repository import BaseRepository


class ProfileRepository(BaseRepository[Profile]):
    def __init__(self, db: Session):
        super().__init__(db, Profile)

    def get_by_user_id(
        self,
        user_id: uuid.UUID,
    ) -> Profile | None:
        return self.db.query(Profile).filter(Profile.user_id == user_id).first()

    def get_by_user_id_with_avatar(
        self,
        user_id: uuid.UUID,
    ) -> Profile | None:
        return (
            self.db.query(Profile)
            .options(joinedload(Profile.avatar))
            .filter(Profile.user_id == user_id)
            .first()
        )

    def update_avatar_reference(
        self,
        profile_id: uuid.UUID,
        avatar_asset_id: uuid.UUID | None,
    ) -> Profile | None:
        profile = self.get_by_id(profile_id)

        if profile is None:
            return None

        profile.avatar_asset_id = avatar_asset_id
        return self.update(profile)

    def remove_avatar_reference(
        self,
        profile_id: uuid.UUID,
    ) -> Profile | None:
        return self.update_avatar_reference(profile_id, None)

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
