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
import MoodSelection from "./pages/MoodSelection";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { Route, Routes } from "react-router-dom";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        
        const timer = setTimeout(() => {
            setIsLoaded(true);

            if (!isAuthenticated && location.pathname !== "/sign-up") {
                navigate("/login");
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [isAuthenticated, navigate, location, theme]);

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate("/");
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/login");
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    if (!isLoaded) {
        return <SplashScreen />;
    }

    return (
        <div className="App">
            {isAuthenticated && <Navbar onLogout={handleLogout} />}

            <Routes>
                <Route path="/" element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
                <Route path="/daily-view/:date" element={isAuthenticated ? <DailyView /> : <Login onLogin={handleLogin} />} />
                <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Login onLogin={handleLogin} />} />
                <Route path="/help" element={isAuthenticated ? <Help /> : <Login onLogin={handleLogin} />} />
                <Route path="/history" element={isAuthenticated ? <History /> : <Login onLogin={handleLogin} />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login onLogin={handleLogin} />} />
                <Route path="/settings" element={isAuthenticated ? <Settings /> : <Login onLogin={handleLogin} />} />
                <Route path="/mood-selection" element={isAuthenticated ? <MoodSelection /> : <Login onLogin={handleLogin} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );

    function Home() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 class="noselect">Welcome!</h1>

                    <Link to="/mood-selection">
                        <button id="mood-selection" class="noselect">Log Daily Emotion</button>
                    </Link>
                </header>
            </div>
        );
    }

    function NotFound() {
        return (
            <div>
                <header className="App-header">
                    <img src={dizzy} className="App-logo" alt="dizzy" />
                    <h2 class="noselect">404: Page Not Found</h2>

                    <Link to="/login">
                        <button id="error-button" class="noselect">Go to Login</button>
                    </Link>
                </header>
            </div>
        );
    }
}

export default App;