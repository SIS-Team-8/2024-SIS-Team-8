import { Link } from "react-router-dom";
import { useState } from 'react';
import './Onboarding.css';
import logDailyEmotion from '../assets/log-daily-emotion.png';
import moodLogging from '../assets/mood-logging.png';
import menu from '../assets/menu.png';
import history from '../assets/history.png';
import calendar from '../assets/calendar.png';
import dailyView from '../assets/daily-view.png';

export default function OnboardingOverview() {
    // Array of images and paragraphs to cycle through
    const images = [logDailyEmotion, moodLogging, menu, calendar, dailyView, history];
    const paragraphs = [
        "To begin your journaling select Log Daily Emotion",
        "Select how you are feeling and submit the entry. If you choose you can add a custom note and upload an image. Entries can be edited at any time",
        "Other features such as the calendar or history page can be accessed through the menu on the top right corner",
        "The calendar allows you to view your past entries through each month or year",
        "Selecting an entry from the calendar brings you to the daily view which allows you to view any notes or images inputed into the entry",
        "History allows you to view the frequency of your emotions in a particular week, month or year"
    ];

    // State variable to manage the current index for image and paragraph
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to swap the image and paragraph
    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through the array
    };

    const back = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Cycle backwards through the array
    };

    return (
        <div id="onboarding-container">
            <h1>Emotelog Overview</h1>
            <p>{paragraphs[currentIndex]}</p>
            <div id="image-button-container">
                <button id="swap-button" onClick={back}>Back</button>
                <img id="onboarding-image" src={images[currentIndex]} alt="Onboarding" />
                <button id="swap-button" onClick={next}>Next</button>
            </div>
            <Link to="/">
                <button id="onboarding-button">Go Home</button>
            </Link>
        </div>
    );
}
