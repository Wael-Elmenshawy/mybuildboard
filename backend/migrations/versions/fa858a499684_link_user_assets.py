"""link user assets

Revision ID: fa858a499684
Revises: 211f8df6436a
Create Date: 2026-07-18 18:48:13.356782

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fa858a499684'
down_revision: Union[str, Sequence[str], None] = '211f8df6436a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "profiles",
        sa.Column("avatar_asset_id", sa.UUID(), nullable=True),
    )
    op.create_unique_constraint(
        "uq_profiles_avatar_asset_id",
        "profiles",
        ["avatar_asset_id"],
    )
    op.create_foreign_key(
        "fk_profiles_avatar_asset_id_assets",
        "profiles",
        "assets",
        ["avatar_asset_id"],
        ["id"],
        ondelete="SET NULL",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        "uq_profiles_avatar_asset_id",
        "profiles",
        type_="unique",
    )
    op.drop_constraint(
        "fk_profiles_avatar_asset_id_assets",
        "profiles",
        type_="foreignkey",
    )
    op.drop_column("profiles", "avatar_asset_id")
