import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import './ResetPassword.css';

export default function ResetPassword( {language, theme }) {
    const navigate = useNavigate();

    const handleChangePasswordClick = () => {
        navigate("/login");
    };

    return (
        <div id="reset-password-container" className={theme}>
            <img src={logo} alt="App Logo" id="logo" />

            <div id="inputBox">
                <form>
                    <input id="passBox" placeholder="currentPassword" type="password" className={theme}></input>
                    <p></p>
                    <input id="passBox" placeholder="newPassword" type="password" className={theme}></input>
                    <p></p>
                    <input id="passBox" placeholder="confirmPassword" type="password" className={theme}></input>
                </form>

                <button id="button" onClick={handleChangePasswordClick}>Change Password</button>

                <p id="bottomText">
                    <Link to="/home" id="link" className={theme}>Home</Link>
                </p>
            </div>
        </div>
    );
}