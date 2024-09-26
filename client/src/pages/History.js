import React, { useState } from 'react';
import BarChart from '../components/BarChart';
import { Link } from "react-router-dom";
import './History.css';

const translations = {
    English: { history: "History", previous: "Previous", next: "Next", goHome: "Go Home", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
    Spanish: { history: "Historial", previous: "Anterior", next: "Siguiente", goHome: "Volver al Inicio", months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] },
    German: { history: "Verlauf", previous: "Vorherige", next: "Nächste", goHome: "Zur Startseite", months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"] },
    French: { history: "Historique", previous: "Précédente", next: "Suivante", goHome: "Retour à l'accueil", months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"] },
    Chinese: { history: "历史", previous: "前一个", next: "下一个", goHome: "回到主页", months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"] }
};

export default function History({theme, language}) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8));
    const t = translations[language];

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    return (
        <div id="history-container" className={theme}>
            <h1>History</h1>
            <div id="month-navigation">
                <button onClick={() => changeMonth(-1)}>{t.previous}</button>
                <h2>{`${t.months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => changeMonth(1)}>{t.next}</button>
            </div>
            <BarChart/>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">{t.goHome}</button>
                </Link>
            </div>
        </div>
    );
}