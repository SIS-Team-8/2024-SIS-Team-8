import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import { Link, useLocation } from "react-router-dom";
import './History.css';

const translations = {
    English: {
        previous: "Previous", next: "Next", goHome: "Go Home", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], chart: {
            xLabels: ["Angry", "Sad", "Happy", "Bored", "Scared"],
            xAxisLabel: "Emotions",
            yAxisLabel: "Frequency",
            tooltipText: "Frequency"
        },
        viewToggle: {
            monthly: "Switch to Weekly View",
            weekly: "Switch to Yearly View",
            yearly: "Switch to Monthly View"
        },
        navigation: {
            prevWeek: "Previous Week",
            nextWeek: "Next Week",
            prevYear: "Previous Year",
            nextYear: "Next Year"
        }
    },
    Spanish: {
        previous: "Anterior", next: "Siguiente", goHome: "Volver al Inicio", months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], chart: {
            xLabels: ["Enfadado", "Triste", "Feliz", "Aburrido", "Asustado"],
            xAxisLabel: "Emociones",
            yAxisLabel: "Frecuencia",
            tooltipText: "Frecuencia"
        },
        viewToggle: {
            monthly: "Cambiar a Vista Semanal",
            weekly: "Cambiar a Vista Anual",
            yearly: "Cambiar a Vista Mensual"
        },
        navigation: {
            prevWeek: "Semana Anterior",
            nextWeek: "Próxima Semana",
            prevYear: "Año Anterior",
            nextYear: "Próximo Año"
        }
    },
    German: {
        previous: "Vorherige", next: "Nächste", goHome: "Zur Startseite", months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], chart: {
            xLabels: ["Wütend", "Traurig", "Glücklich", "Langweilig", "Erschrocken"],
            xAxisLabel: "Emotionen",
            yAxisLabel: "Häufigkeit",
            tooltipText: "Häufigkeit"
        },
        viewToggle: {
            monthly: "Zur Wochenansicht wechseln",
            weekly: "Zur Jahresansicht wechseln",
            yearly: "Zur Monatsansicht wechseln"
        },
        navigation: {
            prevWeek: "Vorherige Woche",
            nextWeek: "Nächste Woche",
            prevYear: "Vorheriges Jahr",
            nextYear: "Nächstes Jahr"
        }
    },
    French: {
        previous: "Précédente", next: "Suivante", goHome: "Retour à l'accueil", months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], chart: {
            xLabels: ["En colère", "Triste", "Heureux", "Ennuyé", "Effrayé"],
            xAxisLabel: "Émotions",
            yAxisLabel: "Fréquence",
            tooltipText: "Fréquence"
        },
        viewToggle: {
            monthly: "Passer à la vue hebdomadaire",
            weekly: "Passer à la vue annuelle",
            yearly: "Passer à la vue mensuelle"
        },
        navigation: {
            prevWeek: "Semaine Précédente",
            nextWeek: "Semaine Suivante",
            prevYear: "Année Précédente",
            nextYear: "Année Suivante"
        }
    },
    Chinese: {
        previous: "前一个", next: "下一个", goHome: "回到主页", months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], chart: {
            xLabels: ["生气", "悲伤", "快乐", "无聊", "害怕"],
            xAxisLabel: "情绪",
            yAxisLabel: "频率",
            tooltipText: "频率"
        },
        viewToggle: {
            monthly: "切换到每周视图",
            weekly: "切换到年度视图",
            yearly: "切换到每月视图"
        },
        navigation: {
            prevWeek: "上一周",
            nextWeek: "下一周",
            prevYear: "上一年",
            nextYear: "下一年"
        }
    }
};

export default function History({theme, language}) {
    const location = useLocation();
    const initialMonth = location.state?.month || new Date();

    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [viewMode, setViewMode] = useState("monthly");
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentYear, setCurrentYear] = useState(currentMonth.getFullYear());

    const t = translations[language];

    useEffect(() => {
        if (location.state?.month) {
            setCurrentMonth(location.state.month);
        }
    }, [location.state?.month]);

    const toggleViewMode = () => {
        const viewModes = { monthly: "weekly", weekly: "yearly", yearly: "monthly" };
        const nextMode = viewModes[viewMode];
        setViewMode(nextMode);

        if (nextMode === "yearly") {
            setCurrentYear(currentMonth.getFullYear());
        } else if (nextMode === "weekly") {
            setCurrentWeek(1);
        }
    };

    const changeMonth = (direction) => {
        if (viewMode === "yearly") {
            setCurrentYear((prevYear) => prevYear + direction);
        } else {
            const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
            setCurrentMonth(newMonth);
        }
    };

    const changeWeek = (direction) => {
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const weeksInMonth = Math.ceil(daysInMonth / 7);
        const nextWeek = currentWeek + direction;

        setCurrentWeek(nextWeek < 1 ? weeksInMonth : nextWeek > weeksInMonth ? 1 : nextWeek);
    };

    const getHeading = () => {
        if (viewMode === "weekly") {
            const startOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), (currentWeek - 1) * 7 + 1);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
        }

        if (viewMode === "yearly") {
            return currentYear.toString();
        }

        return currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
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
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <button className="view-toggle-button" onClick={toggleViewMode}>
                    {t.viewToggle[viewMode]}
                </button>
            </div>

            <div id="interval-navigation">
                {viewMode === "monthly" && (
                    <>
                        <button onClick={() => changeMonth(-1)}>{t.previous}</button>
                        <h2>{getHeading()}</h2>
                        <button onClick={() => changeMonth(1)}>{t.next}</button>
                    </>
                )}
                {viewMode === "weekly" && (
                    <>
                        <button onClick={() => changeWeek(-1)}>{t.navigation.prevWeek}</button>
                        <h2>{getHeading()}</h2>
                        <button onClick={() => changeWeek(1)}>{t.navigation.nextWeek}</button>
                    </>
                )}
                {viewMode === "yearly" && (
                    <>
                        <button onClick={() => changeMonth(-1)}>{t.navigation.prevYear}</button>
                        <h2>{getHeading()}</h2>
                        <button onClick={() => changeMonth(1)}>{t.navigation.nextYear}</button>
                    </>
                )}
            </div>

            <BarChart
                data={chartData}
                xAxisLabel={t.chart.xAxisLabel}
                yAxisLabel={t.chart.yAxisLabel}
                tooltipText={t.chart.tooltipText}
                barColors={["#ff746c", "#b3ebf2", "#ffee8c", "grey", "#6c3baa"]}
                language={language}
                theme={theme}
            />

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">{t.goHome}</button>
                </Link>
            </div>
        </div>
    );
}