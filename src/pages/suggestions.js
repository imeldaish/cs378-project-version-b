import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom'; 

const SuggestionPage = () => {
  const [suggestions, setSuggestions] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);


  const navigate = useNavigate(); 
  const { state } = useLocation();
  const emotion = state?.emotion || "bored";

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
    <div>
      <h1>You are feeling:</h1>
      <h1>{emotion}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h3>Here are some suggestions based on your mood</h3>
          <p>Select an activity to continue</p>
          <ul>
            {suggestions[emotion] && suggestions[emotion].suggestions.length > 0? (
                suggestions[emotion].suggestions.map((item, index) => (
                  <li key={index}>
                  <button onClick={() => handleActivitySelect(item)}>{item.activity}</button>
                </li>
                ))
              ) : (
                <p>No suggestions available.</p>
              )}

          </ul>

          {selectedActivity && (
            <div>
              <p>You have selected: {selectedActivity.activity}</p>
              <button onClick={handleContinue}>Continue</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionPage;
