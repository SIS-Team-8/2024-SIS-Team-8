import React, { useState, useEffect } from 'react';
import './settings.css'; // Import the corresponding CSS file
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
        managePermissions: "Manage Permissions",
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
        managePermissions: "Gestionar Permisos",
        homePage: "Página Principal"
    },
    German: {
        title: "Einstellungen Bildschirm",
        reminder: "Erinnerungshäufigkeit",
        theme: "Themenoptionen",
        light: "Heller Modus",
        dark: "Dunkler Modus",
        language: "Spracheinstellungen",
        privacy: "Datenschutzeinstellungen",
        dataExport: "Daten exportieren",
        deleteAccount: "Konto löschen",
        disableTracking: "Verfolgung deaktivieren",
        managePermissions: "Berechtigungen verwalten",
        homePage: "Startseite"
    },
    French: {
        title: "Écran des paramètres",
        reminder: "Fréquence des rappels",
        theme: "Options de thème",
        light: "Mode clair",
        dark: "Mode sombre",
        language: "Préférences linguistiques",
        privacy: "Paramètres de confidentialité",
        dataExport: "Exporter des données",
        deleteAccount: "Supprimer le compte",
        disableTracking: "Désactiver le suivi",
        managePermissions: "Gérer les autorisations",
        homePage: "Page d'accueil"
    },
    Chinese: {
        title: "设置屏幕",
        reminder: "提醒频率",
        theme: "主题选项",
        light: "亮模式",
        dark: "暗模式",
        language: "语言偏好",
        privacy: "隐私设置",
        dataExport: "导出数据",
        deleteAccount: "删除账户",
        disableTracking: "禁用跟踪",
        managePermissions: "管理权限",
        homePage: "主页"
    }
};

const Settings = () => {
    const [reminderFrequency, setReminderFrequency] = useState([]);
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('English');
    const [privacySettings, setPrivacySettings] = useState({
        dataExport: false,
        deleteAccount: false,
        disableTracking: false,
        managePermissions: false
    });
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setReminderFrequency((prev) =>
            checked ? [...prev, value] : prev.filter((freq) => freq !== value)
        );
    };

    const handleThemeChange = (event) => {
        const newTheme = event.target.value;
        setTheme(newTheme);
        document.body.className = newTheme;
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const t = translations[language]; // Get the translations based on selected language

    return (
        <div className="settings-screen">
            <h1>{t.title}</h1>

            {/* Reminder Frequency */}
            <div className="setting-group">
                <h2>{t.reminder}</h2>
                <div className="options-group">
                    <label>
                        <input
                            type="checkbox"
                            value="Daily"
                            onChange={handleCheckboxChange}
                            checked={reminderFrequency.includes('Daily')}
                        />
                        {t.daily || "Daily"}
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Weekly"
                            onChange={handleCheckboxChange}
                            checked={reminderFrequency.includes('Weekly')}
                        />
                        {t.weekly || "Weekly"}
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Monthly"
                            onChange={handleCheckboxChange}
                            checked={reminderFrequency.includes('Monthly')}
                        />
                        {t.monthly || "Monthly"}
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Custom"
                            onChange={handleCheckboxChange}
                            checked={reminderFrequency.includes('Custom')}
                        />
                        {t.custom || "Custom"}
                    </label>
                </div>
            </div>

            {/* Theme Options */}
            <div className="setting-group">
                <h2>{t.theme}</h2>
                <div className="options-group">
                    <label>
                        <input
                            type="radio"
                            value="light"
                            name="theme"
                            onChange={handleThemeChange}
                            checked={theme === 'light'}
                        />
                        {t.light}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="dark"
                            name="theme"
                            onChange={handleThemeChange}
                            checked={theme === 'dark'}
                        />
                        {t.dark}
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
                        <option value="German">German</option>
                        <option value="French">French</option>
                        <option value="Chinese">Chinese</option>
                    </select>
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="setting-group">
                <h2>{t.privacy}</h2>
                <div className="privacy-buttons-group">
                    <button className="privacy-button" onClick={() => alert(t.dataExport)}>
                        {t.dataExport}
                    </button>
                    <button className="privacy-button delete-button" onClick={() => alert(t.deleteAccount)}>
                        {t.deleteAccount}
                    </button>
                    <button className="privacy-button" onClick={() => alert(t.disableTracking)}>
                        {t.disableTracking}
                    </button>
                    <button className="privacy-button" onClick={() => alert(t.managePermissions)}>
                        {t.managePermissions}
                    </button>
                </div>
            </div>

            {/* Home Page Button */}
            <div className="center-button">
                <button className="home-button" onClick={() => navigate('/')}>
                    {t.homePage}
                </button>
            </div>
        </div>
    );
};

export default Settings;
