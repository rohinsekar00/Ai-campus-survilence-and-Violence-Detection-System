export default function LocationStats({ heatmap }) {
  return (
    <div className="stats-panel">
      <h3>📊 Location Reports</h3>

      {Object.entries(heatmap).map(([loc, d]) => (
        <div key={loc} className="stat-card">
          <h4>{loc}</h4>
          <p>🔥 Incidents: {d.count}</p>
          <p>📈 Avg Confidence: {(d.avg_confidence * 100).toFixed(1)}%</p>
          <p>🕒 Last Incident: {d.last_incident}</p>
          <p>⚠️ Common Type: {d.top_type}</p>
        </div>
      ))}
    </div>
  );
}
