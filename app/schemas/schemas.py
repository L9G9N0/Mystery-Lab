from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Literal
from decimal import Decimal
from datetime import date, datetime

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    avatar_url: Optional[str] = None

class ContactRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    subject: Literal['birthday-party', 'school-program', 'workshop', 'kit-purchase', 'general', 'partnership', 'career']
    message: str = Field(..., min_length=5, max_length=2000)

class NewsletterSubscribe(BaseModel):
    email: EmailStr

class BookingCreate(BaseModel):
    event_title: str = Field(..., min_length=2)
    student_name: str = Field(..., min_length=2)
    student_age: int = Field(..., ge=3, le=18)
    contact_phone: str = Field(..., min_length=8)
    preferred_date: Optional[date] = None

class FeedbackCreate(BaseModel):
    name: str = Field(..., min_length=2)
    rating: int = Field(..., ge=1, le=5)
    comments: Optional[str] = None

class ScienceKitCreate(BaseModel):
    id: str = Field(..., min_length=2)
    name: str = Field(..., min_length=2)
    description: Optional[str] = None
    price: Decimal = Field(..., ge=0)
    age_recommendation: Optional[str] = None
    contents: List[str] = []
    image_url: Optional[str] = None
    gradient: Optional[str] = 'gradient-purple'

class ExperimentCreate(BaseModel):
    title: str = Field(..., min_length=2)
    description: str
    difficulty: Literal['Easy', 'Medium', 'Hard'] = 'Easy'
    estimated_time: str = '15 mins'
    instructions: List[str] = []
    materials: List[str] = []
    video_url: Optional[str] = None
