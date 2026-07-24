from fastapi import FastAPI

from app.api.chat import router

app = FastAPI(
    title="Salon Olivia AI"
)

app.include_router(router)