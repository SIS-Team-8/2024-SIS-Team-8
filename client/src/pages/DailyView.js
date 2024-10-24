import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DailyView.css';

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

// Dummy mood data for the detailed view
const moodData = {
    "2024-10-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-10-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-10-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-10-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-10-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." },
    "2024-10-06": { mood: "frustrated", intensity: 2, notes: "Things didn't go well." },
    "2024-10-07": { mood: "ecstatic", intensity: 5, notes: "Amazing surprise!" },
    "2024-10-08": { mood: "terrified", intensity: 1, notes: "Scary moment!" },
    "2024-10-09": { mood: "amazed", intensity: 4, notes: "Saw something incredible." },
    "2024-10-10": { mood: "overwhelmed", intensity: 3, notes: "Too much work." },
    "2024-10-11": { mood: "bored", intensity: 2, notes: "Nothing to do." },
    "2024-10-12": { mood: "annoyed", intensity: 2, notes: "Annoying neighbors." }
};

const moodIntensityMap = {
    "angry": 4,
    "annoyed": 2,
    "frustrated": 3,
    "very angry": 5,
    "extremely angry": 5,
    "sad": 3,
    "upset": 3,
    "deflated": 2,
    "distressed": 4,
    "miserable": 5,
    "happy": 3,
    "very happy": 4,
    "extremely happy": 5,
    "amazingly happy": 5,
    "ecstatic": 5,
    "bored": 1,
    "exasperated": 3,
    "sarcastic": 2,
    "tired": 2,
    "exhausted": 4,
    "scared": 4,
    "surprised": 3,
    "nervous": 3,
    "overwhelmed": 4,
    "terrified": 5,
    "neutral": 2,
    "very sad": 4
};

const intensityMoodMap = {
    1: ["bored"],
    2: ["tired"],
    3: ["happy"],
    4: ["very happy"],
    5: ["amazingly happy"]
};

const getMoodEmoji = (mood) => {
    const moodEmojiMap = {
       "angry": angry, "annoyed": annoyed, "frustrated": frustrated, "very angry": veryAngry,
    "extremely angry": extremelyAngry, "sad": sad, "upset": upset, "deflated": deflated,
    "distressed": distressed, "miserable": miserable, "happy": happy, "very happy": veryHappy,
    "extremely happy": extremelyHappy, "amazingly happy": amazinglyHappy, "ecstatic": ecstatic,
    "bored": bored, "exasperated": exasperated, "sarcastic": sarcastic, "tired": tired,
    "exhausted": exhausted, "scared": scared, "surprised": surprised, "nervous": nervous,
    "overwhelmed": overwhelmed, "terrified": terrified, "neutral": bored, "very sad": miserable
    };
    return moodEmojiMap[mood] || bored;
};

const translations = {
    English: { backToCalendar: "Back to Calendar", editEntry: "Edit Entry", deleteEntry: "Delete Entry", intensity: "Mood Intensity:", notes: "Notes:", noEntry: "No entry for this day." , youWereFeeling: "you were feeling", datePrefix: "On" },
    Spanish: { backToCalendar: "Volver al Calendario", editEntry: "Editar Entrada", deleteEntry: "Eliminar Entrada", intensity: "Intensidad del Estado de Ánimo:", notes: "Notas:", noEntry: "No hay entrada para este día." , youWereFeeling: "te sentías", datePrefix: "En" },
    German: { backToCalendar: "Zurück zum Kalender", editEntry: "Eintrag bearbeiten", deleteEntry: "Eintrag löschen", intensity: "Stimmungsintensität:", notes: "Notizen:", noEntry: "Keine Eintragung für diesen Tag." , youWereFeeling: "du hast dich gefühlt", datePrefix: "Am" },
    French: { backToCalendar: "Retour au Calendrier", editEntry: "Modifier l'entrée", deleteEntry: "Supprimer l'entrée", intensity: "Intensité de l'humeur:", notes: "Remarques:", noEntry: "Aucune entrée pour ce jour." , youWereFeeling: "vous vous sentiez", datePrefix: "Le" },
    Chinese: { backToCalendar: "返回日历", editEntry: "编辑条目", deleteEntry: "删除条目", intensity: "情绪强度:", notes: "笔记:", noEntry: "当天没有条目。" , youWereFeeling: "你当时的感觉是", datePrefix: "在" }
};

const DailyView = ({theme, language, moodData, updateEntry, deleteEntry}) => {
    const { date } = useParams(); // Retrieves the date from the URL parameter
    const navigate = useNavigate();

    const t = translations[language];

    const moodEntry = moodData[date] || { mood: "N/A", intensity: "N/A", notes: "No entry for this day." }; // Default mood if no entry
    const [mood, setMood] = useState('');
    const [intensity, setIntensity] = useState('');
    const [notes, setNotes] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const isEntryPresent = moodEntry.mood !== "N/A";

     // Effect to update component state when moodData changes or date changes
     useEffect(() => {
        if (moodData[date]) {
            setMood(moodData[date].mood);
            setIntensity(moodData[date].intensity);
            setNotes(moodData[date].notes);
        } else {
            setMood('N/A');
            setIntensity('N/A');
            setNotes('No entry for this day.');
        }
    }, [date, moodData]);

    // Update intensity automatically when mood changes
    const handleMoodChange = (newMood) => {
        setMood(newMood);
        setMoodImages(newMood[mood].subImages);
        setIntensity(moodIntensityMap[newMood]); // Update intensity based on the mood
    };

    const handleIntensityChange = (newIntensity) => {
        setIntensity(newIntensity);
        const newMood = intensityMoodMap[newIntensity] || 'neutral'; // Default to 'neutral' if no match
        setMood(newMood);
    };

    const handleEdit = () => {
        navigate(`/edit-entry/${date}`); // Navigate without state
    };

    const handleSave = () => {
        updateEntry(date, { mood, intensity, notes });
        setIsEditing(false);  // Exit editing mode
    };

    const translatedHeader = `${t.datePrefix} ${date}, ${t.youWereFeeling}:`;

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            delete moodData[date]; // Remove the entry from the data
            navigate('/calendar'); // Redirect back to the calendar after deletion
        }
    };

    return (
        <div className={ `daily-view-screen ${theme} `}>
            <button className="back-button" onClick={() => navigate('/calendar')}>
                ⬅ {t.backToCalendar}
            </button>

            <div className="daily-view-content">
                <h1 style={{ color: 'white' }}>{translatedHeader}</h1>

                <div className="emoji">
                    <img src={getMoodEmoji(moodEntry.mood)} alt={moodEntry.mood}/>
                </div>

                {isEditing ? (
                    <>
                        <input type="text" value={mood} onChange={e => handleMoodChange(e.target.value)} />
                        <input type="number" value={intensity} onChange={e => handleIntensityChange(e.target.value)} />
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
                        <button onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        <p className="intensity">{t.intensity} {intensity}</p>
                        <p className="notes">{t.notes} {notes}</p>
                        <button className="edit-button" onClick={handleEdit}>
                            ✏ {t.editEntry}
                        </button>
                        <button className="delete-button" onClick={handleDelete} disabled={isEditing}>
                            🗑 {t.deleteEntry}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DailyView;