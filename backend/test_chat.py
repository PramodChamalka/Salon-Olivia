from app.rag.chain import rag_chain

while True:

    question = input("\nYou: ")

    if question.lower() == "exit":
        break

    answer = rag_chain.invoke(question)

    print("\nAssistant:")
    print(answer)