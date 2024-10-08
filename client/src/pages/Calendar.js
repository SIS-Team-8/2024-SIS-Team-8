import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

// Import emoji images
import veryAngry from '../assets/emoji/very-angry.png';
import sad from '../assets/emoji/sad.png';
import happy from '../assets/emoji/happy.png';
import bored from '../assets/emoji/bored.png';
import scared from '../assets/emoji/scared.png';
import annoyed from '../assets/emoji/annoyed.png';
import frustrated from '../assets/emoji/frustrated.png';
import angry from '../assets/emoji/angry.png';
import extremelyAngry from '../assets/emoji/extremely-angry.png';
import upset from '../assets/emoji/upset.png';
import deflated from '../assets/emoji/deflated.png';
import distressed from '../assets/emoji/distressed.png';
import miserable from '../assets/emoji/miserable.png';
import veryHappy from '../assets/emoji/very-happy.png';
import extremelyHappy from '../assets/emoji/extremely-happy.png';
import amazinglyHappy from '../assets/emoji/amazingly-happy.png';
import ecstatic from '../assets/emoji/ecstatic.png';
import exasperated from '../assets/emoji/exasperated.png';
import sarcastic from '../assets/emoji/sarcastic.png';
import tired from '../assets/emoji/tired.png';
import exhausted from '../assets/emoji/exhausted.png';
import surprised from '../assets/emoji/surprised.png';
import nervous from '../assets/emoji/nervous.png';
import overwhelmed from '../assets/emoji/overwhelmed.png';
import terrified from '../assets/emoji/terrified.png';

// Dummy mood data for the calendar for September
const moodData = {
    "2024-09-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-09-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-09-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-09-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-09-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." },
    // Add more dates for September...
};

// Helper function to get the emoji image based on mood type
const getMoodEmojiImage = (mood) => {
    switch (mood) {
        case "very angry":
            return veryAngry;
        case "sad":
            return sad;
        case "happy":
            return happy;
        case "bored":
            return bored;
        case "scared":
            return scared;
        case "annoyed":
            return annoyed;
        case "frustrated":
            return frustrated;
        case "angry":
            return angry;
        case "extremely angry":
            return extremelyAngry;
        case "upset":
            return upset;
        case "deflated":
            return deflated;
        case "distressed":
            return distressed;
        case "miserable":
            return miserable;
        case "very happy":
            return veryHappy;
        case "extremely happy":
            return extremelyHappy;
        case "amazingly happy":
            return amazinglyHappy;
        case "ecstatic":
            return ecstatic;
        case "exasperated":
            return exasperated;
        case "sarcastic":
            return sarcastic;
        case "tired":
            return tired;
        case "exhausted":
            return exhausted;
        case "surprised":
            return surprised;
        case "nervous":
            return nervous;
        case "overwhelmed":
            return overwhelmed;
        case "terrified":
            return terrified;
        default:
            return null; // or handle a default image if needed
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

const CalendarScreen = ({ theme }) => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024
    const [isYearlyView, setIsYearlyView] = useState(false);

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    const toggleView = () => {
        setIsYearlyView(!isYearlyView);
    };

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
        <div className={`calendar-screen ${theme}`}>
            {/* Button container with two toggle buttons */}
            <div className="button-container">
                <button className="toggle-view-button" onClick={toggleView}>
                    {isYearlyView ? "Switch to Monthly View" : "Switch to Yearly View"}
                </button>
                <button className="history-button" onClick={() => navigate('/history')}>
                    Go to History
                </button>
            </div>

            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)} disabled={isYearlyView}>Previous</button>
                <h2>{isYearlyView ? `${currentMonth.getFullYear()} Yearly Overview` : `${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => changeMonth(1)} disabled={isYearlyView}>Next</button>
            </div>

            {isYearlyView ? (
                <div className="yearly-view">
                    {/* Yearly view content */}
                </div>
            ) : (
                <table className="calendar-table">
                    <thead>
                        <tr>
                            <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeksArray.map((week, weekIndex) => (
                            <tr key={weekIndex}>
                                {week.map((day, dayIndex) => {
                                    const dateKey = day ? generateDateKey(day) : null;
                                    const moodEntry = dateKey ? moodData[dateKey] : null;
                                    const emojiSrc = moodEntry ? getMoodEmojiImage(moodEntry.mood) : null;

                                    return (
                                        <td key={dayIndex} onClick={day ? () => navigate(`/daily-view/${dateKey}`) : null} style={{ backgroundColor: moodEntry ? getMoodColor(moodEntry.mood) : "#FFFFFF" }}>
                                            {emojiSrc ? (
                                                <img src={emojiSrc} alt={moodEntry.mood} className="calendar-emoji" />
                                            ) : (
                                                <span>{day}</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CalendarScreen;
