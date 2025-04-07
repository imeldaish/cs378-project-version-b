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
      <div className="home-header">
        <div className="header-text"> 
          <h1 className="header-title">Hi, Maya!</h1>
          <h3>How do you <span className="feel-text">feel</span> today?</h3>
        </div>
      </div>

      <div className="selected-emotion">
        <div className="emoji">
          <img
            src={emotions[selectedEmotion]?.emoji.replace('.svg', '_select.svg')}
            alt={`${selectedEmotion} emoji`}
            className="emoji-img-selected"
          />
        </div>
          <p className="mood-name-selected">
            {selectedEmotion.toUpperCase()}
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
            }}
          >
            <img
              src={
                mood === selectedEmotion
                  ? data.emoji.replace('.svg', '_select.svg')
                  : data.emoji
              }
              alt={`${mood} emoji`}
              className="emoji-img"
            />
            <p className="mood-name">{mood.toUpperCase()}</p>
          </div>
        ))}
      </div>

      <button class="button" onClick={handleNextClick}>DONE</button>
    </div>
  );
};

export default MoodPage;

