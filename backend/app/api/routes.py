from fastapi import APIRouter
from api.models import Message
from workflow_engine.wf_graph import graph
from fastapi import HTTPException
from langchain_core.messages import HumanMessage

router = APIRouter()

@router.post("/chatbot")
async def chatbot_response(msg: Message):
    """
    API endpoint to handle chatbot messages.
    :param message: The user's message to the chatbot.
    :return: The chatbot's response.
    """

    hum_msg = msg.message
    config = {"configurable": {"thread_id": "1"}}
    initial_state = { "messages": HumanMessage(content=hum_msg)}
    if not hum_msg:
        raise HTTPException(status_code=400, detail="User input cannot be empty")
    
    res = graph.invoke(input=initial_state, config=config)

    ans = { "Chat": [] }

    for message in res["messages"]:
        ans["Chat"].append({"type": message.type, "content": message.content})
    
    return ans