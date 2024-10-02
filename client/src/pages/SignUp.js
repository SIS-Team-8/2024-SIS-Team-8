import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import './SignUp.css';

export default function SignUp() {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/login");
    };

    return (
        <div id="signup-container">
            <img src={logo} alt="App Logo" id="logo" />

            <div id="inputBox">
                <form>
                    <input id="userBox" placeholder="Username"></input>
                    <p></p>
                    <input id="passBox" placeholder="Password" type="password"></input>
                    <p></p>
                    <input id="passBox" placeholder="Confirm Password" type="password"></input>
                </form>

                <button id="button" onClick={handleSignUpClick}>Create Account</button>

                <p id="bottomText">
                    <Link to="/login" id="link">Login</Link>
                </p>
            </div>
        </div>
    );
}