from fastapi import APIRouter, Depends

from app.api.deps import get_portfolio_service
from app.portfolio.schema import PublicPortfolioResponse
from app.portfolio.service import PortfolioService

router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"],
)


@router.get(
    "/{username}",
    response_model=PublicPortfolioResponse,
)
def get_public_portfolio(
    username: str,
    service: PortfolioService = Depends(get_portfolio_service),
) -> PublicPortfolioResponse:
    return service.get_public_portfolio(username)