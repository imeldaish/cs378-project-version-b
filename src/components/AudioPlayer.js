import React, { useState, useRef, useEffect } from 'react';

const CustomAudioPlayer = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Toggle play/pause button
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Update the progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSeek = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTrackEnd = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  // reset the play/pause button when the song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
      setIsPlaying(false); 
    }
  }, [src]);

  return (
    <div className="audio-player">
      <h3>{title}</h3>

      <div className="audio-controls">
        <button onClick={togglePlay} className="play-button">
        {isPlaying ? <span dangerouslySetInnerHTML={{ __html: "&#x23F8;" }} /> : <span dangerouslySetInnerHTML={{ __html: "&#x25B6;" }} />}
        </button>

        <div className="progress-bar" onClick={handleSeek}>
          <div
            className="progress"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="timestamps">
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={updateTime}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnd} // Handle track ending
        loop={false} // Disable default loop to handle looping manually
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

// Format time in mm:ss
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default CustomAudioPlayer;
