import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DailyView.css';

import veryHappy from '../assets/emoji/very-happy.png';
import happy from '../assets/emoji/happy.png';
import bored from '../assets/emoji/bored.png';
import sad from '../assets/emoji/sad.png';
import miserable from '../assets/emoji/miserable.png';

// Dummy mood data for the detailed view
const moodData = {
    "2024-10-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-10-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-10-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-10-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-10-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." },
    // Add more dates...
};

const getMoodEmoji = (mood) => {
    switch (mood) {
        case "very happy":
            return veryHappy;
        case "happy":
            return happy;
        case "neutral":
            return bored;
        case "sad":
            return sad;
        case "very sad":
            return miserable;
        default:
            return bored;
    }
};

const DailyView = () => {
    const { date } = useParams(); // Retrieves the date from the URL parameter
    const navigate = useNavigate();

    const moodEntry = moodData[date] || { mood: "neutral", intensity: 3, notes: "No entry for this day." }; // Default mood if no entry

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            delete moodData[date]; // Remove the entry from the data
            navigate('/calendar'); // Redirect back to the calendar after deletion
        }
    };

    return (
        <div className="daily-view-screen">
            <button className="back-button" onClick={() => navigate('/calendar')}>
                ⬅ Back to Calendar
            </button>

            <div className="daily-view-content">
                <h1>On {date}, you were feeling:</h1>

                <div className="emoji">
                    <img src={getMoodEmoji(moodEntry.mood)} alt={moodEntry.mood}/>
                </div>

                <p className="intensity">Mood Intensity: {moodEntry.intensity}/5</p>
                <p className="notes">Notes: {moodEntry.notes}</p>

                <button className="edit-button" onClick={() => alert("Edit functionality coming soon!")}>
                    ✏ Edit Entry
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    🗑 Delete Entry
                </button>
            </div>
        </div>
    );
};

export default DailyView;