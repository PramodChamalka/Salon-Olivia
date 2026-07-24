from pathlib import Path

from langchain_chroma import Chroma

from app.rag.embeddings import get_embedding_model

VECTOR_DB_PATH = Path("./vectorstore")


def get_retriever():

    embedding_model = get_embedding_model()

    vectorstore = Chroma(
        persist_directory=str(VECTOR_DB_PATH),
        embedding_function=embedding_model,
    )

    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={
            "k": 4
        }
    )

    return retriever