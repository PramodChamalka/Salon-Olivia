from fastapi import APIRouter

from app.database import supabase
from app.schemas.gallery import GalleryItem

router = APIRouter()


@router.get("/gallery", response_model=list[GalleryItem])
async def get_gallery():
    categories_res = (
        supabase.table("category").select("category_id, category_name").execute()
    )
    category_names = {
        row["category_id"]: row["category_name"] for row in categories_res.data
    }

    gallery_res = (
        supabase.table("gallery")
        .select("id, title, image_url, category_id, created_at")
        .order("created_at", desc=True)
        .execute()
    )

    return [
        GalleryItem(
            **row,
            category_name=category_names.get(row["category_id"], "Uncategorized"),
        )
        for row in gallery_res.data
    ]
