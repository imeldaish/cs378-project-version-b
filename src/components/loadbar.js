import React from 'react';

const LoadBar = ({ percentage }) => {
  const bar_width = Math.min(Math.max(percentage, 0), 100); // ensure 0-100

  return (
    <div className="loadbar-container">
        <div className="loadbar-empty-bar" >
            <div className="loadbar-fill-bar" style={{ width: `${bar_width}%`}} />
        </div>
    </div>
  );
};

export default LoadBar;
