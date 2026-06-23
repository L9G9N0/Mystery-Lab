import logging
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Header, Query, status
from app.core.db import supabase
from app.schemas.schemas import (
    ProfileUpdate,
    ContactRequestCreate,
    NewsletterSubscribe,
    BookingCreate,
    FeedbackCreate,
    ScienceKitCreate,
    ExperimentCreate
)

logger = logging.getLogger(__name__)
router = APIRouter()

# ─── Auth Verification Dependency ──────────────────────────────────────────

class AuthUser:
    def __init__(self, user_id: str, email: str, is_admin: bool):
        self.user_id = user_id
        self.email = email
        self.is_admin = is_admin

async def get_current_user(authorization: Optional[str] = Header(None)) -> AuthUser:
    """Validate Bearer JWT session token against Supabase Auth and resolve user profile and admin privileges."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
    
    parts = authorization.split(" ")
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid Authorization header format. Expected 'Bearer <token>'")
    
    token = parts[1]
    try:
        user_response = supabase.auth.get_user(jwt=token)
        if not user_response or not user_response.user:
            raise HTTPException(status_code=401, detail="Invalid or expired session token")
        
        user_id = user_response.user.id
        email = user_response.user.email or ""
        
        # Check if user has admin privileges
        admin_response = supabase.table("admins").select("*").eq("user_id", user_id).execute()
        is_admin_user = len(admin_response.data) > 0
        
        return AuthUser(user_id=user_id, email=email, is_admin=is_admin_user)
    except Exception as e:
        logger.error(f"JWT verification failure: {e}")
        raise HTTPException(status_code=401, detail="Authentication failed")

async def get_current_admin(current_user: AuthUser = Depends(get_current_user)) -> AuthUser:
    """Enforces admin-only access."""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Forbidden: Administrative privileges required")
    return current_user


# ─── User Profile Routes ───────────────────────────────────────────────────

@router.get("/auth/profile/", tags=["Authentication"])
async def get_user_profile(user: AuthUser = Depends(get_current_user)):
    """Fetch user profile metadata ledger from Supabase."""
    try:
        profile_response = supabase.table("profiles").select("*").eq("id", user.user_id).execute()
        if not profile_response.data:
            # Create default profile if missing
            db_res = supabase.table("profiles").insert({
                "id": user.user_id,
                "email": user.email,
                "name": user.email.split('@')[0]
            }).execute()
            data = db_res.data[0]
        else:
            data = profile_response.data[0]
        
        data["is_admin"] = user.is_admin
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve profile: {e}")

@router.post("/auth/profile/", tags=["Authentication"])
async def update_user_profile(profile: ProfileUpdate, user: AuthUser = Depends(get_current_user)):
    """Update profile attributes."""
    try:
        update_data = {k: v for k, v in profile.dict().items() if v is not None}
        if not update_data:
            # Check profile again to return complete data
            profile_response = supabase.table("profiles").select("*").eq("id", user.user_id).execute()
            data = profile_response.data[0] if profile_response.data else {}
            data["is_admin"] = user.is_admin
            return data
        
        update_data["updated_at"] = "now()"
        db_res = supabase.table("profiles").update(update_data).eq("id", user.user_id).execute()
        data = db_res.data[0]
        data["is_admin"] = user.is_admin
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {e}")


# ─── Public Lead Form Submissions ──────────────────────────────────────────

@router.post("/contact/", tags=["Forms"])
async def submit_contact_request(payload: ContactRequestCreate):
    """Public lead collection form submission."""
    try:
        db_res = supabase.table("contact_requests").insert({
            "name": payload.name,
            "email": payload.email,
            "phone": payload.phone,
            "subject": payload.subject,
            "message": payload.message
        }).execute()
        return {"status": "ok", "message": "Enquiry submitted successfully.", "id": db_res.data[0]["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save contact request: {e}")

@router.post("/newsletter/", tags=["Forms"])
async def subscribe_newsletter(payload: NewsletterSubscribe):
    """Subscribe to the weekly science news newsletter list."""
    try:
        supabase.table("newsletter").insert({"email": payload.email}).execute()
        return {"status": "ok", "message": "Successfully subscribed to the newsletter."}
    except Exception as e:
        # Check if duplicate key violation
        if "duplicate" in str(e).lower() or "already exists" in str(e).lower():
            return {"status": "ok", "message": "Email is already subscribed."}
        raise HTTPException(status_code=500, detail=f"Failed to save subscription: {e}")


# ─── Protected Student Interactions ────────────────────────────────────────

@router.post("/booking/", tags=["Interactions"])
async def create_workshop_booking(payload: BookingCreate, user: AuthUser = Depends(get_current_user)):
    """Reserve workshop or request demo sessions (Requires Authentication)."""
    try:
        db_res = supabase.table("bookings").insert({
            "user_id": user.user_id,
            "event_title": payload.event_title,
            "student_name": payload.student_name,
            "student_age": payload.student_age,
            "contact_phone": payload.contact_phone,
            "preferred_date": str(payload.preferred_date) if payload.preferred_date else None
        }).execute()
        return {"status": "ok", "message": "Workshop slot requested successfully.", "id": db_res.data[0]["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save booking request: {e}")

@router.post("/feedback/", tags=["Interactions"])
async def submit_feedback(payload: FeedbackCreate, user: AuthUser = Depends(get_current_user)):
    """Submit science experience feedback review."""
    try:
        db_res = supabase.table("feedback").insert({
            "user_id": user.user_id,
            "name": payload.name,
            "rating": payload.rating,
            "comments": payload.comments
        }).execute()
        return {"status": "ok", "message": "Thank you for your feedback!", "id": db_res.data[0]["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit feedback: {e}")

@router.get("/feedback/", tags=["Interactions"])
async def list_feedback():
    """Retrieve public testimonials reviews list."""
    try:
        db_res = supabase.table("feedback").select("*").order("created_at", desc=True).limit(20).execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch feedback list: {e}")


# ─── Science Kits & Experiments Catalog ─────────────────────────────────────

@router.get("/kits/", tags=["Catalog"])
async def list_science_kits():
    """Fetch available science kits catalogs from Postgres."""
    try:
        db_res = supabase.table("science_kits").select("*").execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch science kits: {e}")

@router.get("/experiments/", tags=["Catalog"])
async def list_experiments():
    """Fetch detailed science experiments guides inventory."""
    try:
        db_res = supabase.table("experiments").select("*").execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch experiments list: {e}")


# ─── Bookmarks & Favorites ──────────────────────────────────────────────────

@router.get("/bookmarks/", tags=["Interactions"])
async def list_user_bookmarks(user: AuthUser = Depends(get_current_user)):
    """List bookmarks and favorites saved by the authenticated user."""
    try:
        db_res = supabase.table("bookmarks").select("*").eq("user_id", user.user_id).execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve bookmarks: {e}")

@router.post("/bookmarks/", tags=["Interactions"])
async def create_bookmark(
    experiment_id: Optional[str] = Query(None),
    kit_id: Optional[str] = Query(None),
    user: AuthUser = Depends(get_current_user)
):
    """Add a kit or experiment key to user bookmarks ledger."""
    if not experiment_id and not kit_id:
        raise HTTPException(status_code=400, detail="Must supply experiment_id or kit_id query parameter")
    
    try:
        insert_data = {"user_id": user.user_id}
        if experiment_id:
            insert_data["experiment_id"] = experiment_id
        if kit_id:
            insert_data["kit_id"] = kit_id

        db_res = supabase.table("bookmarks").insert(insert_data).execute()
        return {"status": "ok", "message": "Item bookmarked.", "data": db_res.data[0]}
    except Exception as e:
        if "duplicate" in str(e).lower() or "already exists" in str(e).lower():
            return {"status": "ok", "message": "Item is already bookmarked."}
        raise HTTPException(status_code=500, detail=f"Failed to create bookmark: {e}")

@router.delete("/bookmarks/", tags=["Interactions"])
async def delete_bookmark(
    experiment_id: Optional[str] = Query(None),
    kit_id: Optional[str] = Query(None),
    user: AuthUser = Depends(get_current_user)
):
    """Remove item from user bookmarks list."""
    try:
        query = supabase.table("bookmarks").delete().eq("user_id", user.user_id)
        if experiment_id:
            query = query.eq("experiment_id", experiment_id)
        if kit_id:
            query = query.eq("kit_id", kit_id)
        
        db_res = query.execute()
        return {"status": "ok", "message": "Bookmark removed."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete bookmark: {e}")


# ─── Administrative Dashboard Controls (Admin Only) ──────────────────────────

@router.get("/admin/users/", tags=["Admin"])
async def admin_list_users(admin: AuthUser = Depends(get_current_admin)):
    """Retrieve full database profiles list of registered users."""
    try:
        db_res = supabase.table("profiles").select("*").execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Admin query failed: {e}")

@router.get("/admin/enquiries/", tags=["Admin"])
async def admin_list_enquiries(admin: AuthUser = Depends(get_current_admin)):
    """Fetch all school, general, and careers submissions details."""
    try:
        db_res = supabase.table("contact_requests").select("*").order("created_at", desc=True).execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Admin query failed: {e}")

@router.get("/admin/bookings/", tags=["Admin"])
async def admin_list_bookings(admin: AuthUser = Depends(get_current_admin)):
    """Fetch all workshop and student bookings registries."""
    try:
        db_res = supabase.table("bookings").select("*").order("created_at", desc=True).execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Admin query failed: {e}")

@router.get("/admin/newsletter/", tags=["Admin"])
async def admin_list_newsletters(admin: AuthUser = Depends(get_current_admin)):
    """Get full newsletter subscriber mail list."""
    try:
        db_res = supabase.table("newsletter").select("*").execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Admin query failed: {e}")

@router.post("/admin/kits/", tags=["Admin"])
async def admin_save_kit(payload: ScienceKitCreate, admin: AuthUser = Depends(get_current_admin)):
    """Admin only: create or update a science kit detail."""
    try:
        db_res = supabase.table("science_kits").upsert({
            "id": payload.id,
            "name": payload.name,
            "description": payload.description,
            "price": float(payload.price),
            "age_recommendation": payload.age_recommendation,
            "contents": payload.contents,
            "image_url": payload.image_url,
            "gradient": payload.gradient
        }).execute()
        
        # Log action
        supabase.table("activity_logs").insert({
            "admin_id": admin.user_id,
            "action": "SAVE_KIT",
            "description": f"Saved science kit '{payload.name}' (id: {payload.id})"
        }).execute()
        
        return {"status": "ok", "data": db_res.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Admin kit upsert failed: {e}")

@router.post("/admin/experiments/", tags=["Admin"])
async def admin_save_experiment(payload: ExperimentCreate, admin: AuthUser = Depends(get_current_admin)):
    """Admin only: create or update an experiment detail."""
    try:
        db_res = supabase.table("experiments").upsert({
            "title": payload.title,
            "description": payload.description,
            "difficulty": payload.difficulty,
            "estimated_time": payload.estimated_time,
            "instructions": payload.instructions,
            "materials": payload.materials,
            "video_url": payload.video_url
        }).execute()
        
        # Log action
        supabase.table("activity_logs").insert({
            "admin_id": admin.user_id,
            "action": "SAVE_EXPERIMENT",
            "description": f"Saved science experiment '{payload.title}'"
        }).execute()
        
        return {"status": "ok", "data": db_res.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Admin experiment upsert failed: {e}")

@router.get("/admin/logs/", tags=["Admin"])
async def admin_list_activity_logs(admin: AuthUser = Depends(get_current_admin)):
    """View administrative changes and modifications logs."""
    try:
        db_res = supabase.table("activity_logs").select("*").order("timestamp", desc=True).execute()
        return db_res.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Admin query failed: {e}")
