
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Mood } from './pages/Mood';

import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './App.css';
import SplashScreen from './components/SplashScreen';
import styles from './pages/pages.module.css';


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
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Login />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/mood" element={<Mood/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;