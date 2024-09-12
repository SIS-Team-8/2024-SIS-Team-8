import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './App.css';

import SplashScreen from './pages/SplashScreen';
import Navbar from "./components/Navbar";
import DailyView from "./pages/DailyView";
import Calendar from "./pages/Calendar";
import Help from "./pages/Help";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import { Route, Routes } from "react-router-dom";

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
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/daily-view" element={<DailyView />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/help" element={<Help />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );

    function Home() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Welcome!</h1>
                </header>
            </div>
        );
    }

    function NotFound() {
        return <h2>404: Page Not Found</h2>;
    }
}

export default App;