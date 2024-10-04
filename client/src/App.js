import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from './assets/logo.png';
import dizzy from './assets/face-with-spiral-eyes.svg';
import './App.css';

import SplashScreen from './pages/SplashScreen';
import Navbar from "./components/Navbar";
import DailyView from "./pages/DailyView";
import Calendar from "./pages/Calendar";
import Help from "./pages/Help";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MoodSelection from "./pages/MoodSelection"; // Assuming this page is handling moods
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { Route, Routes } from "react-router-dom";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Splash screen loader
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);

            if (!isAuthenticated && location.pathname !== "/sign-up") {
                navigate("/login");
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [isAuthenticated, navigate, location]);

    // Handle login and logout
    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate("/");
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/login");
    };

    // Splash screen during load
    if (!isLoaded) {
        return <SplashScreen />;
    }

    return (
        <div className="App">
            {isAuthenticated && <Navbar onLogout={handleLogout} />}

            <Routes>
                {/* Conditional rendering based on authentication */}
                <Route path="/" element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
                <Route path="/daily-view/:date" element={isAuthenticated ? <DailyView /> : <Login onLogin={handleLogin} />} />
                <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Login onLogin={handleLogin} />} />
                <Route path="/help" element={isAuthenticated ? <Help /> : <Login onLogin={handleLogin} />} />
                <Route path="/history" element={isAuthenticated ? <History /> : <Login onLogin={handleLogin} />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login onLogin={handleLogin} />} />
                <Route path="/settings" element={isAuthenticated ? <Settings /> : <Login onLogin={handleLogin} />} />

                {/* Updated Route for MoodSelection with Date Parameter */}
                <Route path="/mood-selection/:date" element={isAuthenticated ? <MoodSelection /> : <Login onLogin={handleLogin} />} />
                
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );

    // Home Component
    function Home() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="noselect">Welcome!</h1>

                    <Link to="/mood-selection/2024-09-01">
                        <button id="mood-selection" className="noselect">Log Daily Emotion</button>
                    </Link>
                </header>
            </div>
        );
    }

    // 404 Not Found Component
    function NotFound() {
        return (
            <div>
                <header className="App-header">
                    <img src={dizzy} className="App-logo" alt="dizzy" />
                    <h2 className="noselect">404: Page Not Found</h2>

                    <Link to="/login">
                        <button id="error-button" className="noselect">Go to Login</button>
                    </Link>
                </header>
            </div>
        );
    }
}

export default App;
