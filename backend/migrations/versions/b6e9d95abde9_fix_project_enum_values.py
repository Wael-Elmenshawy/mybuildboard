"""fix_project_enum_values"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "b6e9d95abde9"
down_revision: Union[str, Sequence[str], None] = "fa858a499684"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        ALTER TYPE projectvisibility RENAME TO projectvisibility_old;
    """)

    op.execute("""
        CREATE TYPE projectvisibility AS ENUM (
            'public',
            'private',
            'unlisted'
        );
    """)

    op.execute("""
        ALTER TABLE projects
        ALTER COLUMN visibility
        TYPE projectvisibility
        USING lower(visibility::text)::projectvisibility;
    """)

    op.execute("""
        DROP TYPE projectvisibility_old;
    """)

    op.execute("""
        ALTER TYPE projectstatus RENAME TO projectstatus_old;
    """)

    op.execute("""
        CREATE TYPE projectstatus AS ENUM (
            'draft',
            'published',
            'archived'
        );
    """)

    op.execute("""
        ALTER TABLE projects
        ALTER COLUMN status
        TYPE projectstatus
        USING lower(status::text)::projectstatus;
    """)

    op.execute("""
        DROP TYPE projectstatus_old;
    """)


def downgrade() -> None:
    pass
