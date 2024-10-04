import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import './Onboarding.css'

export default function Onboarding({ onComplete }) {
    const handleOnboardingComplete = () => {
        onComplete();
    };

    return (
        <div id="onboarding-container">
            <img src={logo} id="app-logo" alt="logo" />
            <h1>Welcome to EmoteLog!</h1>
            <p>"Emoji's can tell a thousand words"</p>
            <p>
                <Link to="/">
                    <button id="onboarding-button" onClick={handleOnboardingComplete}>Skip Introduction</button> 
                </Link> <Link to="/onboarding-overview" >
                    <button id="onboarding-button" onClick={handleOnboardingComplete}>Continue with Introduction</button>
                </Link>
            </p>
        </div>
    )
}