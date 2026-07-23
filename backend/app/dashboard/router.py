from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.dashboard.repository import DashboardRepository
from app.dashboard.schema import DashboardResponse
from app.dashboard.service import DashboardService
from app.db.session import get_db
from app.users.model import User

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "",
    response_model=DashboardResponse,
)
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    repository = DashboardRepository(db)
    service = DashboardService(repository)

    return service.get_dashboard(current_user.id)
