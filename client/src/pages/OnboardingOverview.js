import { Link } from "react-router-dom";
import { useState } from 'react';
import './Onboarding.css';
import logDailyEmotion from '../assets/log-daily-emotion.png';
import moodLogging from '../assets/mood-logging.png';
import menu from '../assets/menu.png';
import history from '../assets/history.png';
import calendar from '../assets/calendar.png';
import dailyView from '../assets/daily-view.png';

const images = [logDailyEmotion, moodLogging, menu, calendar, dailyView, history];

const translations = {
    English: {
        title: "Emotelog Overview",
        paragraphs: [
            'To begin your journaling select "Log Daily Emotion".',
            "Select how you are feeling and submit the entry. If you choose you can add a custom note and upload an image. Entries can be edited at any time.",
            "Other features such as the calendar or history page can be accessed through the menu on the top right corner.",
            "The calendar allows you to view your past entries through each month or year.",
            "Selecting an entry from the calendar brings you to the daily view. This screen allows you to view any notes or images inputted into the entry.",
            "History allows you to view the frequency of your emotions in a particular week, month or year."
        ],
        back: "Back",
        next: "Next",
        goHome: "Go Home"
    },
    Spanish: {
        title: "Descripción general de Emotelog",
        paragraphs: [
            'Para comenzar tu diario, selecciona "Registrar emoción diaria".',
            "Selecciona cómo te sientes y envía la entrada. Si lo deseas, puedes agregar una nota personalizada y subir una imagen. Las entradas se pueden editar en cualquier momento.",
            "Otras funciones, como la página de calendario o historial, se pueden acceder a través del menú en la esquina superior derecha.",
            "El calendario te permite ver tus entradas pasadas por mes o año.",
            "Seleccionar una entrada del calendario te lleva a la vista diaria. Esta pantalla te permite ver cualquier nota o imagen incluida en la entrada.",
            "El historial te permite ver la frecuencia de tus emociones en una semana, mes o año."
        ],
        back: "Atrás",
        next: "Siguiente",
        goHome: "Ir a Inicio"
    },
    German: {
        title: "Überblick über Emotelog",
        paragraphs: [
            'Um mit dem Tagebuch zu beginnen, wähle "Tägliche Emotion aufzeichnen".',
            "Wähle aus, wie du dich fühlst, und sende den Eintrag ab. Falls gewünscht, kannst du eine Notiz hinzufügen und ein Bild hochladen. Einträge können jederzeit bearbeitet werden.",
            "Weitere Funktionen wie der Kalender oder die Verlauf-Seite können über das Menü in der oberen rechten Ecke aufgerufen werden.",
            "Der Kalender ermöglicht es, vergangene Einträge nach Monat oder Jahr zu betrachten.",
            "Das Auswählen eines Eintrags aus dem Kalender führt zur Tagesansicht. Dieser Bildschirm zeigt alle hinzugefügten Notizen oder Bilder des Eintrags an.",
            "Im Verlauf kann die Häufigkeit der Emotionen innerhalb einer Woche, eines Monats oder eines Jahres eingesehen werden."
        ],
        back: "Zurück",
        next: "Weiter",
        goHome: "Nach Hause"
    },
    French: {
        title: "Vue d'ensemble d'Emotelog",
        paragraphs: [
            'Pour commencer votre journal, sélectionnez "Enregistrer l\'émotion du jour".',
            "Sélectionnez votre état d'esprit et soumettez l'entrée. Vous pouvez ajouter une note personnalisée et télécharger une image si vous le souhaitez. Les entrées peuvent être modifiées à tout moment.",
            "D'autres fonctionnalités, telles que le calendrier ou la page d'historique, sont accessibles via le menu en haut à droite.",
            "Le calendrier vous permet de consulter vos entrées passées par mois ou par année.",
            "Sélectionner une entrée dans le calendrier vous amène à la vue quotidienne. Cet écran permet de voir toutes les notes ou images ajoutées à l'entrée.",
            "L'historique permet de voir la fréquence de vos émotions sur une semaine, un mois ou une année."
        ],
        back: "Retour",
        next: "Suivant",
        goHome: "Accueil"
    },
    Chinese: {
        title: "Emotelog 概述",
        paragraphs: [
            '开始你的日记，选择“记录每日情绪”。',
            "选择你的情绪并提交条目。你可以添加自定义备注并上传图片。条目可以随时编辑。",
            "其他功能（如日历或历史记录页面）可以通过右上角的菜单访问。",
            "日历允许你按月或年查看过去的条目。",
            "从日历中选择一个条目可以进入每日视图。此页面允许查看条目中的备注或图片。",
            "历史记录允许查看你在某一周、月或年中的情绪频率。"
        ],
        back: "返回",
        next: "下一步",
        goHome: "回到主页"
    }
};

export default function OnboardingOverview({ language = "English" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const t = translations[language] || translations.English;

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const back = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div id="onboarding-container">
            <h1>{t.title}</h1>
            <p>{t.paragraphs[currentIndex]}</p>
            <div id="image-button-container">
                <button id="swap-button" onClick={back}>{t.back}</button>
                <img id="onboarding-image" src={images[currentIndex]} alt="Onboarding" />
                <button id="swap-button" onClick={next}>{t.next}</button>
            </div>
            <Link to="/">
                <button id="home-button">{t.goHome}</button>
            </Link>
        </div>
    );
}