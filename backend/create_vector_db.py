from app.rag.loader import load_documents
from app.rag.splitter import split_documents
from app.rag.embeddings import get_embedding_model
from app.rag.vectorstore import create_vector_store


def main():

    print("\nLoading markdown files...")
    documents = load_documents()

    print("\nSplitting documents...")
    chunks = split_documents(documents)

    print("\nLoading embedding model...")
    embedding_model = get_embedding_model()

    print("\nCreating Chroma vector database...")
    create_vector_store(chunks, embedding_model)

    print("\nVector database created successfully!")

    print(f"Documents : {len(documents)}")
    print(f"Chunks     : {len(chunks)}")


if __name__ == "__main__":
    main()