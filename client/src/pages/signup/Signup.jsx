import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    weight: '',
    height: '',
    goal: 'Muscle Gain', // Default value
    password: '',
    confirmPassword: ''
  });

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
     try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      console.log(res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
      console.log(err)
    }
  };

  return (
    <>
    
      <div className="signup-page">
        <div className="signup-bg-overlay"></div>
        <div className="signup-container">
          <header className="signup-header">
            <p className="section-num">02 — REGISTRATION</p>
            <h1 className="heavy-title">JOIN THE <br /> <span className="text-highlight underline-style">SQUAD.</span></h1>
          </header>

          <div className="signup-card">
            <form onSubmit={handleSubmit} className="brutalist-form">
              <div className="form-grid">
                <div className="input-field">
                  <label>USERNAME</label>
                  <input type="text" name="username" placeholder="CHAD_TRAINS" onChange={handleChange} required />
                </div>

                <div className="input-field">
                  <label>EMAIL ADDRESS</label>
                  <input type="email" name="email" placeholder="iron@alphafit.com" onChange={handleChange} required />
                </div>

                <div className="input-field">
                  <label>PHONE NUMBER</label>
                  <input type="tel" name="phone" placeholder="+1 555-0000" onChange={handleChange} required />
                </div>

                <div className="input-field">
                  <label>PRIMARY GOAL</label>
                  <select name="goal" className="brutalist-select" onChange={handleChange}>
                    <option value="Muscle Gain">MUSCLE GAIN</option>
                    <option value="Fat Loss">FAT LOSS</option>
                    <option value="Strength">STRENGTH</option>
                    <option value="Endurance">ENDURANCE</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>WEIGHT (KG)</label>
                  <input type="number" name="weight" placeholder="85" onChange={handleChange} required />
                </div>

                <div className="input-field">
                  <label>HEIGHT (CM)</label>
                  <input type="number" name="height" placeholder="180" onChange={handleChange} required />
                </div>

                <div className="input-field">
                  <label>PASSWORD</label>
                  <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
                </div>

                <div className="input-field">
                  <label>CONFIRM PASSWORD</label>
                  <input type="password" name="confirmPassword" placeholder="••••••••" onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className="signup-btn">INITIALIZE ACCOUNT</button>
              <p className="auth-switch">ALREADY ENROLLED? <span onClick={() => navigate('/login')}>LOGIN HERE</span></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;