
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Mood } from './pages/Mood';

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from './assets/logo.png';
import dizzy from './assets/face-with-spiral-eyes.svg';
import './App.css';
<<<<<<< HEAD
import SplashScreen from './components/SplashScreen';
import styles from './pages/pages.module.css';

=======

import SplashScreen from './pages/SplashScreen';
import Navbar from "./components/Navbar";
import DailyView from "./pages/DailyView";
import Calendar from "./pages/Calendar";
import Help from "./pages/Help";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import { Route, Routes } from "react-router-dom";
>>>>>>> andreas/home-screen

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
<<<<<<< HEAD
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Login />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/mood" element={<Mood/>}/>
                </Routes>
            </BrowserRouter>
=======
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
>>>>>>> andreas/home-screen
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

                    <Link to="/">
                        <button id="error-button" class="noselect">Go Home</button>
                    </Link>
                </header>
            </div>
        );
    }
}

export default App;