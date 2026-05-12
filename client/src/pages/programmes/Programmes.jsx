import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Programmes.css';

export const Programmes = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/programs");
                setPrograms(res.data);
            } catch (err) {
                console.error("Error fetching programs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    const getImageUrl = (prog) => {
        return prog.image || prog.img || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop";
    };

    return (
        <section className="programs-section">
            <div className="programs-container">
                <div className="programs-header">
                    <div className="header-left">
                        <p className="section-num">02 — WORKOUT PROGRAMS</p>
                        <h2 className="programs-title">FIND YOUR <br /> PROGRAM</h2>
                    </div>
                </div>

                {loading ? (
                    <div style={{color: '#888', padding: '20px'}}>Loading programs...</div>
                ) : (
                    <div className="programs-grid">
                        {programs.map((prog) => (
                            <div className="program-card" key={prog._id}>
                                <div
                                    className="card-image"
                                    style={{ backgroundImage: `url(${getImageUrl(prog)})` }}
                                >
                                    <span className={`badge lvl-${prog.level ? prog.level.toLowerCase() : 'beginner'}`}>{prog.level || 'BEGINNER'}</span>
                                </div>

                                <div className="card-content">
                                    <h3 className="card-title">{prog.title}</h3>
                                    <p className="card-desc">{prog.description || prog.desc}</p>

                                    <div className="card-stats">
                                        <div className="stat">
                                            <span className="stat-val">{prog.duration || 'N/A'}</span>
                                            <span className="stat-label">Duration</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-val">{prog.frequency || 'N/A'}</span>
                                            <span className="stat-label">Frequency</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-val">{prog.equipment || 'Gym'}</span>
                                            <span className="stat-label">Equipment</span>
                                        </div>
                                    </div>

                                    <Link to={`/program/${prog._id}`} className="view-link">VIEW PROGRAM →</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
