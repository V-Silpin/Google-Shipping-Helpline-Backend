from langgraph.types import Command
from typing import Literal
from langchain_core.messages import HumanMessage

from chain.agent import agent
from utils.state_obj import State

def interim_question_node(state: State):
    print(state)
    hmes = { "msgs" : state["messages"] }
    result = agent.invoke(hmes)
    txt = result.text()
    goto = "__end__"
    if txt == "DONE":
        goto = "__end__"       
    
    if len(state["messages"]) == 0:
        pass
    return Command(
        update={
            "messages": result,
        }
    )