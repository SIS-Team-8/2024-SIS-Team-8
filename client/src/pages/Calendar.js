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
    "2024-09-01": { mood: "happy", intensity: 5, notes: "Great day!" },
    "2024-09-02": { mood: "sad", intensity: 2, notes: "Not the best." },
    // Add more dates and moods for testing
};

// Function to get the emoji image based on the mood
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
            return null; // Default emoji or handle accordingly
    }
};

const CalendarScreen = ({ theme }) => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getStartDayOfWeek = (month, year) => new Date(year, month, 1).getDay();
    
    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const startDayOfWeek = getStartDayOfWeek(currentMonth.getMonth(), currentMonth.getFullYear());
    const generateDateKey = (day) => `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const daysArray = Array.from({ length: startDayOfWeek }).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    
    const weeksArray = [];
    for (let i = 0; i < daysArray.length; i += 7) {
        weeksArray.push(daysArray.slice(i, i + 7));
    }

    return (
        <div className={`calendar-screen ${theme}`}>
            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h2>
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
                    {weeksArray.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, dayIndex) => {
                                const dateKey = day ? generateDateKey(day) : null;
                                const moodEntry = dateKey ? moodData[dateKey] : null;
                                const emojiSrc = moodEntry ? getMoodEmojiImage(moodEntry.mood) : null;

                                return (
                                    <td key={dayIndex} onClick={day ? () => navigate(`/daily-view/${dateKey}`) : null} style={{ backgroundColor: moodEntry ? "#f0f0f0" : "#FFFFFF" }}>
                                        <div style={{ textAlign: 'center' }}>
                                            {emojiSrc ? (
                                                <img src={emojiSrc} alt={moodEntry.mood} className="calendar-emoji" />
                                            ) : (
                                                <span>{day}</span>
                                            )}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CalendarScreen;
