import React, { useState } from 'react';
import BarChart from '../components/BarChart';
import { Link } from "react-router-dom";
import './History.css';

const translations = {
    English: { history: "History", previous: "Previous", next: "Next", goHome: "Go Home", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], chart: {
        xLabels: ["Angry", "Sad", "Happy", "Bored", "Scared"],
        xAxisLabel: "Emotions",
        yAxisLabel: "Frequency",
        tooltipText: "Frequency"
    }},
    Spanish: { history: "Historial", previous: "Anterior", next: "Siguiente", goHome: "Volver al Inicio", months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], chart: {
        xLabels: ["Enfadado", "Triste", "Feliz", "Aburrido", "Asustado"],
        xAxisLabel: "Emociones",
        yAxisLabel: "Frecuencia",
        tooltipText: "Frecuencia"
    }},
    German: { history: "Verlauf", previous: "Vorherige", next: "Nächste", goHome: "Zur Startseite", months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], chart: {
        xLabels: ["Wütend", "Traurig", "Glücklich", "Langweilig", "Erschrocken"],
        xAxisLabel: "Emotionen",
        yAxisLabel: "Häufigkeit",
        tooltipText: "Häufigkeit"
    } },
    French: { history: "Historique", previous: "Précédente", next: "Suivante", goHome: "Retour à l'accueil", months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], chart: {
        xLabels: ["En colère", "Triste", "Heureux", "Ennuyé", "Effrayé"],
        xAxisLabel: "Émotions",
        yAxisLabel: "Fréquence",
        tooltipText: "Fréquence"
    } },
    Chinese: { history: "历史", previous: "前一个", next: "下一个", goHome: "回到主页", months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], chart: {
        xLabels: ["生气", "悲伤", "快乐", "无聊", "害怕"],
        xAxisLabel: "情绪",
        yAxisLabel: "频率",
        tooltipText: "频率"
    } }
};

export default function History({theme, language}) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8));
    const t = translations[language];

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    const chartData = [
        { name: t.chart.xLabels[0], emoteFreq: 5 },
        { name: t.chart.xLabels[1], emoteFreq: 5 },
        { name: t.chart.xLabels[2], emoteFreq: 10 },
        { name: t.chart.xLabels[3], emoteFreq: 5 },
        { name: t.chart.xLabels[4], emoteFreq: 5 }
    ];

    return (
        <div id="history-container" className={theme}>
            <h1>{t.history}</h1>
            <div id="month-navigation">
                <button onClick={() => changeMonth(-1)}>{t.previous}</button>
                <h2>{`${t.months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => changeMonth(1)}>{t.next}</button>
            </div>
            <BarChart 
                data={chartData}
                xAxisLabel={t.chart.xAxisLabel}
                yAxisLabel={t.chart.yAxisLabel}
                tooltipText={t.chart.tooltipText}
                barColors={["#ff746c", "#b3ebf2", "#ffee8c", "grey", "#6c3baa"]}
                language={language}
            />
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">{t.goHome}</button>
                </Link>
            </div>
        </div>
    );
}