import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="back-button-container">
      <button className="back-button" onClick={() => navigate("/suggestions")}>
        Back to Suggestions
      </button>
    </div>
  );
};

const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <div className="back-button-container">
      <button className="back-button" onClick={() => navigate("/home")}>
        Home
      </button>
    </div>
  );
};

const Yoga = () => {
  const videoRefs = {
    video1: useRef(null),
    video2: useRef(null),
  };

  const handlePlay = (refName) => {
    videoRefs[refName].current.play();
  };

  const handlePause = (refName) => {
    videoRefs[refName].current.pause();
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{ paddingBottom: '20px' }}>Yoga for Mental Wellness</h1>

      <HomeButton />
      <BackButton />

      {/* Video 1 */}
      <div className="activity-display-box">
        <h3>Morning Yoga Flow</h3>
        <video
          width="100%"
          ref={videoRefs.video1}
          controls={false}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          style={{ borderRadius: '20px' }}
        />
        <div className="audio-controls">
          <button className="playlist-button" onClick={() => handlePlay("video1")}>Play</button>
          <button className="playlist-button" onClick={() => handlePause("video1")}>Pause</button>
        </div>
      </div>

      {/* Video 2 */}
      <div className="activity-display-box">
        <h3>Evening Relaxation Yoga</h3>
        <video
          width="100%"
          ref={videoRefs.video2}
          controls={false}
          src="https://www.w3schools.com/html/movie.mp4"
          style={{ borderRadius: '20px' }}
        />
        <div className="audio-controls">
          <button className="playlist-button" onClick={() => handlePlay("video2")}>Play</button>
          <button className="playlist-button" onClick={() => handlePause("video2")}>Pause</button>
        </div>
      </div>
    </div>
  );
};

export default Yoga;
