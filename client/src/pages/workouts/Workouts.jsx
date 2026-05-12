import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlay, FaTimes } from 'react-icons/fa';
import './Workouts.css';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  const [accessData, setAccessData] = useState({ isLocked: true, hasPurchased: false, hasTrainer: false, isApproved: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch access status
        if (token) {
          try {
            const accessRes = await axios.get("http://localhost:5000/api/users/access-status", {
              headers: { Authorization: `Bearer ${token}` }
            });
            setAccessData(accessRes.data);
          } catch (accessErr) {
            console.error("Error fetching access status", accessErr);
          }
        }

        // Fetch workouts
        const res = await axios.get("http://localhost:5000/api/workouts");
        setWorkouts(res.data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImageUrl = (url) => {
    return url ? url : "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop";
  };

  const closeVideo = () => setActiveVideo(null);

  return (
    <div className="workouts-page">
      <div className="workouts-container">
        <header className="workouts-header">
          <div className="header-left">
            <p className="kicker">03 — WORKOUT LIBRARY</p>
            <h1 className="heavy-title">ELITE <br/> ROUTINES</h1>
          </div>
          <div className="header-right">
            <p className="header-desc">
              Complete workout routines with full instructions, target levels, and durations. Click to play video demonstrations.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="loading-state">Loading workout routines...</div>
        ) : accessData.isLocked ? (
          <div className="locked-state" style={{ textAlign: 'center', padding: '100px 20px', background: '#111', borderRadius: '12px', border: '1px solid #333' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#FF4D4D' }}>🔒 ACCESS RESTRICTED</h2>
            <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '600px', margin: '0 auto 30px' }}>
              The Elite Exercise Library is exclusive to members who have purchased a program and been assigned a personal trainer.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto', textAlign: 'left', background: '#0a0a0a', padding: '20px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>1. Program Purchased</span>
                <span>{accessData.hasPurchased ? "✅" : "❌"}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>2. Trainer Selected</span>
                <span>{accessData.hasTrainer ? "✅" : "❌"}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>3. Booking Accepted</span>
                <span>{accessData.isApproved ? "✅" : "❌"}</span>
              </div>
            </div>
            
            <button 
              onClick={() => window.location.href = '/programs'} 
              style={{ marginTop: '40px', background: '#B5F23D', color: '#000', border: 'none', padding: '15px 30px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
            >
              BROWSE PROGRAMS
            </button>
          </div>
        ) : workouts.length === 0 ? (
          <div className="empty-state">No workouts available right now. Check back later!</div>
        ) : (
          <div className="exercise-grid">
            {workouts.map(workout => (
              <div 
                className="exercise-card" 
                key={workout._id} 
                onClick={() => workout.video && setActiveVideo(workout.video)}
                style={{ cursor: workout.video ? 'pointer' : 'default' }}
              >
                <div className="exercise-image-box">
                  <img src={getImageUrl(workout.image)} alt={workout.title} className="workout-img" loading="lazy" />
                  <div className="image-overlay"></div>
                  {workout.video && (
                    <div className="play-icon-overlay">
                      <FaPlay />
                    </div>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="exercise-name">{workout.title}</h3>
                  <p className="muscle-group">{workout.description}</p>
                  
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="exercises-list" style={{ marginTop: '10px', fontSize: '0.85rem', color: '#888' }}>
                      <strong>Includes:</strong> {workout.exercises.join(", ")}
                    </div>
                  )}

                  <div className="tag-group" style={{ marginTop: '15px' }}>
                    <span className="tag">{workout.level || 'Beginner'}</span>
                    <span className="tag tool-tag">{workout.duration ? `${workout.duration} mins` : 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {activeVideo && !accessData.isLocked && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-video-btn" onClick={closeVideo}>
              <FaTimes />
            </button>
            <video src={activeVideo} controls autoPlay className="workout-video-player" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;