import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './calender.css';

const moodData = {
    "2024-07-26": { mood: "happy", intensity: 4 },
    "2024-07-27": { mood: "sad", intensity: 2 },
    "2024-07-28": { mood: "neutral", intensity: 3 },
    // Add more dates and moods here...
};

const CalendarScreen = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());

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

    const handleClickDay = (date) => {
        navigate(`/daily-view/${date}`);
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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
                    <tr>
                        {daysArray.map((day, index) => {
                            const dateKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
                            const moodEntry = moodData[dateKey];
                            return (
                                <td key={index} onClick={() => handleClickDay(dateKey)} style={{ backgroundColor: moodEntry ? getMoodColor(moodEntry.mood) : "#FFFFFF" }}>
                                    {day}
                                </td>
                            );
                        })}
                    </tr>
                    {/* Additional rows for remaining days */}
                </tbody>
            </table>
        </div>
    );
};

export default CalendarScreen;
