import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './MoodSelection.css';

const MoodSelection = () => {
    const { date } = useParams(); // Get the date from the URL
    const location = useLocation(); // Get the passed mood data
    const { moodEntry } = location.state || {}; // Destructure the moodEntry from location.state

    return (
        <div id='container'>
            <h2>Mood Details for {date}</h2>
            
            {/* Show mood details if available */}
            {moodEntry ? (
                <div>
                    <p>Mood: {moodEntry.mood}</p>
                    <p>Intensity: {moodEntry.intensity}</p>
                    <p>Notes: {moodEntry.notes}</p>
                </div>
            ) : (
                <p>No mood data available for this day.</p>
            )}

            {/* Add form elements for editing the mood if required */}
            <div id="flexContainer">
                <textarea id="log" placeholder='Edit Note...'>{moodEntry?.notes}</textarea>
                <img id="submit" alt="submit" src="/path-to-submit-icon.png" />
            </div>
        </div>
    );
}

export default MoodSelection;
