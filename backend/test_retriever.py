from app.rag.retriever import get_retriever

retriever = get_retriever()

query = "What is your refund policy"

results = retriever.invoke(query)

print("\nRetrieved Chunks")
print("=" * 80)

for i, doc in enumerate(results, start=1):
    print(f"\nChunk {i}")
    print("=" * 80)
    print("Source:", doc.metadata.get("source"))
    print()
    print(doc.page_content)