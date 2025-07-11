from fastapi import FastAPI,Depends
from sqlmodel import *
from .db import engine
import os
from contextlib import asynccontextmanager
from .db import engine,SQLModel

SQLModel.metdata.create_all(engine)

async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield


app = FastAPI(lifespan=lifespan)

@app.get("/")
def get_string():
    return "HI"
