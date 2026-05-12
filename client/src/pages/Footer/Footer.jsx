import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2 className="footer-logo">AlphaFit</h2>
          {/* <p className="brand-pitch">
            Built for people who take their fitness seriously. 
            Science-backed programs, real results, no shortcuts.
          </p> */}
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="link-column">
            <h3>PROGRAMS</h3>
            <ul>
              <li><a href="#fat-loss">Fat Loss</a></li>
              <li><a href="#muscle-gain">Muscle Gain</a></li>
              <li><a href="#home-workouts">Home Workouts</a></li>
              <li><a href="#endurance">Endurance</a></li>
              <li><a href="#flexibility">Flexibility</a></li>
            </ul>
          </div>

          <div className="link-column">
            <h3>RESOURCES</h3>
            <ul>
              <li><a href="#library">Exercise Library</a></li>
              <li><a href="#meal-plans">Meal Plans</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#calculator">Calorie Calculator</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          <div className="link-column">
            <h3>COMPANY</h3>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#trainers">Trainers</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-content">
          <p className="copyright">© 2025 AlphaFit FITNESS. All rights reserved.</p>
          <p className="footer-motto">Train Hard. Stay Consistent. Get Results.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;