import React, { useEffect, useState } from 'react';
import CustomAudioPlayer from '../../components/AudioPlayer';
import CompleteButton from '../../components/CompleteButton';
import BackButton from '../../components/SuggestionButton';

const Meditation = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null); // For current track display

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await fetch('/cs378-project/suggestions.json');
        const data = await response.json();

        // Search all emotions for the meditation activity
        for (const emotion of Object.values(data)) {
          const meditation = emotion.suggestions.find(s => s.activity === 'meditation');
          if (meditation && meditation.playlist) {
            setPlaylist(meditation.playlist);
            setCurrentTrack(meditation.playlist[0]); // Start with first track
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
      <h1>Meditation</h1>
      <p>Pick a sound to meditate to:</p>

      {currentTrack && (
        <div className="activity-display-box">
        <CustomAudioPlayer 
          src={`/cs378-project/${currentTrack.source}`} 
          title={currentTrack.title}
          className="audio-player"
        />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '85vw', margin: '0 auto'}}>
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
      <BackButton/>
    </div>
  );
};

export default Meditation;
