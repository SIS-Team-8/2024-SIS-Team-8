import React, { useState } from 'react';
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
        case "extremely angry":
            return veryAngry;
        case "angry":
            return angry;
        case "frustrated":
            return frustrated;
        case "annoyed":
            return annoyed;
        case "sad":
        case "upset":
            return sad;
        case "deflated":
            return deflated;
        case "distressed":
            return distressed;
        case "miserable":
            return miserable;
        case "happy":
            return happy;
        case "very happy":
            return veryHappy;
        case "extremely happy":
            return extremelyHappy;
        case "amazingly happy":
            return amazinglyHappy;
        case "ecstatic":
            return ecstatic;
        case "bored":
            return bored;
        case "exasperated":
            return exasperated;
        case "sarcastic":
            return sarcastic;
        case "tired":
            return tired;
        case "exhausted":
            return exhausted;
        case "scared":
            return scared;
        case "surprised":
            return surprised;
        case "nervous":
            return nervous;
        case "overwhelmed":
            return overwhelmed;
        case "terrified":
            return terrified;
        case "neutral":
            return surprised; // Use an image you have for neutral, or add a specific neutral emoji
        case "very sad":
            return veryAngry; // Replace this with an appropriate image for "very sad"
        default:
            return null; // Handle a default image if necessary
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

// Function to calculate the summary statistics for the selected month
const getSummaryStatistics = (monthData) => {
    const moods = Object.values(monthData);
    if (moods.length === 0) return { averageIntensity: 0, mostCommonMood: "N/A" };

    const totalIntensity = moods.reduce((acc, mood) => acc + mood.intensity, 0);
    const averageIntensity = (totalIntensity / moods.length).toFixed(2);

    const moodCount = moods.reduce((acc, mood) => {
        acc[mood.mood] = (acc[mood.mood] || 0) + 1;
        return acc;
    }, {});

    const mostCommonMood = Object.keys(moodCount).reduce((a, b) => (moodCount[a] > moodCount[b] ? a : b));

    return { averageIntensity, mostCommonMood };
};

const CalendarScreen = ({ theme }) => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Initialize to September 2024
    const [isYearlyView, setIsYearlyView] = useState(false);

    const changeMonth = (direction) => {
        if (isYearlyView) {
            // Change the year instead of the month
            const newYear = currentMonth.getFullYear() + direction;
            setCurrentMonth(new Date(newYear, currentMonth.getMonth()));
        } else {
            // Change the month
            const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
            setCurrentMonth(newMonth);
        }
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

    const monthData = {};
    Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach(day => {
        const dateKey = generateDateKey(day);
        if (moodData[dateKey]) {
            monthData[dateKey] = moodData[dateKey];
        }
    });

    const summary = getSummaryStatistics(monthData);

    return (
        <div className={`calendar-screen ${theme}`}>
            <div className="button-container">
                <button className="toggle-view-button" onClick={toggleView}>
                    {isYearlyView ? "Switch to Monthly View" : "Switch to Yearly View"}
                </button>
                <button className="history-button" onClick={() => navigate('/history')}>
                    Go to History
                </button>
            </div>

            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{isYearlyView ? `${currentMonth.getFullYear()} Yearly Overview` : `${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>

            {isYearlyView ? (
                <table className="calendar-table">
                    <thead>
                        <tr>
                            {Array(12).fill(null).map((_, i) => <th key={i}>{new Date(0, i).toLocaleString('default', { month: 'short' })}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {Array(12).fill(null).map((_, i) => (
                                <td key={i} style={{ backgroundColor: '#FFD700' }}>
                                    {/* Render yearly average data here if available */}
                                    <p>{/* Yearly data for each month, e.g., intensity */}</p>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <>
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
                    <div className="summary-statistics">
                        <h3>Summary for {currentMonth.toLocaleString('default', { month: 'long' })}</h3>
                        <p>Average Mood Intensity: {summary.averageIntensity}</p>
                        <p>Most Common Mood: {summary.mostCommonMood !== "N/A" ? <img src={getMoodEmojiImage(summary.mostCommonMood)} alt={summary.mostCommonMood} className="calendar-emoji" /> : "N/A"}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarScreen;
