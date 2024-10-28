import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DailyView.css';
import { toast } from "react-toastify";

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

const getMoodEmoji = (mood) => {
    const moodEmojiMap = {
        "02": angry, "00": annoyed, "01": frustrated, "03": veryAngry, "04": extremelyAngry,
        "11": sad, "10": upset, "12": deflated, "13": distressed, "14": miserable,
        "20": happy, "21": veryHappy, "22": extremelyHappy, "23": amazinglyHappy, "24": ecstatic,
        "30": bored, "31": exasperated, "32": sarcastic, "33": tired, "34": exhausted,
        "43": scared, "40": surprised, "41": nervous, "42": overwhelmed, "44": terrified, "neutral": bored
    }

    return moodEmojiMap[mood] || bored;
};

const translations = {
    English: { backToCalendar: "Back to Calendar", editEntry: "Edit Entry", intensity: "Mood Intensity:", notes: "Notes:", noEntry: "No entry for this day." , youWereFeeling: "you were feeling", datePrefix: "On" },
    Spanish: { backToCalendar: "Volver al Calendario", editEntry: "Editar Entrada", intensity: "Intensidad del Estado de Ánimo:", notes: "Notas:", noEntry: "No hay entrada para este día." , youWereFeeling: "te sentías", datePrefix: "En" },
    German: { backToCalendar: "Zurück zum Kalender", editEntry: "Eintrag bearbeiten", intensity: "Stimmungsintensität:", notes: "Notizen:", noEntry: "Keine Eintragung für diesen Tag." , youWereFeeling: "du hast dich gefühlt", datePrefix: "Am" },
    French: { backToCalendar: "Retour au Calendrier", editEntry: "Modifier l'entrée", intensity: "Intensité de l'humeur:", notes: "Remarques:", noEntry: "Aucune entrée pour ce jour." , youWereFeeling: "vous vous sentiez", datePrefix: "Le" },
    Chinese: { backToCalendar: "返回日历", editEntry: "编辑条目", intensity: "情绪强度:", notes: "笔记:", noEntry: "当天没有条目。" , youWereFeeling: "你当时的感觉是", datePrefix: "在" }
};

const DailyView = ({ moodData, theme, language }) => {
    const { date } = useParams(); // Retrieves the date from the URL parameter
    const navigate = useNavigate();

    const [photo, setPhoto] = useState();
    const [show, setShow] = useState(false);

    const t = translations[language];

    const moodEntry = moodData[date] || { mood: "neutral", notes: "No entry for this day." }; // Default mood if no entry

    const translatedHeader = `${t.datePrefix} ${date}, ${t.youWereFeeling}:`;

    const handleDisplay = () => {
        if (moodEntry.image === "" || moodEntry.image === undefined) {
            toast.error("No image entered for this day");
        }
        else {
            setPhoto(moodEntry.image);
            setShow(true);
        }
    }

    return (
        <div className={ `daily-view-screen ${theme} `}>
            <button className="back-button" onClick={() => navigate('/calendar')}>
                ⬅ {t.backToCalendar}
            </button>
            {show ? (
                <div>
                    <img id="photo" src={photo} alt="Entry photo"/>
                    <button className="edit-button" onClick={() => setShow(false)}>
                            Display Entry
                    </button>
                </div>
            ) : (
                <div className="daily-view-content">
                    <h1 style={{ color: 'white' }}>{translatedHeader}</h1>

                    <div className="emoji">
                        <img src={getMoodEmoji(moodEntry.mood)} alt={moodEntry.mood}/>
                    </div>

                    <p className="notes">{t.notes} {moodEntry.notes}</p>

                    <button className="edit-button" onClick={() => navigate(`/mood-selection/${date}`)}>
                        ✏ {t.editEntry}
                    </button>
                    <button className="edit-button" onClick={handleDisplay}>
                        Display Photo
                    </button>
                </div>
            )}
        </div>
    );
};

export default DailyView;