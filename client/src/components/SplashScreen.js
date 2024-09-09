import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const SplashScreen = () => {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Set a timer to hide the splash screen after 3 seconds.
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        // Clean up the timer.
        return () => clearTimeout(timer);
    }, []);

    // Make sure the splash screen doesn't render after the timer ends.
    if (!showSplash) {
        return null;
    }

    return (
        <div style={splashStyle}>
            <h1>EmoteLog</h1>
            <img src={logo} alt="App Logo" style={logoStyle} />
            <p>Loading...</p>
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
};

const logoStyle = {
    width: '150px',
    marginBottom: '20px',
};

export default SplashScreen;