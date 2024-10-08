import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

const moodData = {
    "2024-09-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-09-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-09-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-09-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-09-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." },
    // Add more dates for September...
};

const getMoodEmoji = (mood) => {
    switch (mood) {
        case "very happy": return "😄";
        case "happy": return "😊";
        case "neutral": return "😐";
        case "sad": return "😢";
        case "very sad": return "😭";
        default: return "😶";
    }
};

const getMoodColor = (mood) => {
    switch (mood) {
        case "very happy": return "#00FF00";
        case "happy": return "#A8E6CF";
        case "neutral": return "#FFD700";
        case "sad": return "#FFB6C1";
        case "very sad": return "#FF6347";
        default: return "#FFFFFF";
    }
};

const getSummaryStatistics = (monthData) => {
    const moods = Object.values(monthData);
    if (moods.length === 0) return { averageIntensity: 0, mostCommonMood: "N/A" };

    const totalIntensity = moods.reduce((acc, mood) => acc + mood.intensity, 0);
    const averageIntensity = (totalIntensity / moods.length).toFixed(2);

    const moodCount = moods.reduce((acc, mood) => {
        acc[mood.mood] = (acc[mood.mood] || 0) + 1;
        return acc;
    }, {});

    const mostCommonMood = Object.keys(moodCount).reduce((a, b) => (moodCount[a] > moodCount[b] ? a : b));

    return { averageIntensity, mostCommonMood };
};

// New function to get average monthly intensity for yearly view
const getYearlyAverageIntensity = () => {
    const months = Array(12).fill(0).map((_, i) => i + 1);
    const monthlyData = {};

    months.forEach((month) => {
        const days = Object.keys(moodData).filter(date => parseInt(date.split('-')[1], 10) === month);
        if (days.length === 0) {
            monthlyData[month] = 0;
            return;
        }

        const totalIntensity = days.reduce((sum, day) => sum + moodData[day].intensity, 0);
        monthlyData[month] = (totalIntensity / days.length).toFixed(2);
    });

    return monthlyData;
};

const CalendarScreen = ({ theme, language }) => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8));
    const [isYearlyView, setIsYearlyView] = useState(false);

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    const toggleView = () => {
        setIsYearlyView(!isYearlyView);
    };

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const startDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const generateDateKey = (day) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    };

    const daysArray = Array.from({ length: startDayOfWeek }).fill(null)
        .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const weeksArray = [];
    for (let i = 0; i < daysArray.length; i += 7) {
        weeksArray.push(daysArray.slice(i, i + 7));
    }

    const monthData = {};
    Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach(day => {
        const dateKey = generateDateKey(day);
        if (moodData[dateKey]) {
            monthData[dateKey] = moodData[dateKey];
        }
    });

    const summary = getSummaryStatistics(monthData);
    const yearlyAverage = getYearlyAverageIntensity();

    return (
        <div className={`calendar-screen ${theme}`}>
            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)} disabled={isYearlyView}>Previous</button>
                <h2>{isYearlyView ? `${currentMonth.getFullYear()} Yearly Overview` : `${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => changeMonth(1)} disabled={isYearlyView}>Next</button>
                <button onClick={toggleView}>{isYearlyView ? "Switch to Monthly View" : "Switch to Yearly View"}</button>
            </div>

            {isYearlyView ? (
                <table className="calendar-table">
                    <thead>
                        <tr>
                            {Array(12).fill(null).map((_, i) => <th key={i}>{new Date(0, i).toLocaleString('default', { month: 'short' })}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {Array(12).fill(null).map((_, i) => (
                                <td key={i} style={{ backgroundColor: '#FFD700' }}>
                                    <p>{yearlyAverage[i + 1]}</p>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <table className="calendar-table">
                    <thead>
                        <tr>
                            <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeksArray.map((week, weekIndex) => (
                            <tr key={weekIndex}>
                                {week.map((day, dayIndex) => {
                                    const dateKey = day ? generateDateKey(day) : null;
                                    const moodEntry = day ? moodData[dateKey] : null;
                                    return (
                                        <td key={dayIndex} onClick={day ? () => navigate(`/daily-view/${dateKey}`) : null} style={{ backgroundColor: moodEntry ? getMoodColor(moodEntry.mood) : "#FFFFFF" }}>
                                            {moodEntry ? (
                                                <>
                                                    <div style={{ fontSize: '12px' }}>{day}</div>
                                                    <div style={{ fontSize: '15px' }}>{getMoodEmoji(moodEntry.mood)}</div>
                                                </>
                                            ) : (
                                                <div>{day || ''}</div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {!isYearlyView && (
                <div className="summary-statistics">
                    <h3>Summary for {currentMonth.toLocaleString('default', { month: 'long' })}</h3>
                    <p>Average Mood Intensity: {summary.averageIntensity}</p>
                    <p>Most Common Mood: {getMoodEmoji(summary.mostCommonMood)}</p>
                </div>
            )}
        </div>
    );
};

export default CalendarScreen;
