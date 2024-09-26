import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DailyView.css';

// Dummy mood data for the detailed view
const moodData = {
    "2024-09-01": { mood: "very happy", intensity: 5, notes: "Best day ever!" },
    "2024-09-02": { mood: "happy", intensity: 4, notes: "Good day." },
    "2024-09-03": { mood: "neutral", intensity: 3, notes: "An average day." },
    "2024-09-04": { mood: "sad", intensity: 2, notes: "Feeling a bit down." },
    "2024-09-05": { mood: "very sad", intensity: 1, notes: "Not a good day at all." },
    // Add more dates...
};

const getMoodEmoji = (mood) => {
    switch (mood) {
        case "very happy":
            return "😄"; // Very happy emoji
        case "happy":
            return "😊"; // Happy emoji
        case "neutral":
            return "😐"; // Neutral emoji
        case "sad":
            return "😢"; // Sad emoji
        case "very sad":
            return "😭"; // Very sad emoji
        default:
            return "😶"; // Default emoji for no mood data
    }
};

const translations = {
    English: { backToCalendar: "Back to Calendar", editEntry: "Edit Entry", deleteEntry: "Delete Entry", intensity: "Mood Intensity:", notes: "Notes:", noEntry: "No entry for this day." },
    Spanish: { backToCalendar: "Volver al Calendario", editEntry: "Editar Entrada", deleteEntry: "Eliminar Entrada", intensity: "Intensidad del Estado de Ánimo:", notes: "Notas:", noEntry: "No hay entrada para este día." },
    German: { backToCalendar: "Zurück zum Kalender", editEntry: "Eintrag bearbeiten", deleteEntry: "Eintrag löschen", intensity: "Stimmungsintensität:", notes: "Notizen:", noEntry: "Keine Eintragung für diesen Tag." },
    French: { backToCalendar: "Retour au Calendrier", editEntry: "Modifier l'entrée", deleteEntry: "Supprimer l'entrée", intensity: "Intensité de l'humeur:", notes: "Remarques:", noEntry: "Aucune entrée pour ce jour." },
    Chinese: { backToCalendar: "返回日历", editEntry: "编辑条目", deleteEntry: "删除条目", intensity: "情绪强度:", notes: "笔记:", noEntry: "当天没有条目。" }
};

const DailyView = ({theme, language}) => {
    const { date } = useParams(); // Retrieves the date from the URL parameter
    const navigate = useNavigate();

    const t = translations[language];

    const moodEntry = moodData[date] || { mood: "neutral", intensity: 3, notes: "No entry for this day." }; // Default mood if no entry

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            delete moodData[date]; // Remove the entry from the data
            navigate('/calendar'); // Redirect back to the calendar after deletion
        }
    };

    const formattedHeading = t.replace('{date}', date);

    return (
        <div className={ `daily-view-screen ${theme} `}>
            <button className="back-button" onClick={() => navigate('/calendar')}>
                ⬅ {t.backToCalendar}
            </button>

            <div className="daily-view-content">
                <h1>{formattedHeading}</h1>
                <div className="emoji">{getMoodEmoji(moodEntry.mood)}</div>
                <p className="intensity">{t.backToCalendar} {moodEntry.intensity}/5</p>
                <p className="notes">{t.notes} {moodEntry.notes}</p>

                {/* Edit and Delete Buttons */}
                <button className="edit-button" onClick={() => alert("Edit functionality coming soon!")}>
                    ✏ {t.editEntry}
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    🗑 {t.deleteEntry}
                </button>
            </div>
        </div>
    );
};

export default DailyView;
