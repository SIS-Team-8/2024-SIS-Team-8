import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './dailyview.css'; // Import the CSS for styling

// Dummy mood data for individual days
const moodData = {
    "2024-07-26": { mood: "happy", intensity: 4, notes: "Had a great day!" },
    "2024-07-27": { mood: "sad", intensity: 2, notes: "Feeling down today." },
    "2024-07-28": { mood: "neutral", intensity: 3, notes: "An average day, nothing special." },
    "2024-07-29": { mood: "happy", intensity: 5, notes: "Feeling fantastic, best day!" },
    "2024-07-30": { mood: "sad", intensity: 1, notes: "One of the worst days." },
    "2024-07-31": { mood: "happy", intensity: 4, notes: "Had a nice time with family." },
    // Add more data as required...
};

const DailyView = () => {
    const { date } = useParams(); // Get the date from the URL
    const navigate = useNavigate();

    // Fetch the mood entry for the selected date
    const moodEntry = moodData[date] || { mood: "neutral", intensity: 3, notes: "No entry for this day." };

    // Get the emoji corresponding to the mood
    const getEmoji = (mood) => {
        switch (mood) {
            case "happy":
                return "😊";
            case "sad":
                return "😢";
            case "neutral":
                return "😐";
            default:
                return "😶"; // Default emoji
        }
    };

    return (
        <div className="daily-view-screen">
            <button className="back-button" onClick={() => navigate('/calendar')}>
                ⬅ Back to Calendar
            </button>
            <div className="daily-view-content">
                <h1>On {date}, you were feeling</h1>
                <div className="emoji">{getEmoji(moodEntry.mood)}</div>
                <p className="notes">Notes: {moodEntry.notes}</p>
                <p className="intensity">Mood Intensity: {moodEntry.intensity}/5</p>
            </div>
        </div>
    );
};

export default DailyView;
