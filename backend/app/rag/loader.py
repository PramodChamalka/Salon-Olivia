from pathlib import Path
from langchain_community.document_loaders import DirectoryLoader, TextLoader

# Absolute path to project root
BASE_DIR = Path(__file__).resolve().parents[3]

DATA_PATH = BASE_DIR / "src" / "data" / "markdown"

print(DATA_PATH)  # For debugging


def load_documents():
    loader = DirectoryLoader(
        str(DATA_PATH),
        glob="**/*.md",
        loader_cls=TextLoader,
        show_progress=True
    )

    documents = loader.load()

    print(f"Loaded {len(documents)} documents")

    return documents