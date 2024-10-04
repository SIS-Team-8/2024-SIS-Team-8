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
            return veryHappy; // Image path for very happy
        case "happy":
            return happy;     // Image path for happy
        case "neutral":
            return null;      // No image for neutral
        case "sad":
            return sad;       // Image path for sad
        case "very sad":
            return miserable; // Image path for very sad
        default:
            return null;      // Default: no emoji
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

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'month' ? 'year' : 'month');
    };

    // Navigate to the mood selection page when a day is clicked and pass the mood details
    const navigateToMoodSelection = (date, moodEntry) => {
        navigate(`/mood-selection/${date}`, { state: { moodEntry } });
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

    return (
        <div className="calendar-screen">
            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>

            {/* Button Container to Align Toggle and View History Buttons */}
            <div className="button-container">
                {/* Toggle between Month/Year views */}
                <button className="toggle-button" onClick={toggleViewMode}>Switch to Yearly View</button>

                {/* Button to View History */}
                <button className="toggle-button" onClick={() => navigate('/history')}>View History</button>
            </div>

            {/* Render the calendar table */}
            {renderCalendarTable()}
        </div>
    );
};

export default CalendarScreen;
