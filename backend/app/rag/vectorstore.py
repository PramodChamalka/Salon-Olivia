from pathlib import Path

from langchain_chroma import Chroma

VECTOR_DB_PATH = Path("./vectorstore")


def create_vector_store(chunks, embedding_model):
    """
    Creates and persists the Chroma vector database.
    """

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=str(VECTOR_DB_PATH),
    )

    return vectorstore