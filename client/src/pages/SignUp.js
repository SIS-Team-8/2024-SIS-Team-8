import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import './SignUp.css';

export default function SignUp({language, theme }) {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/login");
    };

    return (
        <div id="signup-container" className={theme}>
            <img src={logo} alt="App Logo" id="logo" />

            <div id="inputBox">
                <form>
                    <input id="emailBox" placeholder="Email" type="email" className={theme}></input>
                    <p></p>
                    <input id="userBox" placeholder="Username" className={theme}></input>
                    <p></p>
                    <input id="passBox" placeholder="Password" type="password" className={theme}></input>
                    <p></p>
                    <input id="passBox" placeholder="Confirm Password" type="password" className={theme}></input>
                </form>

                <button id="button" onClick={handleSignUpClick}>Create Account</button>

                <p id="bottomText">
                    <Link to="/login" id="link" className={theme}>Login</Link>
                </p>
            </div>
        </div>
    );
}