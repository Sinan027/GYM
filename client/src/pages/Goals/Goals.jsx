import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Goals.css';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: '', icon: '🎯' });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/goals");
      setGoals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.title) return;

    try {
      const res = await axios.post("http://localhost:5000/api/goals", {
        title: newGoal.title.toUpperCase(),
        target: newGoal.target,
        description: `Target: ${newGoal.target} · Started ${new Date().toLocaleDateString()} · 0% complete`
      });

      setGoals([...goals, res.data]);
      setIsModalOpen(false);
      setNewGoal({ title: '', target: '', icon: '🎯' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="goals-page">
      <div className="goals-container">
        <header className="goals-header">
          <div className="header-left">
            <p className="section-num">03 — GOAL SETTING</p>
            <h1 className="heavy-title">YOUR <br /> GOALS</h1>
          </div>
        </header>

        <div className="goals-grid">
          {goals.map((goal) => {
            const target = Number(goal.target) || 1; // prevent divide by zero
            const current = Number(goal.current) || 0;
            const percentage = Math.min(Math.round((current / target) * 100), 100);

            return (
              <div key={goal._id} className="goal-card">
                <div className="goal-top">
                  <h3 className="goal-title">
                    <span className="goal-icon">🎯</span> {goal.title}
                  </h3>
                  <span className="goal-percentage" style={{ color: "#B5F23D" }}>
                    {percentage}%
                  </span>
                </div>
                
                <div className="progress-bar-container">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${percentage}%`, backgroundColor: "#B5F23D" }}
                  ></div>
                </div>
                <p className="goal-details">{goal.description}</p>
                
                {/* Adding a small button to test updating progress, though not explicitly asked, it helps make it dynamic */}
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>Current: {current} / {goal.target}</span>
                </div>
              </div>
            );
          })}

          <button className="add-goal-card" onClick={() => setIsModalOpen(true)}>
            <span className="plus-icon">+</span> ADD NEW GOAL
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">NEW TARGET</h2>
            <form onSubmit={handleAddGoal}>
              <div className="input-group">
                <label>GOAL NAME</label>
                <input 
                  type="text" 
                  placeholder="E.G. DEADLIFT 200KG" 
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  required
                />
              </div>
              <div className="input-group">
                <label>TARGET SPECIFICS</label>
                <input 
                  type="text" 
                  placeholder="E.G. 200 KG" 
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                />
              </div>
              <div className="modal-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px', width: '100%' }}>
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>CANCEL</button>
                <button type="submit" className="btn-submit" style={{ flex: 1, whiteSpace: 'nowrap' }}>INITIALIZE</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals;