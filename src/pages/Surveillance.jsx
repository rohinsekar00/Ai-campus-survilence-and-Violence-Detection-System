import { useState, useEffect, useRef } from "react";
import AlertOverlay from "../components/AlertOverlay";
import ReportModal from "../components/ReportModal";
import "./Surveillance.css";

export default function Surveillance() {
  const [alertIncident, setAlertIncident] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // 🔊 Siren sound
  const sirenRef = useRef(null);

  // 🎥 Dummy CCTV feeds
  const feeds = [
    { name: "Main Gate", src: "/cctv/main_gate.mp4" },
    { name: "Auditorium", src: "/cctv/auditorium.mp4" },
    { name: "Canteen", src: "/cctv/canteen.mp4" },
    { name: "Library", src: "/cctv/library.mp4" },
  ];

  // 🚨 Play siren when alert appears
  useEffect(() => {
    if (alertIncident && sirenRef.current) {
      sirenRef.current.play().catch(() => {});
    }

    return () => {
      if (sirenRef.current) {
        sirenRef.current.pause();
        sirenRef.current.currentTime = 0;
      }
    };
  }, [alertIncident]);

  // ================================
  // ⬆️ UPLOAD + AI ANALYSIS
  // ================================
  async function uploadVideo(file, location) {
    if (!file) return;

    setLoading(true);
    setStatusMessage("");
    setAlertIncident(null);
    setShowReport(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("location", location);

    try {
      const res = await fetch("http://localhost:8000/analyze-video/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      // ✅ NO VIOLENCE
      if (data.message === "No violence detected") {
        setStatusMessage(`✅ No violence detected at ${data.location}`);
        setAlertIncident(null);
      }

      // 🚨 VIOLENCE DETECTED
      else if (data.violence_type) {
        setAlertIncident(data);
      }

      // ℹ️ FALLBACK
      else {
        setStatusMessage("ℹ️ Analysis completed");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setStatusMessage("❌ Error analyzing video");
    }

    setLoading(false);
  }

  return (
    <div className="surveillance-page">
      {/* 🔊 Siren Audio */}
      <audio ref={sirenRef} loop>
        <source src="/siren.mp3" type="audio/mpeg" />
      </audio>

      <h1 className="title">📹 Campus Live Surveillance</h1>

      {/* 🔥 HEATMAP BUTTON */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button
          className="heatmap-btn"
          onClick={() => (window.location.href = "/heatmap")}
        >
          🔥 View Violence Heatmap
        </button>
      </div>

      {/* ✅ STATUS MESSAGE */}
      {statusMessage && (
        <div className="status-message">{statusMessage}</div>
      )}

      {/* 🎥 CCTV GRID */}
      <div className="grid">
        {feeds.map((cam) => (
          <div key={cam.name} className="camera-card">
            <video src={cam.src} autoPlay loop muted />
            <span>{cam.name}</span>
          </div>
        ))}
      </div>

      {/* ⬆️ UPLOAD PANEL */}
      <div className="upload-panel">
        <h3>🎥 Upload Video for AI Detection</h3>

        <select id="location">
          <option>Main Gate</option>
          <option>Library</option>
          <option>Canteen</option>
          <option>Auditorium</option>
        </select>

        <input
          type="file"
          accept="video/*"
          onChange={(e) =>
            uploadVideo(
              e.target.files[0],
              document.getElementById("location").value
            )
          }
        />

        {loading && <p className="loading">⏳ Analyzing video...</p>}
      </div>

      {/* 🚨 FULL SCREEN ALERT */}
      {alertIncident && !showReport && (
        <AlertOverlay
          incident={alertIncident}
          onClose={() => setAlertIncident(null)}
          onView={() => setShowReport(true)}
        />
      )}

      {/* 📄 REPORT MODAL */}
      {showReport && alertIncident && (
        <ReportModal
          incident={alertIncident}
          onClose={() => {
            setShowReport(false);
            setAlertIncident(null);
          }}
        />
      )}
    </div>
  );
}
