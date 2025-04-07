import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "12px 12px" }}>
      <button className="back-button" variant="primary" onClick={() => navigate("/suggestions")}>
        Back to Suggestions
      </button>
    </div>
  );
};

const relaxation = () => {
  return (
    <div>
      <h1 style={{ padding: '10px 10px' }}> work in progress :) </h1>
      <BackButton />
    </div>
  )
}

export default relaxation
