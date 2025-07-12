from FastAPI import APIRouter,Depends
from sqlmodel import Session,select
from ...db.models import User
from ...db.db import get_session

router = APIRouter(
    prefix="/users",
    tags=["User"]
)

@router.post("/",response_model=User)
def create_user(user:User,session:Session=Depends(get_session)):
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.get("/{user_id}")
def get_user(user_id:int, session=Session=Depends(get_session)):
    user = session.get(User,user_id)
    return user