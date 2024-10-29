import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
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
            monthly: "Switch to Yearly View",
            yearly: "Switch to Monthly View"
        },
        navigation: {
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
            monthly: "Cambiar a Vista Anual",
            yearly: "Cambiar a Vista Mensual"
        },
        navigation: {
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
            monthly: "Zur Jahresansicht wechseln",
            yearly: "Zur Monatsansicht wechseln"
        },
        navigation: {
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
            monthly: "Passer à la vue annuelle",
            yearly: "Passer à la vue mensuelle"
        },
        navigation: {
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
            monthly: "切换到年度视图",
            yearly: "切换到每月视图"
        },
        navigation: {
            prevYear: "上一年",
            nextYear: "下一年"
        }
    }
};

export default function History({data, historyUpdate, theme, language}) {
    const location = useLocation();
    const initialMonth = location.state?.month || new Date();

    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [viewMode, setViewMode] = useState("monthly");
    const [currentYear, setCurrentYear] = useState(currentMonth.getFullYear());

    const [translatedData, setTranslatedData] = useState({});

    const t = translations[language];

    useEffect(() => {
        if (location.state?.month) {
            setCurrentMonth(location.state.month);
        }
    }, [location.state?.month]);

    const toggleViewMode = () => {
        const viewModes = { monthly: "yearly", yearly: "monthly" };
        const nextMode = viewModes[viewMode];
        setViewMode(nextMode);

        if (nextMode === "yearly") {
            setCurrentYear(currentMonth.getFullYear());
        }

        getHistory(nextMode);
    };

    const changeMonth = (direction) => {
        if (viewMode === "yearly") {
            setCurrentYear((prevYear) => prevYear + direction);
        } else {
            const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
            setCurrentMonth(newMonth);
        }

        getHistory(viewMode);
    };

    const getHeading = () => {
        if (viewMode === "yearly") {
            return currentYear.toString();
        }

        const monthName = t.months[currentMonth.getMonth()];
        return `${monthName} ${currentMonth.getFullYear()}`;
    };

    const generateMonthKey = (month, yearChange) => {
        const year = currentMonth.getFullYear() + yearChange;

        if (yearChange === 1) {
            month = 1;
        } else {
            month = month + 1;
        }

        return `${year}-${month < 10 ? '0' : ''}${month}-01`;
    };

    const generateYearKey = (year) => {
        return `${year}-01-01`;
    };

    let defaultEmoteData = [
        {
            name: 'Angry',
            emoteFreq: 0,
        },
        {
            name: 'Sad',
            emoteFreq: 0,
        },
        {
            name: 'Happy',
            emoteFreq: 0,
        },
        {
            name: 'Bored',
            emoteFreq: 0,
        },
        {
            name: 'Scared',
            emoteFreq: 0
        },
    ];

    const getHistory = async (viewMode) => {
        let firstDate = "";
        let secondDate = "";

        try {
            if (viewMode === "monthly") {
                firstDate =  generateMonthKey(currentMonth.getMonth(), 0);

                if (currentMonth.getMonth() === 11) {
                    secondDate = generateMonthKey(currentMonth.getMonth() + 1, 1)
                } else {
                    secondDate = generateMonthKey(currentMonth.getMonth() + 1, 0);
                }
            }

            else if (viewMode === "yearly") {
                firstDate =  generateYearKey(currentYear);
                secondDate = generateYearKey(currentYear + 1);
            }

            const { data } = await axios.post(
                "http://localhost:3000/api/requestHistory",
                {
                    startDate: firstDate,
                    endDate: secondDate
                },
                {}
            );

            for (let i = 0; i < 5; i++) {
                defaultEmoteData[i].emoteFreq = data.emojiCount[i];
            }

            setTranslatedData(defaultEmoteData);
        } catch (error) {
            for (let i = 0; i < 5; i++) {
                defaultEmoteData[i].emoteFreq = 0;
            }

            setTranslatedData(defaultEmoteData);
        }
    }

    useEffect(() => {
        getHistory(viewMode);
    })

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

                {viewMode === "yearly" && (
                    <>
                        <button onClick={() => changeMonth(-1)}>{t.navigation.prevYear}</button>
                        <h2>{getHeading()}</h2>
                        <button onClick={() => changeMonth(1)}>{t.navigation.nextYear}</button>
                    </>
                )}
            </div>

            <BarChart
                xAxisLabel={t.chart.xAxisLabel}
                yAxisLabel={t.chart.yAxisLabel}
                tooltipText={t.chart.tooltipText}
                barColors={["#ff746c", "#b3ebf2", "#ffee8c", "grey", "#6c3baa"]}
                language={language}
                theme={theme}
                data={translatedData}
            />

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">{t.goHome}</button>
                </Link>
            </div>
        </div>
    );
}