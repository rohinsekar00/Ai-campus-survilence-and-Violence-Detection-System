export default function ReportModal({ incident, onClose }) {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <h1>📄 Incident Report</h1>

        <img
          src={`http://localhost:8000${incident.evidence_image}`}
          alt="Evidence"
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "12px"
          }}
        />

        <p><strong>Location:</strong> {incident.location}</p>
        <p><strong>Type:</strong> {incident.violence_type}</p>
        <p><strong>Confidence:</strong> {incident.confidence}</p>
        <p><strong>Reasons:</strong> {incident.reasons.join(", ")}</p>

        <div className="alert-actions">
          <button className="secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
