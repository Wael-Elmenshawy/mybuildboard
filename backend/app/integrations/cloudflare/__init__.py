"""
Cloudflare integration package.

This package contains the Cloudflare R2 client implementation
and provider used by the Storage layer.
"""

from .provider import CloudflareStorageProvider

__all__ = [
    "CloudflareStorageProvider",
]