from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import supabase

from app.api.chat import router

app = FastAPI(
    title="Salon Olivia AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test-db")
def test_db():
    data = supabase.table("profiles").select("*").limit(1).execute()
    return data.data

app.include_router(router)