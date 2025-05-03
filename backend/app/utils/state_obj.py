from typing import Annotated, List, Dict
from typing_extensions import TypedDict

from langgraph.graph.message import AnyMessage, add_messages

class State(TypedDict):
    inp: str
    isdone: str
    messages: Annotated[list[AnyMessage], add_messages]
