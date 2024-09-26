import React, { useState } from 'react';
import BarChart from '../components/BarChart';
import { Link } from "react-router-dom";
import './History.css';

const translations = {
    English: { history: "History", previous: "Previous", next: "Next", goHome: "Go Home" },
    Spanish: { history: "Historial", previous: "Anterior", next: "Siguiente", goHome: "Volver al Inicio" },
    German: { history: "Verlauf", previous: "Vorherige", next: "Nächste", goHome: "Zur Startseite" },
    French: { history: "Historique", previous: "Précédente", next: "Suivante", goHome: "Retour à l'accueil" },
    Chinese: { history: "历史", previous: "前一个", next: "下一个", goHome: "回到主页" }
};

export default function History({theme, language}) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8));
    const t = translations[language];

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    return (
        <div id="history-container ${theme}">
            <h1>History</h1>
            <div id="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>
            <BarChart/>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">Go Home</button>
                </Link>
            </div>
        </div>
    );
}