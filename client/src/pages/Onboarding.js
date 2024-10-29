import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import './Onboarding.css'

const translations = {
    English: { skipIntro: "Skip Introduction", continueIntro: "Continue with Introduction", welcome: "Welcome to EmoteLog!", introDescription: "Emojis can tell a thousand words!" },
    Spanish: { skipIntro: "Omitir Introducción", continueIntro: "Continuar con la Introducción", welcome: "¡Bienvenido a EmoteLog!", introDescription: "¡Los emojis pueden decir mil palabras!" },
    German: { skipIntro: "Einführung überspringen", continueIntro: "Mit der Einführung fortfahren", welcome: "Willkommen bei EmoteLog!", introDescription: "Emojis können tausend Worte sagen!" },
    French: { skipIntro: "Passer l'Introduction", continueIntro: "Continuer avec l'Introduction", welcome: "Bienvenue sur EmoteLog !", introDescription: "Les emojis peuvent dire mille mots !" },
    Chinese: { skipIntro: "跳过介绍", continueIntro: "继续介绍", welcome: "欢迎来到EmoteLog！", introDescription: "表情符号可以传达千言万语！" }
};

export default function Onboarding({ onComplete, theme, language }) {
    const handleOnboardingComplete = () => {
        onComplete();
    };

    const t = translations[language] || translations.English;

    return (
        <div id="onboarding-container">
            <img src={logo} id="app-logo" alt="logo" />
            <h1>{t.welcome}</h1>
            <p>{t.introDescription}</p>
            <p>
                <Link to="/">
                    <button id="onboarding-button" onClick={handleOnboardingComplete}>{t.skipIntro}</button>
                </Link> <Link to="/onboarding-overview" >
                    <button id="onboarding-button" onClick={handleOnboardingComplete}>{t.continueIntro}</button>
                </Link>
            </p>
        </div>
    )
}