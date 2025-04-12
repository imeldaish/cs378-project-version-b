import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, Play, Pause } from 'lucide-react';

import '../../App.css';

const Breathing = () => {
  const [isInhale, setIsInhale] = useState(true);
  const [progress, setProgress] = useState(0);
  const [cycles, setCycles] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const startBreathing = () => {
    if (cycles <= 0 || intervalRef.current) return;

    const duration = 5000; 
    const tickRate = 100;
    const totalTicks = duration / tickRate;
    let tick = 0;

    const runCycle = () => {
      intervalRef.current = setInterval(() => {
        tick++;
        const percent = tick / totalTicks;

        setProgress(isInhale ? percent : 1 - percent);

        if (tick >= totalTicks) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsInhale((prev) => !prev);
          if (!isInhale) setCycles((prev) => prev - 1);

          if (isPlaying && cycles > 1) {
            setTimeout(() => startBreathing(), 10);
          }
        }
      }, tickRate);
    };

    runCycle();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startBreathing();
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="App breathing-page" style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#CAE8A2' }}>
      <div className="back-button-container">
        <button className="back-button mt-2" onClick={() => navigate("/suggestions")}>
          <ArrowBigLeft size={30} />
        </button>
      </div>

      <h1 className="mt-3">Breathing Exercise</h1>

      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '40px auto 0 auto' }}>
        <svg width="250" height="250">
          <circle cx="125" cy="125" r="100" stroke="#eee" strokeWidth="15" fill="none" />
          <circle
            cx="125"
            cy="125"
            r="100"
            stroke="#ffffff"
            strokeWidth="15"
            fill="none"
            strokeDasharray={2 * Math.PI * 100}
            strokeDashoffset={(1 - progress) * 2 * Math.PI * 100}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '28px',
          fontWeight: '600',
          color: '#ffffff'
        }}>
          {isInhale ? 'inhale' : 'exhale'}
        </div>
      </div>

      <div style={{ marginTop: '60px', fontSize: '16px', color: '#ffffff' }}>
        {cycles > 0 ? `${cycles} cycles left` : 'Session Complete'}
      </div>

      <button className="play-button mt-3" onClick={handleTogglePlay}>
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
};

export default Breathing;
