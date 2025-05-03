import os
import logging
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv()
google_api_key = os.getenv("GOOGLE_API_KEY")

logger.info("Environment variables loaded successfully.")

logger.info("Initializing Gemini LLM...")

llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=google_api_key)

logger.info("Gemini LLM initialized successfully.")
