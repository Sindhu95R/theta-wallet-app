import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_ai_response(user_query, transactions, conversation_history=None):
    generation_config = {
        "temperature": 0.7,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 1024,
    }
    
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        generation_config=generation_config,
    )
    
    # Prepare the initial prompt with specific instructions for a financial chatbot
    initial_prompt = """
    You are a friendly and knowledgeable financial assistant. Analyze the given cryptocurrency transaction data and respond to the user's query. 
    Provide your answer in the following format:

    Answer: [Give a brief, friendly response to the user's question. Use simple terms and mention specific amounts and dates. Start with "So" to make it conversational.]

    Financial Tips:
    1. [Provide a practical tip about tracking or managing crypto spending. Suggest a simple tool or method, and explain why it's helpful.]
    2. [Suggest setting financial goals related to crypto. Give an example or two of possible goals.]
    3. [Offer a tip about ways to potentially increase crypto holdings. Mention a specific method, but also remind the user to be cautious and do research.]

    For each tip:
    - Keep it concise and actionable
    - Use a friendly, conversational tone as if chatting with a friend
    - Add a brief explanation or example to make it more relatable
    - End with a question or encouraging statement to engage the user

    Avoid technical jargon and don't mention being an AI.

    Transaction Data:
    """
    
    for i, tx in enumerate(transactions, start=1):
        initial_prompt += f"{i}. Date: {tx['timestamp']}, Amount: {tx.get('amount', 'N/A')}, " \
                          f"Sender: {tx['sender']}, Recipient: {tx['recipient']}, " \
                          f"Category: {tx['category']}, Gas Fee: {tx['gas_fee']}\n"
    
    initial_prompt += f"\nUser Query: {user_query}\n\nPlease respond to the user's query:"

    # Include conversation history if available
    if conversation_history:
        initial_prompt = conversation_history + "\n\n" + initial_prompt

    # Start the chat session
    chat = model.start_chat(history=[])

    # Send the user query along with the initial prompt
    response = chat.send_message(initial_prompt)

    # Extract the response text
    ai_response = response.text

    return ai_response