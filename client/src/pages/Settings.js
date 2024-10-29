import React from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const translations = {
    English: {
        title: "Settings",
        theme: "Theme Options",
        light: "Light Mode",
        dark: "Dark Mode",
        language: "Language Preferences",
        homePage: "Go Home",
        languages: {
            English: "English",
            Spanish: "Español",
            German: "Deutsch",
            French: "Français",
            Chinese: "中文"
        }
    },
    Spanish: {
        title: "Configuración",
        theme: "Opciones de Tema",
        light: "Modo Claro",
        dark: "Modo Oscuro",
        language: "Preferencias de Idioma",
        homePage: "Ir a Inicio",
        languages: {
            English: "English",
            Spanish: "Español",
            German: "Deutsch",
            French: "Français",
            Chinese: "中文"
        }
    },
    German: {
        title: "Einstellungen",
        theme: "Themenoptionen",
        light: "Heller Modus",
        dark: "Dunkler Modus",
        language: "Spracheinstellungen",
        homePage: "Zur Startseite",
        languages: {
            English: "English",
            Spanish: "Español",
            German: "Deutsch",
            French: "Français",
            Chinese: "中文"
        }
    },
    French: {
        title: "Paramètres",
        theme: "Options de thème",
        light: "Mode clair",
        dark: "Mode sombre",
        language: "Préférences linguistiques",
        homePage: "Aller à l'accueil",
        languages: {
            English: "English",
            Spanish: "Español",
            German: "Deutsch",
            French: "Français",
            Chinese: "中文"
        }
    },
    Chinese: {
        title: "设置",
        theme: "主题选项",
        light: "亮模式",
        dark: "暗模式",
        language: "语言偏好",
        homePage: "回到主页",
        languages: {
            English: "English",
            Spanish: "Español",
            German: "Deutsch",
            French: "Français",
            Chinese: "中文"
        }
    }
};

const Settings = ({ theme, toggleTheme, language, setLanguage }) => {
    const t = translations[language] || translations.English;
    const navigate = useNavigate();

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
    };

    return (
        <div className={`settings-screen ${theme}`}>
            <div className={`settings-container ${theme}`}>
                <h1 className="settings-header">{t.title}</h1>

                <div className="setting-group">
                    <h2>{t.theme}</h2>
                    <div className="options-group">
                        <label className="switch">
                            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                            <span className="slider round"></span>
                        </label>
                        <span>{theme === 'light' ? t.light : t.dark}</span>
                    </div>
                </div>

                <div className="setting-group">
                    <h2>{t.language}</h2>
                    <div className="options-group">
                        <select value={language} onChange={handleLanguageChange}>
                        {Object.keys(translations).map((langKey) => (
                                <option key={langKey} value={langKey}>
                                    {t.languages[langKey]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="center-button">
                    <button className="home-button" onClick={() => navigate('/')}>{t.homePage}</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;