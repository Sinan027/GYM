import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./LoginModal.css";

export default function LoginModal() {
  const { isLoginModalOpen, setLoginModalOpen, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (!isLoginModalOpen) return null;

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
      
      // Update global context
      login(user, token);

      if (user.role === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-container">
        <button 
          className="login-modal-close" 
          onClick={() => setLoginModalOpen(false)}
        >
          ×
        </button>
        
        <header className="login-header">
          <p className="section-num">RESTRICTED AREA</p>
          <h1 className="heavy-title" style={{fontSize: '2.5rem', marginBottom: '20px'}}>
            AUTHORIZATION <br /> REQUIRED
          </h1>
        </header>

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

          <div className="form-footer" style={{marginTop: '20px', textAlign: 'center'}}>
            <p style={{color: '#888'}}>
              NEW RECRUIT?{" "}
              <span 
                className="text-highlight" 
                style={{cursor: 'pointer', color: '#B5F23D', fontWeight: 'bold'}}
                onClick={() => {
                  setLoginModalOpen(false);
                  navigate('/signup');
                }}
              >
                JOIN THE SQUAD
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
