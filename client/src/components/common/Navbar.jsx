import { useState } from "react";
import { NavLink, Link } from "react-router-dom"; // Import NavLink for active styling
import { FaUser } from "react-icons/fa"; // Import User icon
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close menu when a link is clicked on mobile
  const closeMenu = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>AlphaFit</Link>

        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li><NavLink to="/programs" className={({isActive}) => isActive ? "active-nav" : ""} onClick={closeMenu}>Programs</NavLink></li>
          <li><NavLink to="/exercises" className={({isActive}) => isActive ? "active-nav" : ""} onClick={closeMenu}>Exercises</NavLink></li>
          <li><NavLink to="/nutrition" className={({isActive}) => isActive ? "active-nav" : ""} onClick={closeMenu}>Nutrition</NavLink></li>
          <li><NavLink to="/calculator" className={({isActive}) => isActive ? "active-nav" : ""} onClick={closeMenu}>Calories</NavLink></li>
          <li><NavLink to="/bmi-calculator" className={({isActive}) => isActive ? "active-nav" : ""} onClick={closeMenu}>BMI</NavLink></li>
          <li><NavLink to="/progress" className={({isActive}) => isActive ? "active-nav" : ""} onClick={closeMenu}>Progress</NavLink></li>
          <li><NavLink to="/blog" className={({isActive}) => isActive ? "active-nav" : ""} onClick={closeMenu}>Blog</NavLink></li>
          <li><NavLink to="/community" className={({isActive}) => isActive ? "active-nav" : ""} onClick={closeMenu}>Community</NavLink></li>
          
          <li className="mobile-only">
            <NavLink to="/profile" className={({isActive}) => `start-btn-mobile ${isActive ? 'active-nav' : ''}`} onClick={closeMenu}>
              <FaUser style={{ fontSize: "1.2rem" }} />
            </NavLink>
          </li>
        </ul>

        <NavLink to="/profile" className={({isActive}) => `start-btn ${isActive ? 'active-nav' : ''}`}>
          <FaUser style={{ fontSize: "1.2rem" }} />
        </NavLink>

        <div className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </nav>
  );
}