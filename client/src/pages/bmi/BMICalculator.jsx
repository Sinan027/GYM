import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BMICalculator.css';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiStatus, setBmiStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) {
      setMessage("Please enter both weight and height.");
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // convert cm to m

    if (weightNum <= 0 || heightNum <= 0) {
      setMessage("Please enter valid positive numbers.");
      return;
    }

    const bmi = (weightNum / (heightNum * heightNum)).toFixed(1);
    setBmiResult(bmi);

    let status = '';
    if (bmi < 18.5) status = 'Underweight';
    else if (bmi >= 18.5 && bmi < 24.9) status = 'Normal Weight';
    else if (bmi >= 25 && bmi < 29.9) status = 'Overweight';
    else status = 'Obese';

    setBmiStatus(status);
    setMessage('');
    
    console.log("[BMI Calc] Weight:", weightNum, "Height:", height, "BMI:", bmi, "Status:", status);
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBmiResult(null);
    setBmiStatus('');
    setMessage('');
  };

  const saveBMI = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login to save your BMI history.");
      // Optional: navigate('/login') could be called here
      return;
    }

    setLoading(true);
    try {
      console.log("[BMI Save] Sending Data:", { weight, height, bmi: bmiResult, status: bmiStatus });
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post("http://localhost:5000/api/bmi", {
        weight,
        height,
        bmi: bmiResult,
        status: bmiStatus
      }, config);

      setMessage("👉 BMI saved successfully");
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error("[BMI Save Error]", err);
      setMessage("Failed to save BMI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (bmiStatus === 'Underweight') return '#3db5f2'; // Blue
    if (bmiStatus === 'Normal Weight') return '#B5F23D'; // Neon Green
    if (bmiStatus === 'Overweight') return '#f2d13d'; // Yellow
    if (bmiStatus === 'Obese') return '#f23d3d'; // Red
    return '#B5F23D';
  };

  const getProgressWidth = () => {
    if (!bmiResult) return '0%';
    // Cap progress at 40 BMI for visual purposes
    const percentage = Math.min((bmiResult / 40) * 100, 100);
    return `${percentage}%`;
  };

  return (
    <div className="bmi-page">
      <div className="bmi-container">
        <header className="bmi-header">
          <p className="kicker">06 — TOOLS</p>
          <h1 className="heavy-title">BMI <br/> CALCULATOR</h1>
        </header>

        <div className="bmi-grid">
          {/* Input Section */}
          <div className="bmi-card">
            <h2 className="card-title">YOUR STATS</h2>
            <form onSubmit={calculateBMI} className="bmi-form">
              <div className="input-group">
                <label>WEIGHT (KG)</label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  placeholder="e.g. 75" 
                  step="0.1"
                />
              </div>
              <div className="input-group">
                <label>HEIGHT (CM)</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  placeholder="e.g. 175"
                />
              </div>

              {message && <div className="bmi-message">{message}</div>}

              <div className="btn-group">
                <button type="submit" className="calc-btn">CALCULATE BMI</button>
                <button type="button" onClick={resetCalculator} className="reset-btn">RESET</button>
              </div>
            </form>
          </div>

          {/* Result Section */}
          <div className="bmi-card results-card">
            <h2 className="card-title">YOUR RESULTS</h2>
            
            {!bmiResult ? (
              <div className="empty-results">
                <p>Enter your weight and height to see your BMI result.</p>
              </div>
            ) : (
              <div className="results-display animation-fade-in">
                <div className="bmi-score-container" style={{ borderColor: getStatusColor() }}>
                  <h1 className="bmi-score" style={{ color: getStatusColor() }}>{bmiResult}</h1>
                  <p className="bmi-label">BODY MASS INDEX</p>
                </div>
                
                <h3 className="bmi-status" style={{ color: getStatusColor() }}>
                  {bmiStatus.toUpperCase()}
                </h3>

                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: getProgressWidth(), 
                      backgroundColor: getStatusColor() 
                    }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>

                <div className="action-row">
                  <button onClick={saveBMI} disabled={loading} className="save-btn">
                    {loading ? "SAVING..." : "SAVE HISTORY"}
                  </button>
                  <button onClick={() => navigate('/bmi-history')} className="history-link-btn">
                    VIEW HISTORY
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;
