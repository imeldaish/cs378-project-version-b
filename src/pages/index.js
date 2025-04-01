import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MoodPage = () => {
  const [emotions, setEmotions] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEmotion, setSelectedEmotion] = useState('bored');
  const navigate = useNavigate();
  const handleEmojiClick = (mood) => {
    setSelectedEmotion(mood);
  };
  const handleNextClick = () => {
    navigate('/suggestions', { state: { emotion: selectedEmotion } });
  };

  async function fetchMoods() {
    setLoading(true);
    try {
      const response = await fetch('/cs378-project/suggestions.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEmotions(data);
    } catch (error) {
      setError(`Emotions not found`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMoods();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Hi, Maya</h1>
      <h3>How do you feel today?</h3>

      <div className="selected-emotion">
        <div className="emoji">
          {emotions[selectedEmotion]?.emoji}
        </div>
        <p className="mood-name">
          {selectedEmotion.charAt(0).toUpperCase() + selectedEmotion.slice(1)}
        </p>
      </div>

      <div className="emoji-grid">
        {Object.entries(emotions).map(([mood, data]) => (
          <div 
            key={mood} 
            className="emoji-item"
            onClick={() => handleEmojiClick(mood)} // Add click handler
            style={{
              cursor: 'pointer',
              border: mood === selectedEmotion ? '2px solid blue' : 'none', // Highlight selected emoji
            }}
          >
            <span className="emoji">{data.emoji}</span>
            <p className="mood-name">{mood.charAt(0).toUpperCase() + mood.slice(1)}</p>
          </div>
        ))}
      </div>

      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default MoodPage;

