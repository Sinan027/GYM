import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Trainers.css";

function TrainerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/trainers/${id}`);
        setTrainer(res.data);
      } catch (err) {
        console.error("Error fetching trainer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [id]);

  const handleBookSession = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to book a session!");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { trainer: trainer._id, notes: "Requested from Trainer Profile" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookingStatus("Booking requested successfully! The trainer will review it.");
    } catch (err) {
      console.error(err);
      alert("Failed to book session. Please try again.");
    }
  };

  const getImageUrl = (url) => {
    return url ? url : "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop";
  };

  if (loading) return <div className="trainers-page"><div className="loading-state">Loading Trainer Profile...</div></div>;
  if (!trainer) return <div className="trainers-page"><div className="empty-state">Trainer not found.</div></div>;

  return (
    <div className="trainers-page">
      <div className="trainers-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate("/trainers")} style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '10px 20px', cursor: 'pointer', marginBottom: '40px', borderRadius: '4px' }}>
          ← BACK TO TRAINERS
        </button>

        <div className="trainer-profile-card" style={{ background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222' }}>
          <div 
            className="trainer-profile-header-wrapper" 
            style={{ height: '400px', backgroundColor: '#000', overflow: 'hidden', position: 'relative' }}
          >
            <img 
              src={getImageUrl(trainer.image)} 
              alt={trainer.name} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
          
          <div className="trainer-profile-body" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h1 className="heavy-title" style={{ fontSize: '3rem', margin: 0 }}>{trainer.name}</h1>
              <span style={{ background: trainer.isActive ? '#B5F23D' : '#ff4d4d', color: '#000', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                {trainer.isActive ? "AVAILABLE FOR BOOKING" : "UNAVAILABLE"}
              </span>
            </div>
            
            <p style={{ color: '#B5F23D', fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '30px' }}>
              SPECIALTY: {trainer.expertise}
            </p>

            <div style={{ background: '#0a0a0a', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #1a1a1a' }}>
              <h3 style={{ color: '#fff', marginBottom: '10px', fontSize: '1rem' }}>Available Hours</h3>
              <p style={{ color: '#aaa', fontSize: '1.1rem' }}>🕒 {trainer.availableTime}</p>
            </div>

            {bookingStatus ? (
              <div style={{ background: 'rgba(181, 242, 61, 0.1)', border: '1px solid #B5F23D', color: '#B5F23D', padding: '20px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                {bookingStatus}
              </div>
            ) : (
              <button 
                onClick={handleBookSession} 
                disabled={!trainer.isActive}
                style={{ 
                  width: '100%', 
                  padding: '20px', 
                  background: trainer.isActive ? 'linear-gradient(90deg, #B5F23D, #93c928)' : '#333', 
                  color: trainer.isActive ? '#000' : '#888', 
                  border: 'none', 
                  fontSize: '1.2rem', 
                  fontWeight: '900', 
                  textTransform: 'uppercase', 
                  cursor: trainer.isActive ? 'pointer' : 'not-allowed',
                  borderRadius: '8px',
                  boxShadow: trainer.isActive ? '0 10px 30px rgba(181, 242, 61, 0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if(trainer.isActive) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(181, 242, 61, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if(trainer.isActive) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(181, 242, 61, 0.3)';
                  }
                }}
              >
                {trainer.isActive ? "REQUEST 1-ON-1 SESSION" : "CURRENTLY FULL"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfile;
