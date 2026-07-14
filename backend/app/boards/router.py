from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_board_service
from app.auth.dependencies import get_current_user
from app.boards.schema import (
    BoardCreate,
    BoardResponse,
    BoardUpdate,
)
from app.boards.service import BoardService

router = APIRouter(
    prefix="/boards",
    tags=["Boards"],
)


@router.post(
    "",
    response_model=BoardResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_board(
    data: BoardCreate,
    current_user=Depends(get_current_user),
    service: BoardService = Depends(get_board_service),
):
    return service.create(
        owner_id=current_user.id,
        data=data,
    )


@router.get(
    "",
    response_model=list[BoardResponse],
)
def get_my_boards(
    current_user=Depends(get_current_user),
    service: BoardService = Depends(get_board_service),
):
    return service.get_all(current_user.id)


@router.get(
    "/{slug}",
    response_model=BoardResponse,
)
def get_board(
    slug: str,
    service: BoardService = Depends(get_board_service),
):
    board = service.get_by_slug(slug)

    if board is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Board not found",
        )

    return board


@router.patch(
    "/{slug}",
    response_model=BoardResponse,
)
def update_board(
    slug: str,
    data: BoardUpdate,
    current_user=Depends(get_current_user),
    service: BoardService = Depends(get_board_service),
):
    board = service.get_by_slug(slug)

    if board is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Board not found",
        )

    if board.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to update this board.",
        )

    return service.update(
        board,
        data,
    )


@router.delete(
    "/{slug}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_board(
    slug: str,
    current_user=Depends(get_current_user),
    service: BoardService = Depends(get_board_service),
):
    board = service.get_by_slug(slug)

    if board is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Board not found",
        )

    if board.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to delete this board.",
        )

    service.delete(board)