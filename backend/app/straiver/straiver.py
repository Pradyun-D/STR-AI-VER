from pydantic import BaseModel,Field
from typing import List,Optional
from enum import Enum
from agno.workflow import Workflow
from agno.agent import Agent,RunResponse
from app.config import model,storage

class Conversation(BaseModel):
    user_query: str 
    response: str

class StraiverMode(str,Enum):
    DeepSolve = "DeepSolve"
    QuickSolve = "QuickSolve"
    Learn = "Learn"

class DeepSolve(BaseModel):
    question: str = Field(description="The question the user asked")
    struggle: Optional[int]=Field(default=None,description="Struggle out of 10") 
    response: str = Field(description="The response of the agent")

class StraiverInput(BaseModel):
    user_query: str
    mode: StraiverMode
    deep_solves:Optional[List[DeepSolve]]=Field(default_factory=list)
    quick_solves:Optional[List[str]]=Field(default_factory=list)
    concepts_asked:Optional[List[str]]=Field(default_factory=list)

class StraiverOutput(BaseModel):
    response: str
    questions_solved:Optional[List[DeepSolve]]=Field(default_factory=list)
    quick_solutions_asked:Optional[List[str]]=Field(default_factory=list)
    concepts_asked:Optional[List[str]]=Field(default_factory=list)

class Straiver(Workflow):

    learn_concept:Agent = Agent(
        model= model,
        description=(
 
        ),
        instructions=[
  
        ],
        storage=storage,
        debug_mode=True
    )

    deep_solve:Agent = Agent(
        model= model,
        description=(
 
        ),
        instructions=[
  
        ],
        storage=storage,
        response_model=DeepSolve,
        add_history_to_messages=True,
        num_history_responses=5,
        debug_mode=True      
    )

    quick_solve:Agent = Agent(
        model= model,
        description=(
 
        ),
        instructions=[
  
        ],
        storage=storage,
        debug_mode=True      
    )

    def run(self,request: StraiverInput)->RunResponse:
        return RunResponse(content="Not implemented")
