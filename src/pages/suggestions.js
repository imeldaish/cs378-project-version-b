import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import LoadBar from '../components/loadbar';

const SuggestionPage = () => {
  const [suggestions, setSuggestions] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);


  const navigate = useNavigate(); 
  const { state } = useLocation();
  // Save emotion to sessionStorage if passed via state
  useEffect(() => {
    if (state?.emotion) {
      sessionStorage.setItem("emotion", state.emotion);
    }
  }, [state]);

  const emotion = state?.emotion || sessionStorage.getItem("emotion") || "bored";


  async function fetchSuggestion() {
    setLoading(true);
    try {
      const response = await fetch('/cs378-project/suggestions.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      setError(`suggestions for ${emotion} not found!`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSuggestion();
  }, [emotion]);

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity); // Track the selected activity
  };

  const handleContinue = () => {
    if (selectedActivity) {
      navigate(selectedActivity.link);
    } else {
      alert("Please select an activity.");
    }
  };

  return (
    <div className='suggestion-page'>
      <LoadBar percentage={50}/>

      <div className='header-container'>
        <h1 className='mt-2 fw-semibold'>You are feeling:</h1>
        <h1 className='fw-bold' style={{ color: '#49BA29' }}>{emotion.toUpperCase()}</h1>
      </div>
      

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h3>Here are some suggestions based on your mood</h3>
          <p>Select an activity to continue</p>
          <ul className='suggestion-list'>
            {suggestions[emotion] && suggestions[emotion].suggestions.length > 0? (
                suggestions[emotion].suggestions.map((item, index) => (
                  <li key={index}>
                    <button className={`suggestion-button ${selectedActivity?.activity === item.activity ? 'active' : ''}`}
                      onClick={() => handleActivitySelect(item)}>
                      {item.activity.charAt(0).toUpperCase() + item.activity.slice(1)}
                    </button>
                  </li>
                ))
              ) : (
                <p>No suggestions available.</p>
              )}

          </ul>

          {selectedActivity && (
            <div>
              <p>You have selected: {selectedActivity.activity}</p>
              <button className="next-button" onClick={handleContinue}>CONTINUE</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionPage;
