import React from 'react';
import './Background.css';

const Background = ({ children }) => {
  return (
    <div className="background-wrapper">
      <div className="background-overlay"></div>
      <div className="background-content">
        {children}
      </div>
    </div>
  );
};

export default Background;
