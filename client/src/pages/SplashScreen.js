import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const SplashScreen = () => {
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

    return (
        <div style={splashStyle} className={fadeOut ? 'fadeOut' : ''}>
            <h1 class="noselect">EmoteLog</h1>
            <img src={logo} alt="App Logo" style={logoStyle} />
        </div>
    );
};

const splashStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    backgroundColor: '#189AB4',
    color: 'white',
    fontFamily: 'Poppins',
};

const logoStyle = {
    width: '150px',
    marginBottom: '20px',
};

export default SplashScreen;