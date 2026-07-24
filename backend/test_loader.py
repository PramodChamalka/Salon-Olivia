from app.rag.loader import load_documents
from app.rag.splitter import split_documents

docs = load_documents()
chunks = split_documents(docs)

print(f"\nDocuments: {len(docs)}")
print(f"Chunks: {len(chunks)}")

for i in range(5):
    print("\n" + "=" * 80)
    print(f"Chunk {i + 1}")
    print("=" * 80)
    print(chunks[i].page_content)