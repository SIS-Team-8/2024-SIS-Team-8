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

const CalendarScreen = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024
    const [viewMode, setViewMode] = useState('month'); 

    // Change the current month (previous or next)
    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    // Toggle between month and year view
    const toggleViewMode = () => {
        setViewMode(viewMode === 'month' ? 'year' : 'month');
    };

    // Handle navigation to History view
    const navigateToHistory = () => {
        navigate('/history', { state: { month: currentMonth } });
    };

    if (viewMode === 'year') {
        const year = currentMonth.getFullYear();
        const monthsArray = Array.from({ length: 12 }, (_, monthIndex) => monthIndex);

        return (
            <div className="calendar-screen">
                <div className="month-navigation">
                    <button onClick={() => setCurrentMonth(new Date(year - 1, 0))}>Previous Year</button>
                    <h2>{year}</h2>
                    <button onClick={() => setCurrentMonth(new Date(year + 1, 0))}>Next Year</button>
                </div>
                <button className="toggle-button" onClick={toggleViewMode}>Switch to Monthly View</button>

                <div className="year-grid">
                    {monthsArray.map(month => (
                        <div key={month} className="year-grid-item">
                            <h3>{new Date(year, month).toLocaleString('default', { month: 'long' })}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
                    {/* Render calendar table */}
                </tbody>
            </table>
        </div>
    );
};

export default CalendarScreen;
