from sqlmodel import create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_URL = os.getenv("POSTGRES_URL")

engine = create_engine(POSTGRES_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session