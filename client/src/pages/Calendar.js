import React, { useState } from 'react';
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

const translations = {
    English: { summary: "Summary Statistics for", avgIntensity: "Average Mood Intensity:", mostCommonMood: "Most Common Mood:", previous: "Previous", next: "Next" },
    Spanish: { summary: "Estadísticas Resumidas para", avgIntensity: "Intensidad Media del Estado de Ánimo:", mostCommonMood: "Estado de Ánimo Más Común:", previous: "Anterior", next: "Siguiente" },
    German: { summary: "Zusammenfassende Statistiken für", avgIntensity: "Durchschnittliche Stimmung Intensität:", mostCommonMood: "Häufigste Stimmung:", previous: "Vorherige", next: "Nächste" },
    French: { summary: "Statistiques Résumées pour", avgIntensity: "Intensité Moyenne de l'Humeur:", mostCommonMood: "Humeur la Plus Commune:", previous: "Précédente", next: "Suivante" },
    Chinese: { summary: "总结统计", avgIntensity: "平均心情强度:", mostCommonMood: "最常见的心情:", previous: "前一个", next: "下一个" }
};

const CalendarScreen = ({theme, language }) => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024

    const t = translations[language];

    // Get the number of days in the current month
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Get the day of the week the month starts on
    const getStartDayOfWeek = (month, year) => {
        return new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
    };

    // Change the current month (previous or next)
    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    // Get the total number of days in the current month
    const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const startDayOfWeek = getStartDayOfWeek(currentMonth.getMonth(), currentMonth.getFullYear());

    // Helper function to generate a date key in YYYY-MM-DD format
    const generateDateKey = (day) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    };

    // Create an array of all days for the month, including empty days for alignment
    const daysArray = Array.from({ length: startDayOfWeek }).fill(null) // Fill empty days before the start of the month
        .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));  // Add days of the month

    // Split days into weeks (7 days per row)
    const weeksArray = [];
    for (let i = 0; i < daysArray.length; i += 7) {
        weeksArray.push(daysArray.slice(i, i + 7));
    }

    // Get summary statistics for the current month
    const monthData = {};
    Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach(day => {
        const dateKey = generateDateKey(day);
        if (moodData[dateKey]) {
            monthData[dateKey] = moodData[dateKey];
        }
    });

    const summary = getSummaryStatistics(monthData);

    return (
        <div className="calendar-screen">
            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>

            <table className="calendar-table">
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    {weeksArray.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, dayIndex) => {
                                const dateKey = day ? generateDateKey(day) : null;
                                const moodEntry = day ? moodData[dateKey] : null;
                                return (
                                    <td key={dayIndex} onClick={day ? () => navigate(`/daily-view/${dateKey}`) : null} style={{ backgroundColor: moodEntry ? getMoodColor(moodEntry.mood) : "#FFFFFF", position: 'relative' }}>
                                        {/* Display date in top right if there is an emoji, otherwise centered */}
                                        {moodEntry ? (
                                            <>
                                                <div style={{ position: 'absolute', top: '2px', right: '5px', fontSize: '12px' }}>{day}</div>
                                                <div style={{ fontSize: '15px', textAlign: 'center' }}>{getMoodEmoji(moodEntry.mood)}</div>
                                            </>
                                        ) : (
                                            <div style={{ textAlign: 'center', fontSize: '16px' }}>{day || ''}</div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="summary-statistics">
                <h3>Summary Statistics for {currentMonth.toLocaleString('default', { month: 'long' })}</h3>
                <p>Average Mood Intensity: {summary.averageIntensity}</p>
                <p>Most Common Mood: {getMoodEmoji(summary.mostCommonMood)}</p>
            </div>
        </div>
    );
};

export default CalendarScreen;
