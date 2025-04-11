import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import CustomAudioPlayer from '../../components/AudioPlayer';

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

const VideoBox = ({ title, videoSrc, refName, videoRefs, audioSrc }) => {
  return (
    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '8px' }}>{title}</h3>

      <div className="yoga-video-box">
        <div className="video-wrapper">
          <video
            ref={videoRefs[refName]}
            src={videoSrc}
            style={{ width: '100%', height: 'auto', maxHeight: '360px', borderRadius: '20px' }}
            loop
            muted
          />
        </div>
      </div>

      <CustomAudioPlayer src={audioSrc}  />
    </div>
  );
};

const Yoga = () => {
  const videoRefs = {
    video1: useRef(null),
    video2: useRef(null),
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{ paddingBottom: '10px' }}>Yoga for Mental Wellness</h1>

      <div className="nav-button-group">
        <HomeButton />
        <BackButton />
      </div>

      <VideoBox
        title="Morning Yoga Flow"
        videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        refName="video1"
        videoRefs={videoRefs}
      />
      <VideoBox
        title="Evening Relaxation Yoga"
        videoSrc="https://www.w3schools.com/html/movie.mp4"
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        refName="video2"
        videoRefs={videoRefs}
      />
    </div>
  );
};

export default Yoga;
