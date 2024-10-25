import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from './assets/logo.png';
import dizzy from './assets/face-with-spiral-eyes.svg';
import './App.css';

import SplashScreen from "./pages/SplashScreen";
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
import Onboarding from "./pages/Onboarding";
import OnboardingOverview from "./pages/OnboardingOverview";
import EditEntry from "./pages/EditEntry";

import { Route, Routes } from "react-router-dom";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');
    const [moodData, setMoodData] = useState({
       /* "2024-10-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
        "2024-10-02": { mood: "happy", intensity: 4, notes: "Good day." },
        "2024-10-03": { mood: "neutral", intensity: 3, notes: "An average day." },
        "2024-10-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
        "2024-10-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." } */
    });

    const [moodEntries, setMoodEntries] = useState({});

    const handleMoodUpdate = (date, { mood, note }) => {
        setMoodData(prev => ({
            ...prev,
            [date]: { mood, notes: note }
        }));
    };

    /*const handleMoodUpdate2 = (date, newMoodData) => {
        setMoodData(prevMoodData => ({
            ...prevMoodData,
            [date]: newMoodData  // Update the mood data for the given date
        }));
    };*/

    // Function to add or update a mood entry
    const handleMoodUpdate2 = (date, moodData) => {
        setMoodEntries(prevEntries => ({
            ...prevEntries,
            [date]: moodData
        }));
    };



    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.body.classList.remove('light', 'dark'); // Remove any existing theme class
        document.body.classList.add(theme);  // Add the new theme class
        localStorage.setItem('theme', theme);  // Persist the theme in localStorage
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language); // Save language to localStorage for persistence
    }, [language]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);

            if (!isAuthenticated && location.pathname !== "/sign-up") {
                navigate("/login");
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [isAuthenticated, navigate, location]);

    const updateEntry = (date, newEntry) => {
        setMoodData(prevData => ({
            ...prevData,
            [date]: newEntry
        }));
    };

    // Function to delete an entry
    const deleteEntry = (date) => {
        setMoodData(prevData => {
            const newData = { ...prevData };
            delete newData[date];
            return newData;
        });
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
        if (!hasCompletedOnboarding) {
            navigate("/onboarding");
        } else {
            navigate("/");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/login");
    };

    const handleOnboardingComplete = () => {
        localStorage.setItem("hasCompletedOnboarding", true);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage); // Persist language setting in localStorage
    };

    if (!isLoaded) {
        return <SplashScreen theme={theme} />;
    }

    return (
        <div className="App">
            {isAuthenticated && <Navbar onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} language={language} onLanguageChange={handleLanguageChange} />}

            <Routes>
                <Route path="/" element={isAuthenticated ? <Home /> : <Login language={language} theme={theme} onLogin={handleLogin} />} />
                <Route path="/onboarding" element={isAuthenticated ? <Onboarding onComplete={handleOnboardingComplete}/> : <Login onLogin={handleLogin} />} />
                <Route path="/onboarding-overview" element={isAuthenticated ? <OnboardingOverview/> : <Login onLogin={handleLogin} />} />
                <Route path="/settings" element={<Settings theme={theme} toggleTheme={toggleTheme} language={language} setLanguage={handleLanguageChange} />} />
                <Route path="/daily-view/:date" element={isAuthenticated ? <DailyView theme={theme} language={language} moodData={moodData} updateEntry={updateEntry} deleteEntry={deleteEntry} /> : <Login onLogin={handleLogin} />} />
                <Route path="/calendar" element={isAuthenticated ? <Calendar theme={theme} language={language} moodData={moodData} moodEntries={moodEntries} /> : <Login onLogin={handleLogin} />} />
                <Route path="/help" element={isAuthenticated ? <Help theme={theme} language={language} /> : <Login onLogin={handleLogin} />} />
                <Route path="/history" element={isAuthenticated ? <History theme={theme} language={language} /> : <Login onLogin={handleLogin} />} />
                <Route path="/profile" element={isAuthenticated ? <Profile theme={theme} language={language} /> : <Login onLogin={handleLogin} />} />
                <Route path="/settings" element={isAuthenticated ? <Settings theme={theme} toggleTheme={toggleTheme} language={language} setLanguage={handleLanguageChange} /> : <Login onLogin={handleLogin} />} />
                <Route path="/mood-selection" element={isAuthenticated ? <MoodSelection theme={theme} toggleTheme={toggleTheme} language={language} setLanguage={handleLanguageChange} onMoodUpdate={handleMoodUpdate2} moodData={moodData}  /> : <Login onLogin={handleLogin} />} />
                <Route path="/login" element={<Login language={language} theme={theme} onLogin={handleLogin} />} />
                <Route path="/sign-up" element={<SignUp language={language} theme={theme} />} />
                <Route path="/edit-entry/:date" element={isAuthenticated ? <EditEntry theme={theme} toggleTheme={toggleTheme} language={language} setLanguage={handleLanguageChange} onMoodUpdate={updateEntry} moodData={moodData}/> : <Login onLogin={handleLogin} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );

    function Home() {
        const translations = {
            English: { welcome: "Welcome!", log: "Log Daily Emotion" },
            Spanish: { welcome: "¡Bienvenido!", log: "Registrar emoción diaria" },
            German: { welcome: "Willkommen!", log: "Tägliche Emotion aufzeichnen" },
            French: { welcome: "Bienvenue!", log: "Enregistrer l'émotion quotidienne" },
            Chinese: { welcome: "欢迎！", log: "记录每日情绪" }
        };

        const t = translations[language];

        return (
            <div className={`home-screen ${theme}`}>
                <header className={`App-header ${theme}`}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 class="noselect">{t.welcome}</h1>

                    <Link to="/mood-selection">
                        <button id="mood-selection" className={`noselect ${theme}`}>{t.log}</button>
                    </Link>
                </header>
            </div>
        );
    }

    function NotFound() {
        const translations = {
            English: { notFound: "404: Page Not Found", goHome: "Go to Login" },
            Spanish: { notFound: "404: Página no encontrada", goHome: "Ir al inicio de sesión" },
            German: { notFound: "404: Seite nicht gefunden", goHome: "Zur Anmeldung" },
            French: { notFound: "404: Page non trouvée", goHome: "Aller à la connexion" },
            Chinese: { notFound: "404：页面未找到", goHome: "转到登录" }
        };

        const t = translations[language];

        return (
            <div className={`home-screen ${theme}`}>
                <header className={`App-header ${theme}`}>
                    <img src={dizzy} className="App-logo" alt="dizzy" />
                    <h2 class="noselect">{t.notFound}</h2>

                    <Link to="/login">
                        <button id="error-button" class={`noselect ${theme}`}>{t.goHome}</button>
                    </Link>
                </header>
            </div>
        );
    }
}

export default App;