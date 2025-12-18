import { useEffect, useRef } from "react";

export default function AlertOverlay({ incident, onClose, onView }) {
  const audioRef = useRef(null);

  // 🔊 Play siren when alert appears
  useEffect(() => {
    audioRef.current = new Audio("/siren.mp3");
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => {});

    return () => {
      // stop sound on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  function handleDismiss() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onClose();
  }

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <h1>🚨 WARNING 🚨</h1>
        <h2>VIOLENCE DETECTED</h2>

        <p><strong>📍 Location:</strong> {incident.location}</p>
        <p><strong>⚠️ Type:</strong> {incident.violence_type}</p>
        <p><strong>📊 Confidence:</strong> {incident.confidence}</p>

        <div className="alert-actions">
          <button onClick={onView}>View Full Report</button>
          <button className="danger" onClick={handleDismiss}>
            Dismiss Alert
          </button>
        </div>
      </div>
    </div>
  );
}
