import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css'; // Import your CSS for styling

// Dummy mood data for the calendar for September
const moodData = {
    "2024-09-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-09-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-09-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-09-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-09-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." },
    // Add more dates for September...
};

// Helper function to get the emoji based on mood type
const getMoodEmoji = (mood) => {
    switch (mood) {
        case "very happy":
            return "😄"; // Very happy emoji
        case "happy":
            return "😊"; // Happy emoji
        case "neutral":
            return "😐"; // Neutral emoji
        case "sad":
            return "😢"; // Sad emoji
        case "very sad":
            return "😭"; // Very sad emoji
        default:
            return "😶"; // Default emoji for no mood data
    }
};

// Helper function to get the color based on mood type
const getMoodColor = (mood) => {
    switch (mood) {
        case "very happy":
            return "#00FF00"; // Bright green for very happy
        case "happy":
            return "#A8E6CF"; // Light green for happy
        case "neutral":
            return "#FFD700"; // Yellow for neutral
        case "sad":
            return "#FFB6C1"; // Light red for sad
        case "very sad":
            return "#FF6347"; // Red for very sad
        default:
            return "#FFFFFF"; // Default color for no mood data
    }
};

// Function to calculate the summary statistics for the selected month
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
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024
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
            {/* Button container with two toggle buttons */}
            <div className="button-container">
                <button className="toggle-view-button" onClick={toggleView}>
                    {isYearlyView ? "Switch to Monthly View" : "Switch to Yearly View"}
                </button>
                <button className="history-button" onClick={() => navigate('/history')}>
                    Go to History
                </button>
            </div>

            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)} disabled={isYearlyView}>Previous</button>
                <h2>{isYearlyView ? `${currentMonth.getFullYear()} Yearly Overview` : `${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => changeMonth(1)} disabled={isYearlyView}>Next</button>
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
