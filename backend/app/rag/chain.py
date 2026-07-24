from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from app.rag.chatbot import get_llm
from app.rag.prompt import PROMPT
from app.rag.retriever import get_retriever


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


retriever = get_retriever()

llm = get_llm()


rag_chain = (
    {
        "context": retriever | format_docs,
        "question": RunnablePassthrough(),
    }
    | PROMPT
    | llm
    | StrOutputParser()
)