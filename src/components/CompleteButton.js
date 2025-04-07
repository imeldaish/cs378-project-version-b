import React from 'react'
import { useNavigate } from 'react-router-dom';

const CompleteButton = () => {
    const navigate = useNavigate();

    const handleComplete = () => {
        navigate("/completed");
    };
  return (
    <div>
      <button className="next-button m-2" onClick={handleComplete}>I'm Done</button>
    </div>
  )
}

export default CompleteButton
