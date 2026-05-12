import { useState, useEffect } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [formData, setFormData] = useState({
    age: 25,
    gender: "male",
    weight: 70,
    height: 175,
    activity: 1.55,
    goal: "maintain",
  });

  const [results, setResults] = useState({ bmr: 0, tdee: 0 });

  const calculateResults = () => {
    const { age, gender, weight, height, activity, goal } = formData;
    
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;

    let tdee = bmr * activity;

    // Adjust for goals
    if (goal === "lose") tdee -= 500;
    if (goal === "gain") tdee += 500;

    setResults({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  useEffect(() => {
    calculateResults();
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="calc-page">
      <div className="calc-container">
        <header className="calc-header">
          <p className="kicker">05 — TOOLS</p>
          <h1 className="heavy-title">CALORIE <br/> CALCULATOR</h1>
        </header>

        <div className="calc-grid">
          {/* INPUT SECTION */}
          <div className="calc-inputs">
            <div className="input-row">
              <div className="input-group">
                <label>AGE (YEARS)</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>GENDER</label>
                <select name="gender" onChange={handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>WEIGHT (KG)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>HEIGHT (CM)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <label>ACTIVITY LEVEL</label>
              <select name="activity" onChange={handleChange}>
                <option value="1.2">Sedentary (Office job)</option>
                <option value="1.375">Lightly Active (1-2 days/week)</option>
                <option value="1.55">Moderately Active (3-5 days/week)</option>
                <option value="1.725">Very Active (6-7 days/week)</option>
              </select>
            </div>

            <div className="input-group">
              <label>GOAL</label>
              <select name="goal" onChange={handleChange}>
                <option value="maintain">Maintain weight</option>
                <option value="lose">Lose weight (Deficit)</option>
                <option value="gain">Gain muscle (Surplus)</option>
              </select>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="calc-results">
            <p className="results-label">YOUR RESULTS</p>
            
            <div className="result-card main-result">
              <p className="res-title">DAILY CALORIES</p>
              <div className="res-value">
                <span className="accent-bar"></span>
                <h2>{results.tdee} <span>kcal/day</span></h2>
              </div>
              <p className="res-desc">Your personalized target to reach your goal.</p>
            </div>

            <div className="result-card">
              <p className="res-title">BMR (BASAL METABOLIC RATE)</p>
              <div className="res-value">
                <span className="accent-bar"></span>
                <h2>{results.bmr} <span>kcal/day</span></h2>
              </div>
              <p className="res-desc">Calories your body burns at complete rest.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}