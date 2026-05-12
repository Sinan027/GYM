import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../../admin_components/AdminSidebar/AdminSidebar';
import './AdminBMIHistory.css';

function AdminBMIHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:5000/api/bmi/admin/all", config);
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch admin BMI history", err);
      setError("Failed to load user records.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this BMI record?")) return;

    const token = localStorage.getItem('token');
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/bmi/admin/${id}`, config);
      
      // Remove from UI
      setHistory(history.filter(record => record._id !== id));
      alert("Record deleted successfully.");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete record.");
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Underweight') return '#3db5f2';
    if (status === 'Normal Weight') return '#B5F23D';
    if (status === 'Overweight') return '#f2d13d';
    if (status === 'Obese') return '#f23d3d';
    return '#B5F23D';
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-bmi-page">
        <h1 className="title" style={{ color: '#B5F23D', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '30px' }}>
          Global BMI History
        </h1>

        {loading ? (
          <div className="admin-loading">Loading records...</div>
        ) : error ? (
          <div className="admin-error">{error}</div>
        ) : history.length === 0 ? (
          <div className="admin-empty">No BMI records found on the platform.</div>
        ) : (
          <div className="admin-bmi-grid">
            {history.map((record) => (
              <div key={record._id} className="admin-bmi-card">
                <div className="card-header">
                  <div className="user-info">
                    <h3>{record.user?.username || "Unknown User"}</h3>
                    <p className="user-email">{record.user?.email || "No email"}</p>
                  </div>
                  <div className="date-info">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="card-metrics">
                  <div className="metric-box">
                    <span className="m-label">WEIGHT</span>
                    <span className="m-val">{record.weight} kg</span>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">HEIGHT</span>
                    <span className="m-val">{record.height} cm</span>
                  </div>
                  <div className="metric-box" style={{ borderLeft: `3px solid ${getStatusColor(record.status)}`, paddingLeft: '15px' }}>
                    <span className="m-label">BMI SCORE</span>
                    <span className="m-val" style={{ color: getStatusColor(record.status), fontSize: '1.5rem' }}>{record.bmi}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <span 
                    className="status-badge" 
                    style={{ 
                      backgroundColor: `${getStatusColor(record.status)}20`, 
                      color: getStatusColor(record.status),
                      border: `1px solid ${getStatusColor(record.status)}` 
                    }}
                  >
                    {record.status.toUpperCase()}
                  </span>
                  
                  <button onClick={() => handleDelete(record._id)} className="admin-delete-btn">
                    Delete Record
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBMIHistory;
