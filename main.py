from fastapi import FastAPI, UploadFile, File, Depends, Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import shutil
import cv2

# ---------------- AI MODULES ----------------
from video_processor import analyze_video, detect_motion_violence
from pose_processor import detect_pose_violence
from audio_processor import analyze_audio
from fusion_engine import fuse_signals
from alert_service import send_email_alert

# ---------------- DATABASE ----------------
from database import SessionLocal, engine
from db_models import Base
from crud import create_incident, get_all_incidents

# ---------------- CONFIG ----------------
UPLOAD_DIR = "uploads"
EVIDENCE_DIR = "evidence"

ADMIN_EMAILS = [
    "rohinpc3@gmail.com",
    "mjrahul2020@gmail.com"
]

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(EVIDENCE_DIR, exist_ok=True)

# Create DB tables
Base.metadata.create_all(bind=engine)

# ---------------- APP ----------------
app = FastAPI(title="AI Campus Safety System")

# ✅ CORS (Frontend Fix)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve evidence images
app.mount("/evidence", StaticFiles(directory="evidence"), name="evidence")

# ---------------- DATABASE DEPENDENCY ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- ROUTES ----------------
@app.get("/")
def root():
    return {"status": "Backend running"}

@app.get("/incidents")
def incidents(db: Session = Depends(get_db)):
    return get_all_incidents(db)

# =====================================================
# 🔥 ANALYZE VIDEO (STABLE + FRONTEND SAFE)
# =====================================================
@app.post("/analyze-video/")
async def analyze_video_api(
    file: UploadFile = File(...),
    location: str = Form("Unknown"),
    db: Session = Depends(get_db)
):
    # 1️⃣ Save uploaded video
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # 2️⃣ Run AI modules
    detections, weapon = analyze_video(file_path)
    motion, evidence_frame = detect_motion_violence(file_path)
    pose = detect_pose_violence(file_path)
    audio = analyze_audio(file_path)

    # 3️⃣ Multimodal fusion
    fusion = fuse_signals(
        motion,
        pose["pose_violence"],
        weapon,
        audio
    )

    # 4️⃣ Save evidence frame (if violence)
    evidence_path = None
    evidence_url = None

    if fusion["final_violence"] and evidence_frame is not None:
        evidence_filename = f"incident_{file.filename}.jpg"
        evidence_path = os.path.join(EVIDENCE_DIR, evidence_filename)
        cv2.imwrite(evidence_path, evidence_frame)
        evidence_url = f"/evidence/{evidence_filename}"

    # 5️⃣ Count persons
    person_count = sum(d.get("label") == "person" for d in detections)

    # 6️⃣ Save incident ONLY if violence
    incident = None
    if fusion["final_violence"]:
        incident = create_incident(
            db=db,
            video_name=file.filename,
            location=location,
            violence_type=fusion["violence_type"],
            confidence=fusion["confidence"],
            motion_score=motion,
            pose_score=pose["score"],
            audio_alert=audio,
            person_count=person_count,
            evidence_clip=evidence_path
        )

    # 7️⃣ Email alert
    if fusion["final_violence"] and fusion["confidence"] >= 0.5:
        send_email_alert(
            to_emails=ADMIN_EMAILS,
            subject="🚨 Campus Violence Alert",
            body=f"""
🚨 VIOLENCE DETECTED 🚨

📍 Location: {location}
⚠️ Type: {fusion['violence_type']}
📊 Confidence: {fusion['confidence']}
👥 Persons: {person_count}
🎥 Video: {file.filename}

Reasons:
{', '.join(fusion['reasons'])}
""",
            image_path=evidence_path
        )

    # 8️⃣ GUARANTEED RESPONSE (IMPORTANT)
    if not fusion["final_violence"]:
        return {
            "message": "No violence detected",
            "location": location,
            "confidence": fusion["confidence"],
            "video": file.filename
        }

    return {
        "incident_id": incident.id if incident else None,
        "location": location,
        "violence_type": fusion["violence_type"],
        "confidence": fusion["confidence"],
        "reasons": fusion["reasons"],
        "video": file.filename,
        "evidence_image": evidence_url
    }

# =====================================================
# 🔥 HEATMAP ANALYTICS ENDPOINT (NEW)
# =====================================================
@app.get("/analytics/heatmap")
def heatmap_analytics(db: Session = Depends(get_db)):
    incidents = get_all_incidents(db)

    heatmap = {}

    for i in incidents:
        if not i.location:
            continue

        if i.location not in heatmap:
            heatmap[i.location] = {
                "count": 0,
                "avg_confidence": 0.0,
                "last_incident": None
            }

        heatmap[i.location]["count"] += 1
        heatmap[i.location]["avg_confidence"] += i.confidence
        heatmap[i.location]["last_incident"] = i.created_at

    # finalize average confidence
    for loc in heatmap:
        heatmap[loc]["avg_confidence"] = round(
            heatmap[loc]["avg_confidence"] / heatmap[loc]["count"], 2
        )

    return heatmap
