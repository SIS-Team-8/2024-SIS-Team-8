import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import './ResetPassword.css';

export default function ResetPassword( {language, theme }) {
    const [inputValue, setInputValue] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const { currentPassword, newPassword, confirmPassword } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => toast.error(err, {});

    const handleSuccess = (msg) => toast.success(msg, {});

    const handleSubmit = async () => {
        if (currentPassword === "" || newPassword === "") {
            toast.error("Enter current and new password to change password")
        } else if (currentPassword === newPassword) {
            toast.error("New password cannot match current password")
        } else if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const { data } = await axios.post(
                    "http://localhost:3000/api/password",
                    {
                    "password": inputValue.newPassword
                    },
                    { withCredentials: true }
                );

                const { success, message } = data;
                
                if (success) {
                    handleSuccess(message);
                    setTimeout(() => {
                        navigate("/");
                    });
                } else {
                    handleError(message);
                }
                console.log(success);
            } catch (error) {
                console.log(error);
            }
        }

        setInputValue({
            ...inputValue,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    return (
        <div id="reset-password-container" className={theme}>
            <img src={logo} alt="App Logo" id="logo" />

            <div id="inputBox">
                <form>
                    <input id="passBox" name="currentPassword" value={currentPassword} placeholder="currentPassword" type="password" onChange={handleOnChange} className={theme}></input>
                    <p></p>
                    <input id="passBox" name="newPassword" value={newPassword} placeholder="newPassword" type="password" onChange={handleOnChange} className={theme}></input>
                    <p></p>
                    <input id="passBox" name="confirmPassword" value={confirmPassword} placeholder="confirmPassword" type="password" onChange={handleOnChange} className={theme}></input>
                </form>

                <button id="button" onClick={handleSubmit}>Change Password</button>

                <p id="bottomText">
                    <Link to="/" id="link" className={theme}>Home</Link>
                </p>
            </div>
        </div>
    );
}