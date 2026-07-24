from fastapi import APIRouter

from app.models.chat import ChatRequest, ChatResponse
from app.rag.chain import rag_chain

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):

    answer = rag_chain.invoke(request.question)

    return ChatResponse(
        answer=answer
    )