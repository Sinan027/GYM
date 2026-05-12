import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Workoutplanner.css';

const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function Workoutplanner() {
  const [exerciseBank, setExerciseBank] = useState([]);
  const [schedule, setSchedule] = useState({
    MONDAY: [], TUESDAY: [], WEDNESDAY: [], THURSDAY: [], FRIDAY: [], SATURDAY: [], SUNDAY: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [protocolRes, bankRes] = await Promise.all([
        axios.get("http://localhost:5000/api/protocol"),
        axios.get("http://localhost:5000/api/exercise-bank")
      ]);
      
      if (protocolRes.data && protocolRes.data.schedule) {
        setSchedule(protocolRes.data.schedule);
      }
      if (bankRes.data) {
        setExerciseBank(bankRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveProtocol = async () => {
    try {
      await axios.post("http://localhost:5000/api/protocol", { schedule });
      alert("PROTOCOL SAVED TO DATABASE!");
    } catch (err) {
      console.error(err);
      alert("Failed to save protocol.");
    }
  };

  const onDragStart = (e, exercise) => {
    e.dataTransfer.setData("exercise", JSON.stringify(exercise));
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, day) => {
    e.preventDefault();
    const exerciseData = e.dataTransfer.getData("exercise");
    if (!exerciseData) return;
    
    const exercise = JSON.parse(exerciseData);
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], { ...exercise, uniqueId: Date.now() }]
    }));
  };

  const removeExercise = (day, uniqueId) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(ex => ex.uniqueId !== uniqueId)
    }));
  };

  return (
    <div className="planner-page">
      <div className="planner-bg-overlay"></div>

      <div className="planner-container">
        <header className="planner-header">
          <div className="header-left">
            <p className="section-id">04 — WORKOUT PLANNER</p>
            <h1 className="heavy-title">FORGE YOUR <br /> LEGACY</h1>
          </div>
          <div className="header-right">
            <p className="instruction-text">
              Precision programming for elite athletes. Drag and drop your selection to build your weekly training protocol.
            </p>
          </div>
        </header>

        {loading ? (
          <div style={{color: '#888', textAlign: 'center', padding: '50px'}}>Loading your saved protocol...</div>
        ) : (
          <div className="planner-grid">
            <section className="exercise-bank">
              <h3 className="column-label">ARSENAL / BANK</h3>
              <div className="exercise-list">
                {exerciseBank.map((ex) => (
                  <div
                    key={ex.id}
                    className="exercise-item-card"
                    draggable
                    onDragStart={(e) => onDragStart(e, ex)}
                  >
                    <div className="card-bg-img" style={{ backgroundImage: `url(${ex.image})` }}></div>
                    <div className="card-overlay"></div>
                    <div className="card-info">
                      <span className="ex-cat-tag">{ex.category}</span>
                      <h4 className="ex-name-text">{ex.name}</h4>
                    </div>
                    <span className="drag-icon">⠿</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="schedule-section">
              <h3 className="column-label">WEEKLY PROTOCOL</h3>
              <div className="days-list">
                {days.map((day) => (
                  <div
                    key={day}
                    className="day-slot-box"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, day)}
                  >
                    <div className="day-header">
                      <h4 className="day-name-title">{day}</h4>
                      <span className="count-badge">{schedule[day]?.length || 0}</span>
                    </div>
                    <div className={`drop-zone-area ${(schedule[day]?.length || 0) > 0 ? 'active' : ''}`}>
                      {(!schedule[day] || schedule[day].length === 0) ? (
                        <p className="empty-hint">REST DAY / DRAG HERE</p>
                      ) : (
                        <div className="planned-items-wrapper">
                          {schedule[day].map((ex) => (
                            <div key={ex.uniqueId} className="planned-tag">
                              <span className="planned-name">{ex.name}</span>
                              <button onClick={() => removeExercise(day, ex.uniqueId)} className="btn-remove">×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-finalize" onClick={saveProtocol}>SAVE ROUTINE</button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workoutplanner;