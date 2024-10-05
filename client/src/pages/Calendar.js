import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css'; // Import your CSS for styling
import sad from '../assets/emoji/sad.png';
import happy from '../assets/emoji/happy.png';
import veryHappy from '../assets/emoji/very-happy.png';
import miserable from '../assets/emoji/miserable.png';

// Dummy mood data for the calendar for demonstration
const moodData = {
    "2024-09-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-09-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-09-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-09-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-09-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." },
};

// Helper function to get the emoji based on mood type
const getMoodEmoji = (mood) => {
    switch (mood) {
        case "very happy":
            return veryHappy;
        case "happy":
            return happy;
        case "neutral":
            return null;
        case "sad":
            return sad;
        case "very sad":
            return miserable;
        default:
            return null;
    }
};

// Helper function to get the background color based on mood type
const getMoodColor = (mood) => {
    switch (mood) {
        case "very happy":
            return "#00FF00";
        case "happy":
            return "#A8E6CF";
        case "neutral":
            return "#FFD700";
        case "sad":
            return "#FFB6C1";
        case "very sad":
            return "#FF6347";
        default:
            return "#FFFFFF";
    }
};

const CalendarScreen = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024
    const [viewMode, setViewMode] = useState('month'); // Default view mode is 'month'

    // Change month function
    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    // Toggle between monthly and yearly view
    const toggleViewMode = () => {
        setViewMode(viewMode === 'month' ? 'year' : 'month');
    };

    // Navigate to mood selection for the selected date
    const navigateToMoodSelection = (date, moodEntry) => {
        navigate(`/mood-selection/${date}`, { state: { moodEntry } });
    };

    // Render calendar table for monthly view
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
                                        {day && (
                                            <div 
                                                style={{ position: 'relative', textAlign: 'center', cursor: 'pointer' }}
                                                onClick={() => navigateToMoodSelection(dateKey, moodEntry)} // Pass mood details
                                            >
                                                {day}
                                                {moodEntry && getMoodEmoji(moodEntry.mood) && (
                                                    <div style={{ marginTop: '5px' }}>
                                                        <img src={getMoodEmoji(moodEntry.mood)} alt={moodEntry.mood} style={{ width: '20px', height: '20px' }} />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Render yearly view table (example implementation)
    const renderYearlyView = () => {
        const monthsArray = Array.from({ length: 12 }, (_, i) => new Date(currentMonth.getFullYear(), i));

        return (
            <div className="yearly-view">
                {monthsArray.map((month, index) => (
                    <div key={index} className="yearly-month">
                        <h3>{month.toLocaleString('default', { month: 'long' })}</h3>
                        <div>
                            {Array.from({ length: 31 }, (_, day) => (
                                <span key={day} className="day-box">{day + 1}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="calendar-screen">
            <div className="month-navigation">
                <button className="prev-button" onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{viewMode === 'month' ? currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }) : `Year ${currentMonth.getFullYear()}`}</h2>
                <button className="next-button" onClick={() => changeMonth(1)}>Next</button>
            </div>

            {/* Button Container to Align Toggle and View History Buttons */}
            <div className="button-container">
                <button className="toggle-button" onClick={toggleViewMode}>Switch to {viewMode === 'month' ? 'Yearly' : 'Monthly'} View</button>
                <button className="toggle-button" onClick={() => navigate('/history')}>View History</button>
            </div>

            {/* Render the calendar or yearly view */}
            {viewMode === 'month' ? renderCalendarTable() : renderYearlyView()}

            {/* Summary Statistics */}
            <div className="summary-statistics">
                <p>Summary Statistics for {currentMonth.toLocaleString('default', { month: 'long' })}</p>
                <p>Average Mood Intensity: 3.00</p>
                <p>Most Common Mood: 😢</p>
            </div>
        </div>
    );
};

export default CalendarScreen;
