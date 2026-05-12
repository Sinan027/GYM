import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProgress.css";
import AdminSidebar from "../../../admin_components/AdminSidebar/AdminSidebar";

function AdminProgress() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchProgressLogs();
  }, []);

  const fetchProgressLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/progress");
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/progress/${id}`);
      setLogs(logs.filter((l) => l._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="programs-page" style={{ flex: 1, padding: '40px', background: '#050505', color: '#fff' }}>

        <h1 className="title" style={{ fontSize: '2rem', marginBottom: '30px' }}> User Progress Logs</h1>

        {/* Table */}
        <div className="table" style={{ background: '#111', borderRadius: '8px', padding: '20px' }}>

          <div className="row header" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 100px', fontWeight: 'bold', color: '#B5F23D', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '10px' }}>
            <span>Date</span>
            <span>Weight</span>
            <span>Workouts</span>
            <span>Calories</span>
            <span>Measurements</span>
            <span>Actions</span>
          </div>

          {logs.length === 0 ? (
            <p style={{ padding: '20px', color: '#888' }}>No progress logs found.</p>
          ) : (
            logs.map((log) => (
              <div className="row" key={log._id} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 100px', padding: '15px 0', borderBottom: '1px solid #222', alignItems: 'center' }}>
                <span>{new Date(log.date).toLocaleDateString()}</span>
                <span>{log.weight} kg</span>
                <span>{log.workoutsCompleted}</span>
                <span>{log.calories ? `${log.calories} kcal` : '-'}</span>
                <span>{log.chest ? `C: ${log.chest} / W: ${log.waist}` : '-'}</span>

                <div className="actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteLog(log._id)}
                    style={{ background: '#FF4D4D', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProgress;