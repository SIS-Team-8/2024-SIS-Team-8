import React, { useState, useEffect } from 'react';
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

    const handleEdit = () => {
        setIsEditing(true); // Enable editing mode
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
                        <input type="text" value={mood} onChange={e => setMood(e.target.value)} />
                        <input type="number" value={intensity} onChange={e => setIntensity(e.target.value)} />
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
                        <button onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        <p className="intensity">{t.intensity} {intensity}/5</p>
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