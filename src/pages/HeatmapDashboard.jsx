import { useEffect, useState } from "react";
import "./HeatmapDashboard.css";

export default function HeatmapDashboard() {
  const [heatmap, setHeatmap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/analytics/heatmap")
      .then((res) => res.json())
      .then((data) => {
        setHeatmap(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2 className="loading">⏳ Loading Heatmap...</h2>;
  }

  return (
    <div className="heatmap-page">
      <h1>🔥 Campus Violence Heatmap</h1>

      <div className="heatmap-grid">
        {Object.keys(heatmap).length === 0 && (
          <p>No incidents recorded yet</p>
        )}

        {Object.entries(heatmap).map(([location, data]) => {
          const intensity =
            data.avg_confidence >= 0.7
              ? "high"
              : data.avg_confidence >= 0.4
              ? "medium"
              : "low";

          return (
            <div key={location} className={`heat-card ${intensity}`}>
              <h2>{location}</h2>
              <p>🚨 Incidents: {data.count}</p>
              <p>📊 Avg Confidence: {data.avg_confidence}</p>
              <p>
                🕒 Last Incident:{" "}
                {data.last_incident
                  ? new Date(data.last_incident).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
