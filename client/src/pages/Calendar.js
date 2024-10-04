import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css'; // Import your CSS for styling

// Dummy mood data for the calendar for demonstration
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

// Helper function to get the background color based on mood type
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

const CalendarScreen = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024
    const [viewMode, setViewMode] = useState('month'); 

    // Change the current month (previous or next)
    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'month' ? 'year' : 'month');
    };

    const navigateToHistory = () => {
        navigate('/history', { state: { month: currentMonth } });
    };

    // Function to generate the calendar table
    const renderCalendarTable = () => {
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const startDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const daysArray = Array.from({ length: startDayOfWeek }).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

        const weeksArray = [];
        for (let i = 0; i < daysArray.length; i += 7) {
            weeksArray.push(daysArray.slice(i, i + 7));
        }

        return (
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
                                const dateKey = day ? `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` : null;
                                const moodEntry = day ? moodData[dateKey] : null;
                                return (
                                    <td key={dayIndex} style={{ backgroundColor: moodEntry ? getMoodColor(moodEntry.mood) : "#FFFFFF" }}>
                                        <div style={{ position: 'relative', textAlign: 'center' }}>
                                            {day}
                                            {moodEntry && <div style={{ fontSize: '20px', marginTop: '5px' }}>{getMoodEmoji(moodEntry.mood)}</div>}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="calendar-screen">
            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>

            {/* Toggle between Month/Year views */}
            <button className="toggle-button" onClick={toggleViewMode}>Switch to Yearly View</button>

            {/* Button to View History */}
            <button className="history-button" onClick={navigateToHistory}>View History</button>

            {/* Render the calendar table */}
            {renderCalendarTable()}
        </div>
    );
};

export default CalendarScreen;
