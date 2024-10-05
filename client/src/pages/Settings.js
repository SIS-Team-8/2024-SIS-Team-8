import React from 'react';
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
        custom: "Custom",
        languages: {
            English: "English",
            Spanish: "Spanish",
            German: "German",
            French: "French",
            Chinese: "Chinese"
        }
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
        custom: "Personalizado",
        languages: {
            English: "Inglés",
            Spanish: "Español",
            German: "Alemán",
            French: "Francés",
            Chinese: "Chino"
        }
    },
    German: {
        title: "Einstellungen",
        reminder: "Erinnerungshäufigkeit",
        theme: "Themenoptionen",
        light: "Heller Modus",
        dark: "Dunkler Modus",
        language: "Spracheinstellungen",
        privacy: "Datenschutzeinstellungen",
        dataExport: "Daten exportieren",
        deleteAccount: "Konto löschen",
        disableTracking: "Tracking deaktivieren",
        homePage: "Zur Startseite",
        daily: "Täglich",
        weekly: "Wöchentlich",
        monthly: "Monatlich",
        custom: "Benutzerdefiniert",
        languages: {
            English: "Englisch",
            Spanish: "Spanisch",
            German: "Deutsch",
            French: "Französisch",
            Chinese: "Chinesisch"
        }
    },
    French: {
        title: "Paramètres",
        reminder: "Fréquence des rappels",
        theme: "Options de thème",
        light: "Mode clair",
        dark: "Mode sombre",
        language: "Préférences linguistiques",
        privacy: "Paramètres de confidentialité",
        dataExport: "Exporter les données",
        deleteAccount: "Supprimer le compte",
        disableTracking: "Désactiver le suivi",
        homePage: "Aller à l'accueil",
        daily: "Quotidien",
        weekly: "Hebdomadaire",
        monthly: "Mensuel",
        custom: "Personnalisé",
        languages: {
            English: "Anglais",
            Spanish: "Espagnol",
            German: "Allemand",
            French: "Français",
            Chinese: "Chinois"
        }
    },
    Chinese: {
        title: "设置",
        reminder: "提醒频率",
        theme: "主题选项",
        light: "亮模式",
        dark: "暗模式",
        language: "语言偏好",
        privacy: "隐私设置",
        dataExport: "导出数据",
        deleteAccount: "删除账户",
        disableTracking: "禁用跟踪",
        homePage: "回到主页",
        daily: "每日",
        weekly: "每周",
        monthly: "每月",
        custom: "自定义",
        languages: {
            English: "英语",
            Spanish: "西班牙语",
            German: "德语",
            French: "法语",
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

                {/* Reminder Frequency */}
                <div className="setting-group">
                    <h2>{t.reminder}</h2>
                    <div className="toggle-buttons-group">
                        <button className="toggle-button">{t.daily}</button>
                        <button className="toggle-button">{t.weekly}</button>
                        <button className="toggle-button">{t.monthly}</button>
                        <button className="toggle-button">{t.custom}</button>
                    </div>
                </div>

                {/* Theme Options */}
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

                {/* Language Preferences */}
                <div className="setting-group">
                    <h2>{t.language}</h2>
                    <div className="options-group">
                        <select value={language} onChange={handleLanguageChange}>
                        {Object.keys(translations).map((langKey) => (
                                <option key={langKey} value={langKey}>
                                    {t.languages[langKey]} {/* Use the translated language names */}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="setting-group">
                    <h2>{t.privacy}</h2>
                    <div className="privacy-buttons-group">
                        <button className="privacy-button">{t.dataExport}</button>
                        <button id="delete-button" className="privacy-button">{t.deleteAccount}</button>
                        <button className="privacy-button">{t.disableTracking}</button>
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