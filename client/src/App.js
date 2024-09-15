import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './App.css';
import SplashScreen from './components/SplashScreen';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate a loading process (e.g., data fetching) for 3 seconds.
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 3000);

        // Clean up timer.
        return () => clearTimeout(timer);
    }, []);

    if (!isLoaded) {
        return <SplashScreen />;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
            </header>
        </div>
    );
}

export default App;