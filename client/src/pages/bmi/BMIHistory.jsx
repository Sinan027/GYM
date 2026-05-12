import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BMIHistory.css';

function BMIHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to view your BMI history.");
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get("http://localhost:5000/api/bmi", config);
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch BMI history", err);
        setError("Failed to load your history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Underweight') return '#3db5f2';
    if (status === 'Normal Weight') return '#B5F23D';
    if (status === 'Overweight') return '#f2d13d';
    if (status === 'Obese') return '#f23d3d';
    return '#B5F23D';
  };

  return (
    <div className="bmi-history-page">
      <div className="bmi-history-container">
        <header className="bmi-history-header">
          <button className="back-btn" onClick={() => navigate('/bmi-calculator')}>
            &larr; BACK TO CALCULATOR
          </button>
          <h1 className="heavy-title" style={{ marginTop: '20px' }}>YOUR <br/> HISTORY</h1>
        </header>

        {loading ? (
          <div className="loading-state">Loading history...</div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button className="login-link-btn" onClick={() => navigate('/login')}>LOG IN NOW</button>
          </div>
        ) : history.length === 0 ? (
          <div className="empty-state">
            <p>You haven't saved any BMI records yet.</p>
            <button className="login-link-btn" onClick={() => navigate('/bmi-calculator')}>CALCULATE NOW</button>
          </div>
        ) : (
          <div className="history-grid">
            {history.map((record) => (
              <div key={record._id} className="history-card">
                <div className="history-date">
                  {new Date(record.date).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
                  })}
                </div>
                
                <div className="history-metrics">
                  <div className="metric">
                    <span className="metric-label">WEIGHT</span>
                    <span className="metric-value">{record.weight} kg</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">HEIGHT</span>
                    <span className="metric-value">{record.height} cm</span>
                  </div>
                </div>

                <div className="history-result" style={{ borderColor: getStatusColor(record.status) }}>
                  <div className="result-left">
                    <span className="result-label">BMI SCORE</span>
                    <span className="result-score" style={{ color: getStatusColor(record.status) }}>
                      {record.bmi}
                    </span>
                  </div>
                  <div className="result-right">
                    <span 
                      className="status-pill" 
                      style={{ 
                        backgroundColor: `${getStatusColor(record.status)}20`, 
                        color: getStatusColor(record.status),
                        border: `1px solid ${getStatusColor(record.status)}`
                      }}
                    >
                      {record.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BMIHistory;
