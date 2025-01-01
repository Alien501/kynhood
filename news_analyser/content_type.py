from dotenv import load_dotenv
import os
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from langchain_google_genai import GoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import json

from schema import Notification

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
parser = JsonOutputParser(pydantic_object=Notification)
prompt = PromptTemplate(
    template='''Based on the given news, give a catchy line which can be used for notification
        and the type of news content along with location of the news. Give output as json.
        News: {news}''',
    input_variables=["news"],
    partial_variables={"format_instruction": parser.get_format_instructions()},
)
llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=GEMINI_API_KEY)
notification_model = prompt | llm | parser
def generate_notification(news: str):
    """
    Generates a notification and news type based on the input news.
    
    Args:
        news (str): The news content.
        
    Returns:
        dict: The generated notification and news type as JSON.
    """
    try:
        result = notification_model.invoke({"news": news})
        return result
    except Exception as e:
        print(f"Error invoking notification model: {e}")
        return None

if __name__ == "__main__":
    news_example = "Gang Sexual Assault of Mentally Challenged Student in Ayanavaram"
    notification = generate_notification(news_example)
    print(notification)
