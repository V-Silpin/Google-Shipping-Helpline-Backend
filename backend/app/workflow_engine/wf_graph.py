from langgraph.graph import MessagesState, StateGraph, START
from langgraph.checkpoint.memory import MemorySaver
from staff.agent_node import interim_question_node

builder = StateGraph(MessagesState)
#builder.add_node("human_input", human_input)
builder.add_node("interim_question_node", interim_question_node)

# We'll always start with a general travel advisor.
builder.add_edge(START, "interim_question_node")

memory = MemorySaver()
graph = builder.compile(checkpointer=memory)