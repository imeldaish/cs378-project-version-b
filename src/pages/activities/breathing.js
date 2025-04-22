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
  const inhaleRef = useRef(isInhale);
  const cyclesRef = useRef(cycles);
  const navigate = useNavigate();

  useEffect(() => {
    inhaleRef.current = isInhale;
  }, [isInhale]);

  useEffect(() => {
    cyclesRef.current = cycles;
  }, [cycles]);

  useEffect(() => {
    if (!isPlaying || cycles <= 0) return;

    const duration = 4000; // 4 seconds
    const tickRate = 100;
    const totalTicks = duration / tickRate;
    let tick = 0;

    intervalRef.current = setInterval(() => {
      tick++;
      const percent = tick / totalTicks;
      const inhale = inhaleRef.current;

      setProgress(inhale ? percent : 1 - percent);

      if (tick >= totalTicks) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        setIsInhale((prev) => !prev);
        if (!inhale) {
          setCycles((prev) => prev - 1);
        }
      }
    }, tickRate);

    return () => clearInterval(intervalRef.current);
  }, [isInhale, isPlaying, cycles]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="App breathing-page" style={{ color: '#ffffff', minHeight: '100vh', backgroundImage: `url(${process.env.PUBLIC_URL}/images/breathe.jpg)`, backgroundSize: 'cover',
    backgroundPosition: 'center', }}>
      <div className="back-button-container">
        <button className="back-button mt-2" onClick={() => navigate("/suggestions")}>
          <ArrowBigLeft size={30} />
        </button>
      </div>

      <h1 className="mt-3">Breathing Exercise</h1>
      <p>Press play to begin</p>

      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '40px auto 0 auto' }}>
        <svg width="250" height="250">
          <circle cx="125" cy="125" r="100" stroke="#eee" strokeWidth="15" fill="none" />
          <circle
            cx="125"
            cy="125"
            r="100"
            stroke="#CAE8A2"
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
          color: '#CAE8A2'
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
