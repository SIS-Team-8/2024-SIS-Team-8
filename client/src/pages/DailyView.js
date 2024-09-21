import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './dailyview.css'; // Import the CSS for styling

// Dummy mood data for individual days
const moodData = {
    "2024-07-26": { mood: "happy", intensity: 4, notes: "Had a great day!" },
    "2024-07-27": { mood: "sad", intensity: 2, notes: "Feeling down today." },
    "2024-07-28": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-07-29": { mood: "happy", intensity: 5, notes: "Feeling fantastic!" },
    // Add more data as required
};

const DailyView = () => {
    const { date } = useParams(); // Get the date from the URL
    const navigate = useNavigate();
    const [moodEntry, setMoodEntry] = useState(moodData[date] || { mood: "neutral", intensity: 3, notes: "No entry for this day." });
    
    // Handle the deletion of the entry
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            delete moodData[date]; // Remove the entry from the data
            navigate('/calendar'); // Redirect back to the calendar after deletion
        }
    };

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
            
            {/* Edit Button (Currently a placeholder - replace with an actual edit modal if needed) */}
            <button className="edit-button" onClick={() => alert("Edit functionality coming soon!")}>
                ✏ Edit Entry
            </button>

            {/* Delete Button */}
            <button className="delete-button" onClick={handleDelete}>
                🗑 Delete Entry
            </button>
        </div>
    </div>
);
};

export default DailyView;
