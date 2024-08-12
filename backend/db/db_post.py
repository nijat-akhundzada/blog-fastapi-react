from fastapi import Depends, HTTPException, status
from db.database import get_db
from routers.schemas import PostBase
from sqlalchemy.orm import Session
import datetime
from db.models import Post


def create(db: Session = Depends(get_db), request: PostBase = []):
    new_post = Post(
        image_url=request.image_url,
        title=request.title,
        content=request.content,
        creator=request.creator,
        timestamp=datetime.datetime.now()
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all(db: Session = Depends(get_db)):
    return db.query(Post).all()


def delete(id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Post with id {id} not found.')
    db.delete(post)
    db.commit()
    return 'ok'
