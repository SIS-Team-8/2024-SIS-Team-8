import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './calender.css'; // Import the CSS for styling

// Dummy mood data for the calendar
const moodData = {
    "2024-07-26": { mood: "happy", intensity: 4, notes: "Had a great day!" },
    "2024-07-27": { mood: "sad", intensity: 2, notes: "Feeling down today." },
    "2024-07-28": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-07-29": { mood: "happy", intensity: 5, notes: "Feeling fantastic!" },
    // Add more data as required
};

// Helper function to get the color based on mood type
const getMoodColor = (mood) => {
    switch (mood) {
        case "happy":
            return "#00FF00"; // Green for happy
        case "sad":
            return "#FF0000"; // Red for sad
        case "neutral":
            return "#FFFF00"; // Yellow for neutral
        default:
            return "#FFFFFF"; // Default color
    }
};

// Function to calculate summary statistics for the selected month
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

const CalendarScreen = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Get number of days in the current month
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
                                    <td key={dayIndex} onClick={day ? () => navigate(`/daily-view/${dateKey}`) : null} style={{ backgroundColor: moodEntry ? getMoodColor(moodEntry.mood) : "#FFFFFF" }}>
                                        {day || ''}
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
                <p>Most Common Mood: {summary.mostCommonMood}</p>
            </div>
        </div>
    );
};

export default CalendarScreen;
