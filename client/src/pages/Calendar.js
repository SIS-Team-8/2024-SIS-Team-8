import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css'; // Import your CSS for styling

// Dummy mood data for the calendar
const moodData = {
    "2024-09-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-09-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-09-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-09-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-09-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." },
    // Add more dates for the year...
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

// Function to calculate average intensity for each month
const getMonthlyAverageIntensity = (month, year, moodData) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let totalIntensity = 0;
    let moodDaysCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        if (moodData[dateKey]) {
            totalIntensity += moodData[dateKey].intensity;
            moodDaysCount++;
        }
    }

    return moodDaysCount > 0 ? (totalIntensity / moodDaysCount).toFixed(2) : "N/A";
};

const CalendarScreen = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024
    const [viewMode, setViewMode] = useState('month'); // Add a view toggle between 'month' and 'year'

    // Change the current month (previous or next)
    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    // Toggle between month and year view
    const toggleViewMode = () => {
        setViewMode(viewMode === 'month' ? 'year' : 'month');
    };

    if (viewMode === 'year') {
        // Yearly view logic
        const year = currentMonth.getFullYear();
        const monthsArray = Array.from({ length: 12 }, (_, monthIndex) => monthIndex);

        return (
            <div className="calendar-screen">
                <div className="month-navigation">
                    <button onClick={() => setCurrentMonth(new Date(year - 1, 0))}>Previous Year</button>
                    <h2>{year}</h2>
                    <button onClick={() => setCurrentMonth(new Date(year + 1, 0))}>Next Year</button>
                </div>
                <button className="toggle-button" onClick={toggleViewMode}>
                    Switch to Monthly View
                </button>

                <div className="year-grid">
                    {monthsArray.map(month => (
                        <div key={month} className="year-grid-item">
                            <h3>{new Date(year, month).toLocaleString('default', { month: 'long' })}</h3>
                            <p>Average Intensity: {getMonthlyAverageIntensity(month, year, moodData)}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Monthly view logic remains unchanged...
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

    return (
        <div className="calendar-screen">
            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>
            <button className="toggle-button" onClick={toggleViewMode}>
                Switch to Yearly View
            </button>
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
        </div>
    );
};

export default CalendarScreen;
