from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class GalleryItem(BaseModel):
    id: UUID
    title: str
    image_url: str
    category_id: UUID
    category_name: str
    created_at: datetime
