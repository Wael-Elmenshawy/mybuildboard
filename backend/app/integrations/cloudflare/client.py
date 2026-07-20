"""
Cloudflare R2 client factory.
"""

from __future__ import annotations

import boto3
from botocore.client import BaseClient

from app.core.config.settings import settings

from .exceptions import CloudflareConfigurationError


class CloudflareClientFactory:
    """
    Factory responsible for creating a configured Cloudflare R2 client.
    """

    @staticmethod
    def create() -> BaseClient:
        """
        Create and return a configured boto3 S3 client for Cloudflare R2.

        Raises:
            CloudflareConfigurationError:
                If one or more required configuration values are missing.
        """

        required_settings = {
            "R2_ACCOUNT_ID": settings.R2_ACCOUNT_ID,
            "R2_ACCESS_KEY_ID": settings.R2_ACCESS_KEY_ID,
            "R2_SECRET_ACCESS_KEY": settings.R2_SECRET_ACCESS_KEY,
            "R2_BUCKET_NAME": settings.R2_BUCKET_NAME,
        }

        missing = [key for key, value in required_settings.items() if not value]

        if missing:
            raise CloudflareConfigurationError(
                "Missing Cloudflare R2 configuration: " + ", ".join(missing)
            )

        endpoint_url = f"https://{settings.R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

        return boto3.client(
            service_name="s3",
            endpoint_url=endpoint_url,
            aws_access_key_id=settings.R2_ACCESS_KEY_ID,
            aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
            region_name="auto",
        )
