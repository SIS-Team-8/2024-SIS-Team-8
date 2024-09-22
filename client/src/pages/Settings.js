import React, { useState } from 'react';
import './settings.css'; // Import the corresponding CSS file
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [reminderFrequency, setReminderFrequency] = useState([]);
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('English');

    const navigate = useNavigate();

    // Handle checkbox change for reminder frequency
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setReminderFrequency((prev) =>
            checked ? [...prev, value] : prev.filter((freq) => freq !== value)
        );
    };

    // Handle theme change (light or dark mode)
    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    // Handle language change
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <div className="settings-screen">
            <h1>Settings Screen</h1>

            {/* Reminder Frequency */}
            <div className="setting-group">
                <h2>Frequency of Reminders</h2>
                <div className="options-group">
                    <label>
                        <input
                            type="checkbox"
                            value="Daily"
                            onChange={handleCheckboxChange}
                            checked={reminderFrequency.includes('Daily')}
                        />
                        Daily
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Weekly"
                            onChange={handleCheckboxChange}
                            checked={reminderFrequency.includes('Weekly')}
                        />
                        Weekly
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Monthly"
                            onChange={handleCheckboxChange}
                            checked={reminderFrequency.includes('Monthly')}
                        />
                        Monthly
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Custom"
                            onChange={handleCheckboxChange}
                            checked={reminderFrequency.includes('Custom')}
                        />
                        Custom
                    </label>
                </div>
            </div>

            {/* Theme Options */}
            <div className="setting-group">
                <h2>Theme Options</h2>
                <div className="options-group">
                    <label>
                        <input
                            type="radio"
                            value="light"
                            name="theme"
                            onChange={handleThemeChange}
                            checked={theme === 'light'}
                        />
                        Light Mode
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="dark"
                            name="theme"
                            onChange={handleThemeChange}
                            checked={theme === 'dark'}
                        />
                        Dark Mode
                    </label>
                </div>
            </div>

            {/* Language Preferences */}
            <div className="setting-group">
                <h2>Language Preferences</h2>
                <div className="options-group">
                    <select value={language} onChange={handleLanguageChange}>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="setting-group">
                <h2>Privacy Settings</h2>
                <div className="options-group">
                    <button
                        className="privacy-button"
                        onClick={() => alert('Exporting data...')}
                    >
                        Data Export
                    </button>
                    <button
                        className="privacy-button delete-button"
                        onClick={() => alert('Deleting account...')}
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Home Page Button */}
            <button className="home-button" onClick={() => navigate('/')}>
                Home Page
            </button>
        </div>
    );
};

export default Settings;
