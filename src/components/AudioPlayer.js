import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const CustomAudioPlayer = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [localVolume, setLocalVolume] = useState(1); // ✅ Local audio volume (0.0 to 1.0)
  const [widgetVolume, setWidgetVolume] = useState(100); // ✅ SoundCloud volume (0 - 100)

  const audioRef = useRef(null);
  const soundCloudRef = useRef(null);
  const widgetRef = useRef(null);

  const isSoundCloud = src.includes('soundcloud.com');

  useEffect(() => {
    if (isSoundCloud && soundCloudRef.current && window.SC) {
      widgetRef.current = window.SC.Widget(soundCloudRef.current);

      widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
        console.log('SoundCloud widget ready');
        widgetRef.current.setVolume(widgetVolume);
      });

      widgetRef.current.bind(window.SC.Widget.Events.PLAY, () => {
        setIsPlaying(true);
      });

      widgetRef.current.bind(window.SC.Widget.Events.PAUSE, () => {
        setIsPlaying(false);
      });
    }
  }, [src, isSoundCloud, widgetVolume]);

  // Apply local audio volume
  useEffect(() => {
    if (!isSoundCloud && audioRef.current) {
      audioRef.current.volume = localVolume;
    }
  }, [localVolume, isSoundCloud]);

  const togglePlay = () => {
    if (isSoundCloud) return; // Don't need toggle for SoundCloud (iframe has built-in controls)

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleTrackEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (!isSoundCloud && audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [src, isSoundCloud]);

  return (
    <div className="audio-player">
      <h3>{title}</h3>

      {isSoundCloud ? (
        <>
          {/* ✅ SoundCloud embedded player */}
          <iframe
            ref={soundCloudRef}
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(src)}&color=%2349BA29&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
            title="SoundCloud Player"
          />

          {/* ✅ Volume slider for SoundCloud */}
          <div className="volume-control mt-1">
            <label>Volume: {widgetVolume}%</label>
            <input
              className="volume-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              value={widgetVolume}
              style={{ '--value': `${widgetVolume}%` }}
              onChange={(e) => {
                const newVolume = parseInt(e.target.value, 10);
                setWidgetVolume(newVolume);
                if (widgetRef.current) {
                  widgetRef.current.setVolume(newVolume);
                }
              }}
            />
          </div>
        </>
      ) : (
        <>
          {/* ✅ Local audio player with controls */}
          <div className="audio-controls">
            <button onClick={togglePlay} className="play-button">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
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

          {/* ✅ Volume slider for local audio */}
          <div className="volume-control mt-1">
            <label>Volume: {Math.round(localVolume * 100)}%</label>
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={localVolume}
                style={{ '--value': `${localVolume * 100}%` }}
                onChange={(e) => setLocalVolume(parseFloat(e.target.value))}
              />

          </div>

          <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={updateTime}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleTrackEnd}
            loop={false}
          >
            Your browser does not support the audio element.
          </audio>
        </>
      )}
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
