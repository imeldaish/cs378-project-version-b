import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import BackButton from '../components/SuggestionButton';
import LoadBar from '../components/LoadBar';

const CompletedPage = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // 🎉 Scroll to top and setup window resize listener for confetti
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Update confetti size on window resize
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* 🎉 Confetti effect */}
      <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />

      <LoadBar percentage={100} />

      <div style={{ height: '100vh', textAlign: 'center', paddingTop: '2rem' }}>
        <h1>Yay!</h1>
        <h2>You completed the activity :)</h2>

        <BackButton />
      </div>
    </>
  );
};

export default CompletedPage;
