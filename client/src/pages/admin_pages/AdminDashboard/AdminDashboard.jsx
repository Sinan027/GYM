import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Admin.css";
import AdminSidebar from '../../../admin_components/AdminSidebar/AdminSidebar';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkouts: 0,
    totalPrograms: 0,
    totalCommunityPosts: 0,
    recentUsers: [],
    broadcasts: []
  });
  const [loading, setLoading] = useState(true);
  
  // Broadcast Modal State
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastType, setBroadcastType] = useState("info");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleCreateBroadcast = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/admin/broadcast", 
        { message: broadcastMessage, type: broadcastType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local state instantly
      setStats(prev => ({
        ...prev,
        broadcasts: [res.data.broadcast, ...prev.broadcasts]
      }));
      
      setShowBroadcastModal(false);
      setBroadcastMessage("");
      alert("Broadcast sent successfully!");
    } catch (err) {
      console.error("Failed to send broadcast", err);
      alert("Failed to send broadcast");
    }
  };

  const handleDeleteBroadcast = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/broadcast/${id}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setStats(prev => ({
        ...prev,
        broadcasts: prev.broadcasts.filter(b => b._id !== id)
      }));
    } catch (err) {
      console.error("Failed to delete broadcast", err);
      alert("Failed to delete broadcast");
    }
  };

  return (
    <>
    <div className="admin-layout">
      <AdminSidebar/>
      <div className="dashboard-content" style={{ flex: 1, padding: '40px', backgroundColor: '#111', color: '#fff', minHeight: '100vh', overflowY: 'auto' }}>
        <div className="admin-container">
          
          <header className="admin-header">
            <div className="header-titles">
              <p className="section-num">ADMIN — OVERWATCH</p>
              <h1 className="heavy-title">SQUAD <br /> 
                <span className="text-highlight underline-style">STATISTICS.</span>
              </h1>
            </div>
            <button className="admin-action-btn" onClick={() => setShowBroadcastModal(true)}>+ SYSTEM BROADCAST</button>
          </header>

          {loading ? (
            <p style={{ color: '#fff', marginTop: '20px' }}>Loading Live Statistics...</p>
          ) : (
            <div className="admin-grid">
              
              {/* Summary Metrics */}
              <div className="admin-card stats-card">
                <label>TOTAL USERS</label>
                <div className="admin-value">{stats.totalUsers}</div>
                <p className="sub-label">ACTIVE ACCOUNTS</p>
              </div>

              <div className="admin-card stats-card">
                <label>TOTAL WORKOUTS</label>
                <div className="admin-value">{stats.totalWorkouts}</div>
                <p className="sub-label">ELITE ROUTINES</p>
              </div>

              <div className="admin-card stats-card">
                <label>TOTAL PROGRAMS</label>
                <div className="admin-value">{stats.totalPrograms}</div>
                <p className="sub-label">MULTI-WEEK PLANS</p>
              </div>

              {/* Platform Activity Chart Visual */}
              <div className="admin-card full-width" style={{ marginTop: '20px' }}>
                <label>PLATFORM ACTIVITY (LAST 7 DAYS)</label>
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '10px', marginTop: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                  <div style={{ flex: 1, backgroundColor: '#333', height: '30%', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ flex: 1, backgroundColor: '#333', height: '50%', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ flex: 1, backgroundColor: '#333', height: '40%', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ flex: 1, backgroundColor: '#333', height: '70%', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ flex: 1, backgroundColor: '#333', height: '60%', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ flex: 1, backgroundColor: '#333', height: '85%', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ flex: 1, backgroundColor: '#B5F23D', height: '100%', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', color: '#B5F23D', fontWeight: 'bold', fontSize: '0.8rem' }}>TODAY</span>
                  </div>
                </div>
              </div>

              {/* User Management Section */}
              <div className="admin-card full-width">
                <div className="card-header-flex">
                  <label>RECENT ENLISTMENTS</label>
                  <span className="text-highlight">VIEW ALL USERS</span>
                </div>
                <table className="brutalist-table">
                  <thead>
                    <tr>
                      <th>USERNAME</th>
                      <th>EMAIL</th>
                      <th>DATE JOINED</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td><span className="status-tag active">ACTIVE</span></td>
                      </tr>
                    ))}
                    {stats.recentUsers.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* System Alerts */}
              <div className="admin-card alert-card">
                <label>SYSTEM ALERTS</label>
                
                {stats.broadcasts && stats.broadcasts.length > 0 ? (
                  stats.broadcasts.map(b => (
                    <div key={b._id} className={`alert-item ${b.type === 'urgent' ? 'urgent' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p>{b.message}</p>
                        <small style={{ color: '#666', fontSize: '0.7rem' }}>
                          {new Date(b.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <button 
                        onClick={() => handleDeleteBroadcast(b._id)}
                        style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '5px' }}
                        title="Remove Alert"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="alert-item">
                    <p>SYSTEM OPTIMAL - NO ALERTS</p>
                  </div>
                )}
                
                <div className="alert-item urgent" style={{ marginTop: '10px' }}>
                  <p>NEW POSTS: {stats.totalCommunityPosts} Community Updates</p>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '8px', width: '400px', border: '1px solid #333' }}>
            <h2 style={{ color: '#B5F23D', marginBottom: '20px' }}>CREATE SYSTEM BROADCAST</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#888', display: 'block', marginBottom: '5px', fontSize: '0.8rem' }}>MESSAGE</label>
              <textarea 
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d0d0d', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '80px' }}
                placeholder="Enter alert message..."
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ color: '#888', display: 'block', marginBottom: '5px', fontSize: '0.8rem' }}>URGENCY LEVEL</label>
              <select 
                value={broadcastType}
                onChange={(e) => setBroadcastType(e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d0d0d', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
              >
                <option value="info">Standard Info</option>
                <option value="urgent">Urgent / Red Alert</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setShowBroadcastModal(false)}
                style={{ padding: '8px 15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateBroadcast}
                style={{ padding: '8px 15px', backgroundColor: '#B5F23D', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;