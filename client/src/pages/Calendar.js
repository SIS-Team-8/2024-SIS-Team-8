import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Calendar.css';

import angry from '../assets/emoji/angry.png';
import annoyed from '../assets/emoji/annoyed.png';
import frustrated from '../assets/emoji/frustrated.png';
import veryAngry from '../assets/emoji/very-angry.png';
import extremelyAngry from '../assets/emoji/extremely-angry.png';
import sad from '../assets/emoji/sad.png';
import upset from '../assets/emoji/upset.png';
import deflated from '../assets/emoji/deflated.png';
import distressed from '../assets/emoji/distressed.png';
import miserable from '../assets/emoji/miserable.png';
import happy from '../assets/emoji/happy.png';
import veryHappy from '../assets/emoji/very-happy.png';
import extremelyHappy from '../assets/emoji/extremely-happy.png';
import amazinglyHappy from '../assets/emoji/amazingly-happy.png';
import ecstatic from '../assets/emoji/ecstatic.png';
import bored from '../assets/emoji/bored.png';
import exasperated from '../assets/emoji/exasperated.png';
import sarcastic from '../assets/emoji/sarcastic.png';
import tired from '../assets/emoji/tired.png';
import exhausted from '../assets/emoji/exhausted.png';
import scared from '../assets/emoji/scared.png';
import surprised from '../assets/emoji/surprised.png';
import nervous from '../assets/emoji/nervous.png';
import overwhelmed from '../assets/emoji/overwhelmed.png';
import terrified from '../assets/emoji/terrified.png';

const moodEmojiMap = {
    "02": angry, "00": annoyed, "01": frustrated, "03": veryAngry, "04": extremelyAngry, 
    "11": sad, "10": upset, "12": deflated, "13": distressed, "14": miserable, 
    "20": happy, "21": veryHappy, "22": extremelyHappy, "23": amazinglyHappy, "24": ecstatic,
    "30": bored, "31": exasperated, "32": sarcastic, "33": tired, "34": exhausted, 
    "43": scared, "40": surprised, "41": nervous, "42": overwhelmed, "44": terrified, "neutral": bored
};

const moodColorMap = {
    "02": "#FF6347",  // Tomator red
    "00": "#FFA500",  // Orange
    "01": "#FF4500",  // OrangeRed
    "03": "#DC143C",  // Crimson
    "04": "#B22222",  // Firebrick
    "11": "#87CEFA",  // LightSkyBlue
    "10": "#4682B4",  // SteelBlue
    "12": "#708090",  // SlateGray
    "13": "#778899",  // LightSlateGray
    "14": "#2F4F4F",  // DarkSlateGray
    "20": "#ADFF2F",  // GreenYellow
    "21": "#7CFC00",  // LawnGreen
    "22": "#00FF00",  // Lime
    "23": "#32CD32",  // LimeGreen
    "24": "#7FFF00",  // Chartreuse
    "30": "#F5F5DC",  // Beige
    "31": "#FFD700",  // Gold
    "32": "#FFC0CB",  // Pink
    "33": "#A9A9A9",  // DarkGray
    "34": "#808080",  // Gray
    "43": "#FFA07A",  // LightSalmon
    "40": "#FF69B4",  // HotPink
    "41": "#DAA520",  // GoldenRod
    "42": "#FFB6C1",  // LightPink
    "44": "#FF0000",  // Red
    "neutral": "#D3D3D3",  // LightGray
    "default": "#FFFFFF"  // White
};

const getMoodEmojiImage = (mood) => moodEmojiMap[mood] || null;
const getMoodColor = (mood) => moodColorMap[mood] || moodColorMap["default"];

const getSummaryStatistics = (monthData) => {
    const moods = Object.values(monthData);
    if (moods.length === 0) return { mostCommonMood: "N/A" };

    const moodCount = moods.reduce((acc, mood) => {
        acc[mood.mood] = (acc[mood.mood] || 0) + 1;
        return acc;
    }, {});

    const mostCommonMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);

    return { mostCommonMood };
};

const translations = {
    English: { onDate: "On", summary: "Summary Statistics", avgIntensity: "Average Mood Intensity:", mostCommonMood: "Most Common Mood", previous: "Previous", next: "Next", history: "Go to History", yearlyView: "Yearly View", monthlyView: "Monthly View",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    Spanish: { onDate: "El", summary: "Estadísticas Resumidas", avgIntensity: "Intensidad Media del Estado de Ánimo:", mostCommonMood: "Estado de Ánimo Más Común", previous: "Anterior", next: "Siguiente", history: "Ir a Historial", yearlyView: "Vista Anual", monthlyView: "Vista Mensual",
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    },
    German: { onDate: "Am", summary: "Zusammenfassende Statistiken", avgIntensity: "Durchschnittliche Stimmung Intensität:", mostCommonMood: "Häufigste Stimmung", previous: "Vorherige", next: "Nächste", history: "Zur Geschichte", yearlyView: "Jahresübersicht", monthlyView: "Monatsübersicht",
        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    },
    French: { onDate: "Le", summary: "Statistiques Résumées", avgIntensity: "Intensité Moyenne de l'Humeur:", mostCommonMood: "Humeur la Plus Commune", previous: "Précédente", next: "Suivante", history: "Aller à l'Historique", yearlyView: "Vue Annuelle", monthlyView: "Vue Mensuelle",
        months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
    },
    Chinese: { onDate: "在", summary: "统计总结", avgIntensity: "平均心情强度:", mostCommonMood: "最常见的心情", previous: "前一个", next: "下一个", history: "转到历史", yearlyView: "年度视图", monthlyView: "月度视图",
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }
};

const CalendarScreen = ({theme, language }) => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9));
    const [isYearlyView, setIsYearlyView] = useState(false);

    const t = translations[language];

    const [moodData, setMoodData] = useState({});

    const handleMoodUpdate = (date, mood) => {
        setMoodData(prevMoodData => ({
            ...prevMoodData,
            [date]: { mood }
        }));
        console.log(moodData);
    };
/*
    const getYearlyMoodStatistics = (year) => {
        const yearMoodData = Object.entries(moodData).filter(([date]) => date.startsWith(`${year}-`)).map(([_, data]) => data.mood);
    
        if (yearMoodData.length === 0) return "N/A";
    
        const moodCount = yearMoodData.reduce((acc, mood) => {
            acc[mood] = (acc[mood] || 0) + 1;
            return acc;
        }, {});
    
        return Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);
    };
*/

    const getYearlyMoodStatistics = (year) => {
        const monthlyMoodStatistics = {};
    
        // Loop through each month
        for (let month = 1; month <= 12; month++) {
            const monthStr = month < 10 ? `0${month}` : `${month}`;
            
            // Filter mood data for the specified month
            const monthMoodData = Object.entries(moodData)
                .filter(([date]) => date.startsWith(`${year}-${monthStr}`))
                .map(([_, data]) => data.mood);
    
            if (monthMoodData.length === 0) {
                monthlyMoodStatistics[monthStr] = "N/A";
                continue;
            }
    
            // Calculate the most common mood for the month
            const moodCount = monthMoodData.reduce((acc, mood) => {
                acc[mood] = (acc[mood] || 0) + 1;
                return acc;
            }, {});
    
            const mostCommonMood = Object.keys(moodCount).reduce((a, b) =>
                moodCount[a] > moodCount[b] ? a : b
            );
    
            monthlyMoodStatistics[monthStr] = mostCommonMood;
        }
    
        return monthlyMoodStatistics;
    };
    

    const changeMonth = (direction) => {
        if (isYearlyView) {
            const newYear = currentMonth.getFullYear() + direction;
            setCurrentMonth(new Date(newYear, currentMonth.getMonth()));
        } else {
            const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
            setCurrentMonth(newDate);
        }
    };

    const toggleView = () => setIsYearlyView(!isYearlyView);

    const generateDateKey = (day) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    };

    const generateNextMonthDateKey = (day) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 2;
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    };

    const generateYearKey = (year) => {
        return `${year}-01-01`;
    };


    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const startDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysArray = Array.from({ length: startDayOfWeek }).fill(null)
        .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const weeksArray = [];
    for (let i = 0; i < daysArray.length; i += 7) {
        weeksArray.push(daysArray.slice(i, i + 7));
    }

    const monthData = {};
    Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach(day => {
        const dateKey = generateDateKey(day);
        if (moodData[dateKey]) monthData[dateKey] = moodData[dateKey];
    });

    const summary = getSummaryStatistics(monthData);
    const yearlyMostCommonMoods = getYearlyMoodStatistics(currentMonth.getFullYear());
    
    const getJournal = async () => {        
        console.log(generateYearKey(currentMonth.getFullYear()));
        console.log(generateYearKey(currentMonth.getFullYear()+1));

        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/requestJournal",
                {
                    startDate: generateYearKey(currentMonth.getFullYear()),
                    endDate: generateYearKey(currentMonth.getFullYear()+1)
                },
                {}
            );
            console.log(data);
            let emoji = "";
            for (let i = 0; i < data.journal.length; i++){
                emoji = data.journal[i].emoji.toString().concat(data.journal[i].intensity.toString());
                handleMoodUpdate(data.journal[i].time_code.split("T")[0], emoji);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getJournal(false);
    }, []);
    
    return (
        <div className={ `calendar-screen ${theme}` }>
            <div className="button-container">
                <button className="toggle-view-button" onClick={toggleView}>
                    {isYearlyView ? t.monthlyView : t.yearlyView}
                </button>
                <button className="history-button" onClick={() => navigate('/history')}>
                    {t.history}
                </button>
            </div>

            <div className="month-navigation">
                <button onClick={() => { changeMonth(-1); }}>{t.previous}</button>
                <h2>{isYearlyView ? `${currentMonth.getFullYear()} ${t.summary}` : `${t.months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => { changeMonth(1); }}>{t.next}</button>
            </div>

            {isYearlyView ? (
                <table className="calendar-table">
                    <thead>
                        <tr>
                            {t.months.map((month, i) => <th key={i}>{month}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {Array.from({ length: 12 }, (_, i) => {
                                const monthStr = (i + 1).toString().padStart(2, "0");
                                const mood = yearlyMostCommonMoods[monthStr];
                                const moodEmoji = mood !== "N/A" ? getMoodEmojiImage(mood) : null;

                                return (
                                    <td key={i} style={{ backgroundColor: mood !== "N/A" ? getMoodColor(mood) : "#FFFFFF" }}>
                                        <p>{t.mostCommonMood}: {moodEmoji ? <img src={moodEmoji} alt={mood} className="calendar-emoji" /> : "N/A"}</p>
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <>
                    <table className="calendar-table">
                        <thead>
                            <tr>
                                {t.days.map((day, i) => <th key={i}>{day}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {weeksArray.map((week, weekIndex) => (
                                <tr key={weekIndex}>
                                    {week.map((day, dayIndex) => {
                                        const dateKey = day ? generateDateKey(day) : null;
                                        const moodEntry = dateKey ? moodData[dateKey] : null;
                                        const emojiSrc = moodEntry ? getMoodEmojiImage(moodEntry.mood) : null;

                                        return (
                                            <td key={dayIndex} onClick={day ? () => navigate(`/daily-view/${dateKey}`) : null} style={{ backgroundColor: moodEntry ? getMoodColor(moodEntry.mood) : "#FFFFFF" }}>
                                                {emojiSrc ? (
                                                    <img src={emojiSrc} alt={moodEntry.mood} className="calendar-emoji" />
                                                ) : (
                                                    <span>{day}</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="summary-statistics">
                        <h3>{`${t.summary} ${t.months[currentMonth.getMonth()]}`}</h3>
                        <p>{t.mostCommonMood}: {summary.mostCommonMood !== "N/A" ? (<img src={getMoodEmojiImage(summary.mostCommonMood)} alt={summary.mostCommonMood} className="calendar-emoji" />) : "N/A"}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarScreen;