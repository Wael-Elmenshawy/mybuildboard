from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_certificate_service
from app.auth.dependencies import get_current_user
from app.certificates.schema import (
    CertificateCreate,
    CertificateResponse,
    CertificateUpdate,
)
from app.certificates.service import CertificateService

router = APIRouter(prefix="/certificates", tags=["Certificates"])


@router.post("", response_model=CertificateResponse, status_code=status.HTTP_201_CREATED)
def create_certificate(
    data: CertificateCreate,
    current_user=Depends(get_current_user),
    service: CertificateService = Depends(get_certificate_service),
):
    return service.create(current_user.id, data)


@router.get("/me", response_model=list[CertificateResponse])
def get_my_certificates(
    current_user=Depends(get_current_user),
    service: CertificateService = Depends(get_certificate_service),
):
    return service.get_all(current_user.id)


@router.patch("/{certificate_id}", response_model=CertificateResponse)
def update_certificate(
    certificate_id,
    data: CertificateUpdate,
    current_user=Depends(get_current_user),
    service: CertificateService = Depends(get_certificate_service),
):
    certificate = service.get_by_id(certificate_id)
    if certificate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certificate not found")
    if certificate.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")
    return service.update(certificate, data)


@router.delete("/{certificate_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_certificate(
    certificate_id,
    current_user=Depends(get_current_user),
    service: CertificateService = Depends(get_certificate_service),
):
    certificate = service.get_by_id(certificate_id)
    if certificate is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certificate not found")
    if certificate.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")
    service.delete(certificate)