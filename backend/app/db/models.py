from sqlmodel import SQLModel,Field, Relationship
from typing import Optional,List
from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime
from zoneinfo import ZoneInfo

def now_ist():
    return datetime.now(ZoneInfo("Asia/Kolkata"))

class User(SQLModel,table=True):
    user_id:Optional[int]=Field(default=None,primary_key=True)
    name:str
    preferred_coding_language: Optional[str]=Field(default="C++")
    description: Optional[str]=Field(default=None,description="User's coding journey/experience")
    straiver_session: List["StraiverSession"]=Relationship(back_populates="user")
    progress_session: List["ProgressSession"]=Relationship(back_populates="user")

class StraiverSession(SQLModel,table=True):
    session_id: Optional[str]=Field(default=None,primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    user: "User" = Relationship(back_populates="straiver_session")
    data: dict = Field(default_factory=dict, sa_column=Column(JSONB))
    created_at: datetime = Field(default_factory=now_ist)
    updated_at: datetime = Field(default_factory=now_ist)

class ProgressSession(SQLModel,table=True):
    session_id: Optional[str]=Field(default=None,primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    user: "User" = Relationship(back_populates="progress_session")
    data: dict = Field(default_factory=dict, sa_column=Column(JSONB))
    created_at: datetime = Field(default_factory=now_ist)
    updated_at: datetime = Field(default_factory=now_ist)



