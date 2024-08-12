from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from routers.schemas import PostBase
from db.database import get_db
from db import db_post
import string
import random
import shutil

router = APIRouter(
    prefix='/post',
    tags=['Post']
)


@router.post('')
def create(request: PostBase, db: Session = Depends(get_db)):
    return db_post.create(db=db, request=request)


@router.get('/all')
def posts(db: Session = Depends(get_db)):
    return db_post.get_all(db=db)


@router.delete('/{id}')
def delete(id: int, db: Session = Depends(get_db)):
    return db_post.delete(id=id, db=db)


@router.post('/image')
def upload_image(image: UploadFile = File(...)):
    letters = string.ascii_letters
    rand_letters = random.choices(letters, k=6)
    rand_str = ''.join(rand_letters)
    new = f'_{rand_str}.'
    filename = new.join(image.filename.rsplit('.', 1))
    path = f'images/{filename}'

    with open(path, 'w+b') as buffer:
        shutil.copyfileobj(image.file, buffer)

    return {'filename': path}
