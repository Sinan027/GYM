import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './DemoOverlay.css';

export default function DemoOverlay() {
  const { isAuthenticated, setLoginModalOpen } = useContext(AuthContext);

  if (isAuthenticated) return null;

  return (
    <div 
      className="demo-overlay-interceptor" 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoginModalOpen(true);
      }}
    >
      {/* This invisible overlay catches clicks on the page content */}
    </div>
  );
}
