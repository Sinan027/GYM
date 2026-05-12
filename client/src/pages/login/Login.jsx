import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <>
      <div className="login-page">
        {/* Back Arrow */}
        <div 
          onClick={() => navigate("/")} 
          style={{ position: 'absolute', top: '30px', left: '30px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', color: '#B5F23D', fontWeight: 'bold', fontSize: '1.2rem' }}
        >
          <span style={{ fontSize: '1.5rem' }}>←</span> BACK TO HOME
        </div>
        {/* Background Decorative Overlay */}
        <div className="login-bg-image"></div>
        <div className="login-overlay"></div>

        <div className="login-container">
          <header className="login-header">
            <p className="section-num">01 — ACCESS</p>
            <h1 className="heavy-title">ELITE <br /> PORTAL</h1>
          </header>

          <div className="login-card">
            <form onSubmit={handleSubmit} className="brutalist-form">
              <div className="input-field">
                <label>OPERATOR EMAIL</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@training.com"
                   onChange={handleChange}
          required
                />
              </div>

              <div className="input-field">
                <label>SECURE PASSWORD</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
          required
                />
              </div>

              <button type="submit" className="login-btn">
                AUTHENTICATE
              </button>

              <div className="form-footer">
                <p>NEW RECRUIT? <span className="text-highlight" onClick={() => navigate('/signup')}>JOIN THE SQUAD</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}