import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import CustomAudioPlayer from '../../components/AudioPlayer';

const VideoBox = ({ title, videoSrc, refName, videoRefs, audioSrc }) => {
  return (
    <div className="video-section">
      <h3 style={{ marginBottom: '8px' }}>{title}</h3>

      <div className="yoga-video-box">
        <div className="video-wrapper">
          <video
            ref={videoRefs[refName]}
            src={videoSrc}
            style={{
              display: 'block',
              maxWidth: '640px',
              height: 'auto',
              borderRadius: '20px',
            }}
            loop
            muted
          />
        </div>
      </div>

      <CustomAudioPlayer src={audioSrc} title="Audio Guide" />
    </div>
  );
};

const Yoga = () => {
  const navigate = useNavigate();

  const videoRefs = {
    video1: useRef(null),
    video2: useRef(null),
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{ paddingBottom: '10px' }}>Yoga for Mental Wellness</h1>

      <div className="button-group">
        <button className="back-button" onClick={() => navigate("/home")}>
          Home
        </button>
        <button className="back-button" onClick={() => navigate("/suggestions")}>
          Back to Suggestions
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <VideoBox
        title="Morning Yoga Flow"
        videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        refName="video1"
        videoRefs={videoRefs}
      />
    </div>  
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  <VideoBox
    title="Evening Relaxation Yoga"
    videoSrc="https://www.w3schools.com/html/movie.mp4"
    audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    refName="video2"
    videoRefs={videoRefs}
  />
</div>
</div> 
    
    
  );
};

export default Yoga;
