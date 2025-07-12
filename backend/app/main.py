from fastapi import FastAPI,Depends
from sqlmodel import *
import uvicorn
from contextlib import asynccontextmanager
from app.db.db import engine
from app.db import models

@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
def get_string():
    return "HI"
