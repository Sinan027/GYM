import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Calculator from "../calculator/Calculator";
import Goals from "../Goals/Goals";
import "./Home.css";
import { Programmes } from "../programmes/Programmes";
import Workoutplanner from "../workoutplanner/Workoutplanner";
import { useNavigate } from 'react-router-dom'; 
import Trainers from "../trainers/Trainers";
import Workouts from "../workouts/Workouts";
import Profile from "../userProfile/Profile";

export default function Home() {
  const navigate = useNavigate(); 

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  return (
  <div className="page-wrapper">

      <section className="hero-section">
        <div className="hero-container">
          <header className="hero-header">
            <p className="kicker">— NO EXCUSES. JUST RESULTS.</p>

            <h1 className="main-title">
              TRAIN <br />
              <span className="text-highlight underline-style">HARDER.</span>
            </h1>

            <p className="description">
              Structured workout programs, nutrition plans, and progress tracking — 
              everything you need to build the body you want. Science-backed. No fluff.
            </p>
          </header>

         
          <div className="cta-group">
            <button className="btn-solid" onClick={handleAuth}>
              {isLoggedIn ? "LOGOUT" : "GET STARTED"}
            </button>

            <button 
              className="btn-outline" 
              onClick={() => navigate("/calculator")}
            >
              TRY CALCULATOR
            </button>
          </div>

          <footer className="hero-stats">
            <div className="stat-box">
              <span className="stat-number">240+</span>
              <span className="stat-label">EXERCISES</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">18</span>
              <span className="stat-label">PROGRAMS</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">50K+</span>
              <span className="stat-label">MEMBERS</span>
            </div>
          </footer>
        </div>
      </section>

    
<div className="marquee-green-bar">
  <div className="marquee-content">
    {/* Group 1 */}
    <span className="ticker-item">Strength Training</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">HIIT Workouts</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Fat Loss</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Muscle Gain</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Home Workouts</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Nutrition Plans</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Progress Tracking</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Goal Setting</span><span className="ticker-dot">✦</span>
    
    {/* Duplicate Group for Seamless Looping */}
    <span className="ticker-item">Strength Training</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">HIIT Workouts</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Fat Loss</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Muscle Gain</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Home Workouts</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Nutrition Plans</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Progress Tracking</span><span className="ticker-dot">✦</span>
    <span className="ticker-item">Goal Setting</span><span className="ticker-dot">✦</span>
  </div>
</div>
  <Programmes/>
  <Goals/>
  <Workoutplanner/>
  <Calculator/>
<Trainers/>

    </div>

  );
}