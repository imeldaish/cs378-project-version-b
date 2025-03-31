import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SuggestionPage = () => {
  const [suggestions, setSuggestions] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const emotion = "bored"; // Hardcoded for testing

  async function fetchSuggestion() {
    setLoading(true);
    try {
      const response = await fetch('/cs378-project/suggestions.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSuggestions(data);
      setError(null);
    } catch (error) {
      setError(`suggestions for ${emotion} not found!`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSuggestion();
  }, []);

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
            {suggestions[emotion] ? (
                suggestions[emotion].map((item, index) => (
                  <li key={item.index}>
                    <Link to={item.link}>
                      <button>{item.activity}</button>
                    </Link>
                  </li>
                ))
              ) : (
                <p>No suggestions available.</p>
              )}

          </ul>
        </div>
      )}
    </div>
  );
};

export default SuggestionPage;
