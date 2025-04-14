import React, { useEffect, useState } from 'react';
import CustomAudioPlayer from '../../components/AudioPlayer';
import CompleteButton from '../../components/CompleteButton';
import BackButton from '../../components/SuggestionButton';
import LoadBar from '../../components/LoadBar';

const Meditation = () => {
  const [playlist, setPlaylist] = useState([]);
  const [walkthroughs, setWalkthroughs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentWalkthrough, setCurrentWalkthrough] = useState(null);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await fetch('/cs378-project-version-b/suggestions.json');
        const data = await response.json();

        for (const emotion of Object.values(data)) {
          const meditation = emotion.suggestions.find(s => s.activity === 'meditation');
          if (meditation) {
            if (meditation.playlist) {
              setPlaylist(meditation.playlist);
              setCurrentTrack(meditation.playlist[0]); // default
            }
            if (meditation.walkthroughs) {
              setWalkthroughs(meditation.walkthroughs);
              setCurrentWalkthrough(meditation.walkthroughs[0]); // default
            }
            break;
          }
        }
      } catch (err) {
        console.error('Failed to load suggestions:', err);
      }
    }

    fetchSuggestions();
  }, []);

  const handleTrackChange = (track) => {
    setCurrentTrack(track);
  };

  const handleWalkthroughChange = (walkthrough) => {
    setCurrentWalkthrough(walkthrough);
  };

  return (
    <>
    <LoadBar percentage={70}/>
    <div className='page'>
      <h1>Meditation Tracks</h1>
      <p>First, pick a track to meditate to:</p>

      {currentTrack && (
        <div className="activity-display-box">
          <CustomAudioPlayer 
            src={`/cs378-project-version-b/${currentTrack.source}`} 
            title={currentTrack.title}
            className="audio-player"
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

      <h2 className='mt-2'>Guided Walkthroughs</h2>
      <p>Next, select a track to guide you:</p>

      {currentWalkthrough && (
        <div className="activity-display-box">
          <CustomAudioPlayer 
            src={currentWalkthrough.source} 
            title={currentWalkthrough.title}
            className="audio-player"
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '85vw', margin: '0 auto' }}>
        {walkthroughs.map((walkthrough, index) => (
          <button
            key={index}
            onClick={() => handleWalkthroughChange(walkthrough)}
            className="playlist-button">
            {walkthrough.title}
          </button>
        ))}
      </div>

      <CompleteButton />
    </div>
    </>
  );
};

export default Meditation;
