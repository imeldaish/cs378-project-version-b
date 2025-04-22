import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {

    const navigate = useNavigate();
    

    const images = [
        {
            src: `${process.env.PUBLIC_URL}/images/onboarding-cover.jpeg`,
            className: "image-style-two"
        },
        {
            src: `${process.env.PUBLIC_URL}/images/meditating-girl.jpg`,
            className: "image-style-two"
        },
        {
            src: `${process.env.PUBLIC_URL}/images/girl-thinking.jpg`,
            className: "image-style-two"
        }
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSkip = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        navigate('/');
      };
      
      const handleSignup = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        navigate('/signup');
      };

    useEffect(() => {
        const interval = setInterval(() => {
          handleNext();
        }, 3000); // rotate every 3 seconds
    
        return () => clearInterval(interval); // cleanup on unmount
      }, []);

    return (
        <div className="onboarding-page">
            <div className="carousel">
            <img
                className={`${images[currentIndex].className}`}
                src={images[currentIndex].src}
                alt={`Onboarding ${currentIndex + 1}`}
            />
            </div>
            <div className="green-bar">
                <h1 className="onboarding-title">Find your balance</h1>
                <p className="onboarding-body">Discover new ways to practice mindful techniques at your fingertips</p>
                <div className="carousel-indicators">
                    {images.map((_, index) => (
                        <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                    </div>
                <div className="login-signup-container">
                    <button className="login-button" onClick={handleSignup}>Sign Up</button>
                    <button className="signup-button" onClick={handleSkip}>Skip</button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;