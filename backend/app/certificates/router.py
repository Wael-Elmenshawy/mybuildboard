from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, status

from app.api.deps import get_certificate_service
from app.auth.dependencies import get_current_user
from app.certificates.schema import (
    CertificateCreate,
    CertificateResponse,
    CertificateUpdate,
)
from app.certificates.service import CertificateService
from app.users.model import User

router = APIRouter(
    prefix="/certificates",
    tags=["Certificates"],
)


@router.post(
    "",
    response_model=CertificateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_certificate(
    data: CertificateCreate,
    current_user: User = Depends(get_current_user),
    service: CertificateService = Depends(get_certificate_service),
):
    return service.create(
        current_user.id,
        data,
    )


@router.get(
    "/me",
    response_model=list[CertificateResponse],
)
def get_my_certificates(
    current_user: User = Depends(get_current_user),
    service: CertificateService = Depends(get_certificate_service),
):
    return service.get_all(
        current_user.id,
    )


@router.patch(
    "/{certificate_id}",
    response_model=CertificateResponse,
)
def update_certificate(
    certificate_id: uuid.UUID,
    data: CertificateUpdate,
    current_user: User = Depends(get_current_user),
    service: CertificateService = Depends(get_certificate_service),
):
    certificate = service.get_by_id(certificate_id)

    return service.update(
        certificate,
        data,
        current_user,
    )


@router.delete(
    "/{certificate_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_certificate(
    certificate_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    service: CertificateService = Depends(get_certificate_service),
):
    certificate = service.get_by_id(certificate_id)

    service.delete(
        certificate,
        current_user,
    )

    return None