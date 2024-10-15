import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

import angry from '../assets/emoji/angry.png';
import annoyed from '../assets/emoji/annoyed.png';
import frustrated from '../assets/emoji/frustrated.png';
import veryAngry from '../assets/emoji/very-angry.png';
import extremelyAngry from '../assets/emoji/extremely-angry.png';
import sad from '../assets/emoji/sad.png';
import upset from '../assets/emoji/upset.png';
import deflated from '../assets/emoji/deflated.png';
import distressed from '../assets/emoji/distressed.png';
import miserable from '../assets/emoji/miserable.png';
import happy from '../assets/emoji/happy.png';
import veryHappy from '../assets/emoji/very-happy.png';
import extremelyHappy from '../assets/emoji/extremely-happy.png';
import amazinglyHappy from '../assets/emoji/amazingly-happy.png';
import ecstatic from '../assets/emoji/ecstatic.png';
import bored from '../assets/emoji/bored.png';
import exasperated from '../assets/emoji/exasperated.png';
import sarcastic from '../assets/emoji/sarcastic.png';
import tired from '../assets/emoji/tired.png';
import exhausted from '../assets/emoji/exhausted.png';
import scared from '../assets/emoji/scared.png';
import surprised from '../assets/emoji/surprised.png';
import nervous from '../assets/emoji/nervous.png';
import overwhelmed from '../assets/emoji/overwhelmed.png';
import terrified from '../assets/emoji/terrified.png';

const moodData = {
    "2024-10-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-10-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-10-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-10-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-10-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." }
};

const moodEmojiMap = {
    "angry": angry, "annoyed": annoyed, "frustrated": frustrated, "very angry": veryAngry,
    "extremely angry": extremelyAngry, "sad": sad, "upset": upset, "deflated": deflated,
    "distressed": distressed, "miserable": miserable, "happy": happy, "very happy": veryHappy,
    "extremely happy": extremelyHappy, "amazingly happy": amazinglyHappy, "ecstatic": ecstatic,
    "bored": bored, "exasperated": exasperated, "sarcastic": sarcastic, "tired": tired,
    "exhausted": exhausted, "scared": scared, "surprised": surprised, "nervous": nervous,
    "overwhelmed": overwhelmed, "terrified": terrified, "neutral": bored, "very sad": miserable
};

const moodColorMap = {
    "very happy": "#00FF00", "happy": "#A8E6CF", "neutral": "#FFD700", "sad": "#FFB6C1", "very sad": "#FF6347", "default": "#FFFFFF"
};

const getMoodEmojiImage = (mood) => moodEmojiMap[mood] || null;
const getMoodColor = (mood) => moodColorMap[mood] || moodColorMap["default"];

const getSummaryStatistics = (monthData) => {
    const moods = Object.values(monthData);
    if (moods.length === 0) return { mostCommonMood: "N/A" };

    const moodCount = moods.reduce((acc, mood) => {
        acc[mood.mood] = (acc[mood.mood] || 0) + 1;
        return acc;
    }, {});

    const mostCommonMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);

    return { mostCommonMood };
};

const getYearlyMoodStatistics = (year) => {
    const yearMoodData = Object.entries(moodData).filter(([date]) => date.startsWith(`${year}-`)).map(([_, data]) => data.mood);

    if (yearMoodData.length === 0) return "N/A";

    const moodCount = yearMoodData.reduce((acc, mood) => {
        acc[mood] = (acc[mood] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);
};

const CalendarScreen = ({ theme }) => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9));
    const [isYearlyView, setIsYearlyView] = useState(false);

    const changeMonth = (direction) => {
        if (isYearlyView) {
            const newYear = currentMonth.getFullYear() + direction;
            setCurrentMonth(new Date(newYear, currentMonth.getMonth()));
        } else {
            const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
            setCurrentMonth(newDate);
        }
    };

    const toggleView = () => setIsYearlyView(!isYearlyView);

    const generateDateKey = (day) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    };

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const startDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysArray = Array.from({ length: startDayOfWeek }).fill(null)
        .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const weeksArray = [];
    for (let i = 0; i < daysArray.length; i += 7) {
        weeksArray.push(daysArray.slice(i, i + 7));
    }

    const monthData = {};
    Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach(day => {
        const dateKey = generateDateKey(day);
        if (moodData[dateKey]) monthData[dateKey] = moodData[dateKey];
    });

    const summary = getSummaryStatistics(monthData);
    const yearlyMostCommonMood = getYearlyMoodStatistics(currentMonth.getFullYear());

    return (
        <div className={`calendar-screen ${theme}`}>
            <div className="button-container">
                <button className="toggle-view-button" onClick={toggleView}>
                    {isYearlyView ? "Monthly View" : "Yearly View"}
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
                                <td key={i} style={{ backgroundColor: 'white' }}>
                                    <p>Most Common Mood: {yearlyMostCommonMood !== "N/A" ? <img src={getMoodEmojiImage(yearlyMostCommonMood)} alt={yearlyMostCommonMood} className="calendar-emoji" /> : "N/A"}</p>
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
                        <p>Most Common Mood: {summary.mostCommonMood !== "N/A" ? <img src={getMoodEmojiImage(summary.mostCommonMood)} alt={summary.mostCommonMood} className="calendar-emoji" /> : "N/A"}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarScreen;