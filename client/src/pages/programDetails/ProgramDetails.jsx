import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProgramDetails.css";

function ProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleStartProgram = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/programs/${id}`);
        setProgram(res.data);
      } catch (err) {
        console.error("Error fetching program details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  if (loading) {
    return <div className="details-loading">Loading program details...</div>;
  }

  if (!program) {
    return (
      <div className="details-error">
        <h2>Program Not Found</h2>
        <Link to="/programs" className="back-link">← Back to Programs</Link>
      </div>
    );
  }

  const imageUrl = program.image || program.img || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="program-details-page">
      <div className="details-hero" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Link to="/programs" className="back-link">← Back to Programs</Link>
          <span className={`badge lvl-${program.level ? program.level.toLowerCase() : 'beginner'}`}>
            {program.level || 'BEGINNER'}
          </span>
          <h1 className="details-title">{program.title}</h1>
        </div>
      </div>

      <div className="details-container">
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-label">DURATION</span>
            <span className="stat-value">{program.duration || 'N/A'}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">FREQUENCY</span>
            <span className="stat-value">{program.frequency || 'N/A'}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">EQUIPMENT</span>
            <span className="stat-value">{program.equipment || 'Gym'}</span>
          </div>
        </div>

        <div className="details-content">
          <h2>About this Program</h2>
          <p className="details-description">{program.description || program.desc}</p>
          
          <div className="action-section">
            <button className="start-program-btn" onClick={handleStartProgram}>START PROGRAM NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramDetails;
