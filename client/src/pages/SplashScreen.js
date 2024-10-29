import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const SplashScreen = ({ theme }) => {
    const [showSplash, setShowSplash] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Trigger fade-out animation right before the splash screen disappears.
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 1500);

        // Set a timer to hide the splash screen after 3 seconds.
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        // Clean up both timers.
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(timer);
        };
    }, []);

    // Make sure the splash screen doesn't render after the timer ends.
    if (!showSplash) {
        return null;
    }

    const splashStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: theme === 'dark' ? '#0F3D4B' : '#189AB4', // Dark background for dark mode
        color: 'white',
        fontFamily: 'Poppins',
    };

    return (
        <div style={splashStyle} className={fadeOut ? 'fadeOut' : ''}>
            <h1 className="noselect">EmoteLog</h1>
            <img src={logo} alt="App Logo" style={logoStyle} />
        </div>
    );
};

const logoStyle = {
    width: '150px',
    marginBottom: '20px',
};

export default SplashScreen;