import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

const MoodPage = () => {
  const [emotions, setEmotions] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(() => {
    return sessionStorage.getItem('selectedEmotion') || 'bored';
  });
  const [name, setName] = useState(sessionStorage.getItem('userName') || '');

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem('userName');
    if (!storedName) {
      const userName = prompt("Welcome! What's your name?");
      if (userName && userName.trim() !== '') {
        sessionStorage.setItem('userName', userName.trim());
        setName(userName.trim());
      } else {
        sessionStorage.setItem('userName', 'Guest');
        setName('Guest');
      }
    } else {
      setName(storedName);
    }
  }, []);
  

  const handleEmojiClick = (mood) => {
    setSelectedEmotion(mood);
    sessionStorage.setItem('selectedEmotion', mood);
  };

  const handleNextClick = () => {
    setIsGenerating(true); // show loading screen
    setTimeout(() => {
      navigate('/suggestions', { state: { emotion: selectedEmotion } });
    }, 4000); // fake 2-second delay
  };

  async function fetchMoods() {
    setLoading(true);
    try {
      const response = await fetch('/cs378-project-version-b/suggestions.json');
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

  if (isGenerating) {
    return <LoadingScreen />;
  }

  return (
    <>
    <div className="home-header">
        <div className="header-text">
          <h1 className="header-title">Hi, {name.charAt(0).toUpperCase() + name.slice(1)}!</h1>
          <h3>How do you <span className="feel-text">feel</span> today?</h3>
        </div>
      </div>
    <div className='mood-page'>
      

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
            onClick={() => handleEmojiClick(mood)}
            style={{ cursor: 'pointer' }}
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

      <button className="generate-suggestions-button" onClick={handleNextClick}>GENERATE SUGGESTIONS</button>
    </div>
    </>
  );
};

export default MoodPage;
