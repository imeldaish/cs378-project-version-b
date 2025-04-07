import React, { useEffect, useState } from 'react';
import CustomAudioPlayer from '../../components/AudioPlayer';
import { useNavigate } from "react-router-dom";
import CompleteButton from '../../components/CompleteButton';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "12px 12px" }}>
      <button className="back-button" variant="primary" onClick={() => navigate("/suggestions")}>
        Back to Suggestions
      </button>
    </div>
  );
};

const Music = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null); // For current track display

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await fetch('/cs378-project/suggestions.json');
        const data = await response.json();

        // Search all emotions for the meditation activity
        for (const emotion of Object.values(data)) {
          const music = emotion.suggestions.find(s => s.activity === 'listen to calming music');
          if (music && music.playlist) {
            setPlaylist(music.playlist);
            setCurrentTrack(music.playlist[0]); // Start with first track
            break;
          }
        }
      } catch (err) {
        console.error('Failed to load playlist:', err);
      }
    }

    fetchSuggestions();
  }, []);

  const handleTrackChange = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className=''>
      <h1>Calming Music</h1>
      <p>Pick a sound to listen to:</p>

      {currentTrack && (
        <div className="activity-display-box">
          <CustomAudioPlayer
            src={`/cs378-project/${currentTrack.source}`}
            title={currentTrack.title}
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '85vw', margin: '0 auto' }}>
        {playlist.map((track, index) => (
          <button
            key={index}
            onClick={() => handleTrackChange(track)}
            className="playlist-button">
            {track.title}
          </button>
        ))}
      </div>
      {/* <CompleteButton/> */}
      <BackButton />
    </div>
  );
};

export default Music;
