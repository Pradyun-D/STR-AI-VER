from sqlmodel import SQLModel,Field, Relationship
from typing import Optional,List
from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import JSONB
from pydantic import BaseModel
from datetime import datetime
from zoneinfo import ZoneInfo

def now_ist():
    return datetime.now(ZoneInfo("Asia/Kolkata"))

class Conversation(BaseModel):
    query: str 
    response: str

class SolvedQuestion(BaseModel):
    question: Optional[str] = Field(default=None,description="The question the user asked")
    data: List[Conversation]= Field(default_factory=list)
    struggle: Optional[int]=Field(default=None,description="Struggle out of 10")

class User(SQLModel,table=True):
    user_id:Optional[int]=Field(default=None,primary_key=True)
    name:str
    preferred_coding_language: Optional[str]=Field(default="C++")
    description: Optional[str]=Field(default=None,description="User's coding journey/experience")
    learnings: Optional[List["LearningSession"]]= Relationship(back_populates="user")
    deep_solved: Optional[List["DeepSolvingSession"]]=Relationship(back_populates="user")
    quick_solved: Optional[List["QuickSolutionSession"]]=Relationship(back_populates="user")


#session for learning any topic
class LearningSession(SQLModel,table=True):
    session_id: Optional[str]=Field(default=None,primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    user: "User" = Relationship(back_populates="learnings")
    data: List[Conversation]= Field(default_factory=list, sa_column=Column(JSONB))
    created_at: datetime = Field(default_factory=now_ist)
    updated_at: datetime = Field(default_factory=now_ist)

#session for solving a question interactively from groundup
class DeepSolvingSession(SQLModel,table=True):
    session_id: Optional[str]=Field(default=None,primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    user: "User" = Relationship(back_populates="deep_solved")
    questions_solved:Optional[SolvedQuestion]=Field(default=None,sa_column=Column(JSONB))
    created_at: datetime = Field(default_factory=now_ist)
    updated_at: datetime = Field(default_factory=now_ist)

#session for getting a solution to the asked question (OPENING PAGE)
class QuickSolutionSession(SQLModel,table=True):
    session_id: Optional[str]=Field(default=None,primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    user: "User" = Relationship(back_populates="quick_solved")
    questions_solved:Optional[SolvedQuestion]=Field(default=None,sa_column=Column(JSONB))   
    created_at: datetime = Field(default_factory=now_ist)
    updated_at: datetime = Field(default_factory=now_ist)





