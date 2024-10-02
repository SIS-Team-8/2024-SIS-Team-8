import React, { useState } from 'react';
import { Link } from "react-router-dom";
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

export default function MoodSelection() {
    const [imageSrc, setImageSrc] = useState([]);  // Store sub-row images based on mood
    const [rowOpacity, setRowOpacity] = useState(Array(5).fill(1));  // Set initial opacity of row images to 1
    const [subRowOpacity, setSubRowOpacity] = useState(Array(5).fill(1));  // Sub-row opacity starts at 1
    const [hoveredMood, setHoveredMood] = useState('');  // State to track the hovered main row mood
    const [hoveredSubMood, setHoveredSubMood] = useState('');  // State to track the hovered sub row mood

    const setMoodImages = (images, activeIndex) => {
        setImageSrc(images);  // Set sub-row images
        setRowOpacity(prev => prev.map((_, i) => (i === activeIndex ? 1 : 0.5)));  // Change opacity of row images on click
        resetSubRowOpacity();
    };

    const resetSubRowOpacity = () => {
        setSubRowOpacity(Array(5).fill(1));  // Reset sub-row images' opacity to 1
    };

    const moods = {
        angry: { 
            rowImg: veryAngry, 
            subImages: [annoyed, frustrated, angry, veryAngry, extremelyAngry]
        },
        sad: { 
            rowImg: sad, 
            subImages: [upset, sad, deflated, distressed, miserable] 
        },
        happy: { 
            rowImg: happy, 
            subImages: [happy, veryHappy, extremelyHappy, amazinglyHappy, ecstatic] 
        },
        bored: { 
            rowImg: bored, 
            subImages: [bored, exasperated, sarcastic, tired, exhausted] 
        },
        scared: { 
            rowImg: scared, 
            subImages: [surprised, nervous, overwhelmed, scared, terrified] 
        }
    };

    // Function to capitalize every word in the image name
    const extractMoodNameFromImage = (image) => {
        const imageName = image.toString().split('/').pop().split('.')[0];  // Extracts name from path or variable
        return imageName
            .split('-') // Splits name by each word
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize every word
            .join(' ');  // Join words back together with spaces
    };

    const handleSubRowClick = (index) => {
        setSubRowOpacity(prev => prev.map((_, i) => (i === index ? 1 : 0.5)));  // Update only sub-row images' opacity
    };

    return (
        <html>
            <div id='container'>
                <div id='row'>
                    {Object.keys(moods).map((mood, index) => (
                        <div key={mood} style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                id={mood}
                                className="column"
                                onClick={() => setMoodImages(moods[mood].subImages, index)}  // Pass the sub-images
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
                    <textarea id="log" placeholder='Add Note...' />
                    <Link to="/">
                        <img id="submit" alt="submit" src={submit} />
                    </Link>
                </div>
            </div>
        </html>
    );
}