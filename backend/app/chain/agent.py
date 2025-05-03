from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from utils.llm_obj import llm

prompt = """
You are a helpful assistant.
Data is being sent to you in json format.
It has a list of paths and their respective costs.
Your task is to give recomdations on which optimized path to choose.
"""

prompt_template = ChatPromptTemplate([
    ("system", prompt),
    MessagesPlaceholder("msgs")
])

agent = prompt_template | llm