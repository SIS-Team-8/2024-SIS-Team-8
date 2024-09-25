import React, { useState } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const translations = {
    English: {
        title: "Settings",
        reminder: "Frequency of Reminders",
        theme: "Theme Options",
        light: "Light Mode",
        dark: "Dark Mode",
        language: "Language Preferences",
        privacy: "Privacy Settings",
        dataExport: "Data Export",
        deleteAccount: "Delete Account",
        disableTracking: "Disable Tracking",
        homePage: "Go Home",
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        custom: "Custom"
    },
    Spanish: {
        title: "Configuración",
        reminder: "Frecuencia de Recordatorios",
        theme: "Opciones de Tema",
        light: "Modo Claro",
        dark: "Modo Oscuro",
        language: "Preferencias de Idioma",
        privacy: "Configuración de Privacidad",
        dataExport: "Exportar Datos",
        deleteAccount: "Eliminar Cuenta",
        disableTracking: "Deshabilitar Seguimiento",
        homePage: "Ir a Inicio",
        daily: "Diario",
        weekly: "Semanal",
        monthly: "Mensual",
        custom: "Personalizado"
    }
};

const Settings = ({ theme, toggleTheme }) => { // Accept theme and toggleTheme as props
    const [reminderFrequency, setReminderFrequency] = useState('');
    const [language, setLanguage] = useState('English');
    const navigate = useNavigate();

    const handleToggleButtonClick = (frequency) => {
        setReminderFrequency((prev) => (prev === frequency ? '' : frequency));
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

                    <div className="toggle-buttons-group">
                        <button className={`toggle-button ${reminderFrequency === 'Daily' ? 'selected' : ''}`} onClick={() => handleToggleButtonClick('Daily')}>{t.daily}</button>
                        <button className={`toggle-button ${reminderFrequency === 'Weekly' ? 'selected' : ''}`} onClick={() => handleToggleButtonClick('Weekly')}>{t.weekly}</button>
                        <button className={`toggle-button ${reminderFrequency === 'Monthly' ? 'selected' : ''}`} onClick={() => handleToggleButtonClick('Monthly')}>{t.monthly}</button>
                        <button className={`toggle-button ${reminderFrequency === 'Custom' ? 'selected' : ''}`} onClick={() => handleToggleButtonClick('Custom')}>{t.custom}</button>
                    </div>
                </div>

                {/* Theme Options */}
                <div className="setting-group">
                    <h2>{t.theme}</h2>

                    <div className="options-group">
                        <label className="switch">
                            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} /> {/* Use toggleTheme */}
                            <span className="slider round"></span>
                        </label>
                        <span>{theme === 'light' ? t.light : t.dark}</span>
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
                        <button className="privacy-button" id="delete-button" onClick={() => alert(t.deleteAccount)}>{t.deleteAccount}</button>
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
