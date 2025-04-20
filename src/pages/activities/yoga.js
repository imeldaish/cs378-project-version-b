import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import CustomAudioPlayer from '../../components/AudioPlayer';

const VideoBox = ({ title, videoSrc, refName, videoRefs, audioSrc, videoDescription }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="video-section">
      <div className="yoga-video-box">
        <div className="video-wrapper">
          <video
            ref={videoRefs[refName]}
            src={videoSrc}
            style={{
              display: 'block',
              maxWidth: '640px',
              height: 'auto',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
            loop
            muted
          />
        </div>
      </div>
      <div className="yoga-video-desc">
      <h3>{title}</h3>
      <p className="yoga-video-text">
        {isExpanded ? videoDescription : truncateText(videoDescription, 77)}
        {videoDescription.length > 100 && (
          <button
            onClick={toggleDescription}
            style={{
              marginLeft: '8px',
              background: 'none',
              border: 'none',
              color: '#007BFF',
              cursor: 'pointer',
              fontSize: '0.9em',
              textDecoration: 'underline',
            }}
          >
            {isExpanded ? 'View Less' : 'View More'}
          </button>
        )}
      </p>

      <CustomAudioPlayer src={audioSrc} title="" />
      </div>
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
      <button className="back-button-yoga" onClick={() => navigate("/suggestions")}>
        Back to Suggestions
      </button>
      <h1 style={{ paddingBottom: '20px', paddingTop: '25px' }}>Yoga for Mental Wellness</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <VideoBox
        title="Morning Yoga Flow"
        videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        refName="video1"
        videoRefs={videoRefs}
        videoDescription="Start your day with energy and focus. This gentle morning yoga session awakens your body, boosts circulation, and sets a positive tone for the day ahead."
      />
    </div>  
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  <VideoBox
    title="Evening Relaxation Yoga"
    videoSrc="https://www.w3schools.com/html/movie.mp4"
    audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    refName="video2"
    videoRefs={videoRefs}
    videoDescription="Wind down and release the stress of the day. This calming evening flow helps relax your muscles and mind, preparing you for a restful night’s sleep."
  />
</div>
</div> 
    
    
  );
};

export default Yoga;
