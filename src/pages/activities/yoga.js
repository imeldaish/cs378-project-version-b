Yoga.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import LoadBar from '../../components/LoadBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoBox = ({ title, videoSrc, videoDescription }) => {
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
          <iframe
            src={videoSrc}
            title={title}
            width="640"
            height="360"
            allow="autoplay"
            style={{
              display: 'block',
              border: 'none',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
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
      </div>
    </div>
  );
};

const Yoga = () => {
  const navigate = useNavigate();

  return (
    <div>
      <LoadBar percentage={75} />
      <div style={{ margin: '1rem' }}>
        <div className="back-button-container">
          <button className="back-button mt-2" onClick={() => navigate("/suggestions")}>
            <ArrowBigLeft size={30} />
          </button>
        </div>
        <h1 className="journal-header">Yoga</h1>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <VideoBox
            title="Morning Yoga Flow (15 min)"
            videoSrc="https://drive.google.com/file/d/1DKFMZT-Vip6TdHOOG_EAhmCtRuw_tVDH/preview"
            videoDescription="Start your day with energy and focus. This gentle morning yoga session awakens your body, boosts circulation, and sets a positive tone for the day ahead."
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <VideoBox
            title="Evening Tension Relief Yoga (10 min)"
            videoSrc="https://drive.google.com/file/d/1j-KiW25mOM39BBZ07bG7Y_m7pWMlHDew/preview"
            videoDescription="Practice designed for anyone feeling stress, anxiety or tension in the mind or body. Prepare yourself for a good night or use it at any time of the day to take moment and work on your imbalance."
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <VideoBox
            title="Stress Relief Yoga (15 min)"
            videoSrc="https://drive.google.com/file/d/1YVGlXC3b28i8H6vuKjDPMrWvGn2r3YOk/preview"
            videoDescription="Wind down and release the stress of the day. This calming evening flow helps relax your muscles and mind, preparing you for a restful night’s sleep."
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <VideoBox
            title="Slow Stretch Yoga (20 min)"
            videoSrc="https://drive.google.com/file/d/1CISYFTmi4VYijbKQge8g3nLSLytOTekY/preview"
            videoDescription="A 20 minute Slow Yoga stretch session with slow stretches to release tension and find deep relaxation."
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <VideoBox
            title="Quick Simple Yoga (5 min)"
            videoSrc="https://drive.google.com/file/d/1rQuvgkXDjdwD2PSwpfrM7vFznUdvV-G6/preview"
            videoDescription="Stretch out and feel good in only 5 minutes with this easy yoga stretch. Just press play and get on the floor, no mat or experience needed!"
          />
        </div>
      </div>
    </div>
  );
};

export default Yoga;