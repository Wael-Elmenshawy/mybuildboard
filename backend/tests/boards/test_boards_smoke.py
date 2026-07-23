from fastapi import status


def test_create_board_requires_auth(client):
    response = client.post(
        "/api/v1/boards",
        json={},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
