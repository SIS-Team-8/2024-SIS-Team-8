import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import './MoodSelection.css'
import veryAngry from '../assets/emoji/very-angry.png'
import sad from '../assets/emoji/sad.png'
import happy from '../assets/emoji/happy.png'
import bored from '../assets/emoji/bored.png'
import scared from '../assets/emoji/scared.png'
import annoyed from '../assets/emoji/annoyed.png'
import frustrated from '../assets/emoji/frustrated.png'
import angry from '../assets/emoji/angry.png'
import extremelyAngry from '../assets/emoji/extremely-angry.png'
import upset from '../assets/emoji/upset.png'
import deflated from '../assets/emoji/deflated.png'
import distressed from '../assets/emoji/distressed.png'
import miserable from '../assets/emoji/miserable.png'
import veryHappy from '../assets/emoji/very-happy.png'
import extremelyHappy from '../assets/emoji/extremely-happy.png'
import amazinglyHappy from '../assets/emoji/amazingly-happy.png'
import ecstatic from '../assets/emoji/ecstatic.png'
import exasperated from '../assets/emoji/exasperated.png'
import sarcastic from '../assets/emoji/sarcastic.png'
import tired from '../assets/emoji/tired.png'
import exhausted from '../assets/emoji/exhausted.png'
import surprised from '../assets/emoji/surprised.png'
import nervous from '../assets/emoji/nervous.png'
import overwhelmed from '../assets/emoji/overwhelmed.png'
import terrified from '../assets/emoji/terrified.png'
import submit from '../assets/submit-icon.png'

const translations = {
    English: { addNote: "Add Note..." },
    Spanish: { addNote: "Añadir nota..." },
    German: { addNote: "Notiz hinzufügen..." },
    French: { addNote: "Ajouter une note..." },
    Chinese: { addNote: "添加备注..." }
};

export default function MoodSelection({ language = "English", theme = "light", moodData, onMoodUpdate }) {
    const { date } = useParams();

    const [imageSrc, setImageSrc] = useState([]);  // Store sub-row images based on mood
    const [rowOpacity, setRowOpacity] = useState(Array(5).fill(1));  // Set initial opacity of row images to 1
    const [subRowOpacity, setSubRowOpacity] = useState(Array(5).fill(1));  // Sub-row opacity starts at 1
    const [hoveredMood, setHoveredMood] = useState('');  // State to track the hovered main row mood
    const [hoveredSubMood, setHoveredSubMood] = useState('');  // State to track the hovered sub row mood

    const moodEntry = moodData[date] || { mood: '', notes: '', intensity: "N/A", subMood: '' };

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

    /*const [selectedMood, setSelectedMood] = useState('');  // Selected main mood
    const [selectedSubMood, setSelectedSubMood] = useState('');  // Selected sub-mood
    const [note, setNote] = useState('');  // The note entered by the user
    const [moodIntensity, setMoodIntensity] = useState(moodEntry.intensity);*/

    const [selectedMood, setSelectedMood] = useState(moodEntry.mood)
    const [note, setNote] = useState(moodEntry.notes);
    const [selectedSubMood, setSelectedSubMood] = useState(moodEntry.subMood);  // New state for sub-emoji
    const [moodIntensity, setMoodIntensity] = useState(moodEntry.intensity);

    useEffect(() => {
        if (moodData[date]) {
            setSelectedMood(moodData[date].mood);
            setMoodIntensity(moodData[date].intensity);
            setNote(moodData[date].notes);
        } else {
            setSelectedMood('');
            setMoodIntensity('N/A');
            setNote('');
        }
    }, [date, moodData]);

    const setMoodImages = (images, activeIndex) => {
        setImageSrc(images);  // Set sub-row images
        setRowOpacity(prev => prev.map((_, i) => (i === activeIndex ? 1 : 0.5)));  // Change opacity of row images on click
        resetSubRowOpacity();
    };

    const resetSubRowOpacity = () => {
        setSubRowOpacity(Array(5).fill(1));  // Reset sub-row images' opacity to 1
    };

    const t = translations[language];

    const moods = {
        angry: { rowImg: veryAngry, subImages: [annoyed, frustrated, angry, veryAngry, extremelyAngry] },
        sad: { rowImg: sad, subImages: [upset, sad, deflated, distressed, miserable] },
        happy: { rowImg: happy, subImages: [happy, veryHappy, extremelyHappy, amazinglyHappy, ecstatic] },
        bored: { rowImg: bored, subImages: [bored, exasperated, sarcastic, tired, exhausted] },
        scared: { rowImg: scared, subImages: [surprised, nervous, overwhelmed, scared, terrified] }
    };

    const handleMoodChange = (mood, subImages, activeIndex) => {
        setSelectedMood(mood);
        setMoodImages(subImages, activeIndex);
        setMoodIntensity(moodIntensityMap[mood] || 'N/A');
    };

    // Function to capitalize every word in the image name
    const extractMoodNameFromImage = (image) => {
        const imageName = image.toString().split('/').pop().split('.')[0];  // Extracts name from path or variable
        return imageName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleSubRowClick = (index) => {
        setSubRowOpacity(prev => prev.map((_, i) => (i === index ? 1 : 0.5)));  // Update only sub-row images' opacity
    };

    const handleSubmit = () => {
        onMoodUpdate(date, { mood: selectedMood, intensity: moodIntensity, notes: note });
    };

    return (
        <html>
            <div id='container' className={theme}>
                <div id='row'>
                    {Object.keys(moods).map((mood, index) => (
                        <div key={mood} style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                id={mood}
                                className="column"
                                onClick={() => handleMoodChange(mood, moods[mood].subImages, index)}
                                onMouseEnter={() => setHoveredMood(mood)}  // Set hovered mood on mouse enter
                                onMouseLeave={() => setHoveredMood('')}  // Clear hovered mood on mouse leave
                                alt={mood}
                                src={moods[mood].rowImg}
                                style={{ opacity: rowOpacity[index] }}  // Row opacity updates on click
                            />
                            {hoveredMood === mood && (
                                <span id="emojiLabel">
                                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div id="subRow">
                    {imageSrc.map((src, index) => (
                        <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                id={`sub${index}`}
                                className="subColumn"
                                onClick={() => handleSubRowClick(index)}
                                onMouseEnter={() => setHoveredSubMood(extractMoodNameFromImage(src))}  // Extract name from sub-image
                                onMouseLeave={() => setHoveredSubMood('')}  // Clear hovered sub-row mood on mouse leave
                                alt=""
                                src={src}
                                style={{ opacity: subRowOpacity[index] }}  // Only update sub-row opacity
                            />
                            {hoveredSubMood === extractMoodNameFromImage(src) && (
                                <span id='emojiLabel'>
                                    {hoveredSubMood}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div id="flexContainer">
                    <textarea id="log" placeholder={t.addNote} className={theme} onChange={(e) => setNote(e.target.value)} />

                    <Link to="/">
                        <img id="submit" className={theme} alt="submit" src={submit} onClick={handleSubmit} />
                    </Link>
                </div>
            </div>
        </html>
    );
}