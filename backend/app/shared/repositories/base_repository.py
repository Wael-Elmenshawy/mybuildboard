from sqlalchemy.orm import Session


class BaseRepository[T]:
    def __init__(
        self,
        db: Session,
        model: type[T],
    ):
        self.db = db
        self.model = model

    def get_by_id(self, obj_id) -> T | None:
        return self.db.get(self.model, obj_id)

    def get_all(self) -> list[T]:
        return self.db.query(self.model).all()

    def create(self, obj: T) -> T:
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def delete(self, obj: T) -> None:
        self.db.delete(obj)
        self.db.commit()
