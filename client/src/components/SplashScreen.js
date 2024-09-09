import React, { useEffect, useState } from 'react';

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

export default SplashScreen;