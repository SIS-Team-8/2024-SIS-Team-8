import React, { useState, useEffect } from 'react';
import './Settings.css'; // Import the corresponding CSS file
import { useNavigate } from 'react-router-dom';

const translations = {
    English: {
        title: "Settings Screen",
        reminder: "Frequency of Reminders",
        theme: "Theme Options",
        light: "Light Mode",
        dark: "Dark Mode",
        language: "Language Preferences",
        privacy: "Privacy Settings",
        dataExport: "Data Export",
        deleteAccount: "Delete Account",
        disableTracking: "Disable Tracking",
        homePage: "Home Page"
    },
    Spanish: {
        title: "Pantalla de Configuración",
        reminder: "Frecuencia de Recordatorios",
        theme: "Opciones de Tema",
        light: "Modo Claro",
        dark: "Modo Oscuro",
        language: "Preferencias de Idioma",
        privacy: "Configuración de Privacidad",
        dataExport: "Exportar Datos",
        deleteAccount: "Eliminar Cuenta",
        disableTracking: "Deshabilitar Seguimiento",
        homePage: "Página Principal"
    }
};

const Settings = () => {
    const [reminderFrequency, setReminderFrequency] = useState([]);
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('English');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme; // Apply the theme class to the body
    }, [theme]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setReminderFrequency((prev) =>
            checked ? [...prev, value] : prev.filter((freq) => freq !== value)
        );
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const t = translations[language]; // Fetch translation for the selected language

    return (
        <div className="settings-screen">
            <div className="settings-container">
                <h1 className="settings-header">{t.title}</h1>

                {/* Reminder Frequency */}
                <div className="setting-group">
                    <h2>{t.reminder}</h2>

                    <div className="options-group">
                        <label>
                            <input type="checkbox" value="Daily" onChange={handleCheckboxChange} checked={reminderFrequency.includes('Daily')}/>Daily
                        </label>
                        <label>
                            <input type="checkbox" value="Weekly" onChange={handleCheckboxChange} checked={reminderFrequency.includes('Weekly')}/>Weekly
                        </label>
                        <label>
                            <input type="checkbox" value="Monthly" onChange={handleCheckboxChange} checked={reminderFrequency.includes('Monthly')}/>Monthly
                        </label>
                        <label>
                            <input type="checkbox" value="Custom" onChange={handleCheckboxChange} checked={reminderFrequency.includes('Custom')}/>Custom
                        </label>
                    </div>
                </div>

                {/* Theme Options */}
                <div className="setting-group">
                    <h2>{t.theme}</h2>

                    <div className="options-group">
                        <label className="switch">
                            <input type="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} checked={theme === 'dark'}/>{t.dark}
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                {/* Language Preferences */}
                <div className="setting-group">
                    <h2>{t.language}</h2>

                    <div className="options-group">
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="setting-group">
                    <h2>{t.privacy}</h2>

                    <div className="privacy-buttons-group">
                        <button className="privacy-button" onClick={() => alert(t.dataExport)}>{t.dataExport}</button>
                        <button className="privacy-button delete-button" onClick={() => alert(t.deleteAccount)}>{t.deleteAccount}</button>
                        <button className="privacy-button" onClick={() => alert(t.disableTracking)}>{t.disableTracking}</button>
                    </div>
                </div>

                {/* Home Page Button */}
                <div className="center-button">
                    <button className="home-button" onClick={() => navigate('/')}>{t.homePage}</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;