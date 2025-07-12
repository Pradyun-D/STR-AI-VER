from pydantic import BaseModel,Field
from typing import List,Optional,AsyncIterator
from enum import Enum
from agno.agent import Agent,RunResponse
from app.config import model,storage

class Conversation(BaseModel):
    user_query: str 
    response: str

class DeepSolve(BaseModel):
    question: str = Field(description="The question the user asked")
    struggle: Optional[int]=Field(default=None,description="Struggle out of 10") 
    response: str = Field(description="The response of the agent")

class ProgressInput(BaseModel):
    user_input: str
    questions_solved:Optional[List[DeepSolve]]=Field(default_factory=list)
    quick_solutions_asked:Optional[List[str]]=Field(default_factory=list)
    concepts_asked:Optional[List[str]]=Field(default_factory=list)

user_progress:Agent = Agent(
    model= model,
    description=(

    ),
    instructions=[

    ],
    storage=storage,
    debug_mode=True
)

def know_progress(request:ProgressInput)->RunResponse:
    return RunResponse(content="Not implemented")