// LoadingScreen.js
import React, { useEffect, useState } from 'react';

const loadingMessages = [
  "Tuning into your vibes…",
  "Listening to your mood…",
  "Gathering feel-good ideas…",
  "Cooking up something joyful…",
  "Finding your happy place…",
  "Crafting cozy activities for you…",
  "Picking the perfect pick-me-ups…",
  "Sniffing out good vibes…",
  "Flipping through your feel-good folder…",
  "Your self-care squad is on it…"
];

const LoadingScreen = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <h2>{loadingMessages[index]}</h2>
      <p>Just a sec while we match your mood with mindful moments.</p>
    </div>
  );
};

export default LoadingScreen;
