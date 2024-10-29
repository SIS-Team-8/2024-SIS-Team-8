import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import './ResetPassword.css';

const translations = {
    English: { currentPassword: "Current Password", newPassword: "New Password", confirmPassword: "Confirm Password", changePassword: "Change Password", home: "Home" },
    Spanish: { currentPassword: "Contraseña actual", newPassword: "Nueva contraseña", confirmPassword: "Confirmar contraseña", changePassword: "Cambiar contraseña", home: "Inicio" },
    German: { currentPassword: "Aktuelles Passwort", newPassword: "Neues Passwort", confirmPassword: "Passwort bestätigen", changePassword: "Passwort ändern", home: "Startseite" },
    French: { currentPassword: "Mot de passe actuel", newPassword: "Nouveau mot de passe", confirmPassword: "Confirmer le mot de passe", changePassword: "Changer le mot de passe", home: "Accueil" },
    Chinese: { currentPassword: "当前密码", newPassword: "新密码", confirmPassword: "确认密码", changePassword: "更改密码", home: "首页" }
};

export default function ResetPassword( {language, theme }) {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const { currentPassword, newPassword, confirmPassword } = inputValue;
    const t = translations[language] || translations.English;

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
                    <input id="passBox" name="currentPassword" value={currentPassword} placeholder={t.currentPassword} type="password" onChange={handleOnChange} className={theme}></input>
                    <p></p>
                    <input id="passBox" name="newPassword" value={newPassword} placeholder={t.newPassword} type="password" onChange={handleOnChange} className={theme}></input>
                    <p></p>
                    <input id="passBox" name="confirmPassword" value={confirmPassword} placeholder={t.confirmPassword} type="password" onChange={handleOnChange} className={theme}></input>
                </form>

                <button id="button" onClick={handleSubmit}>{t.changePassword}</button>

                <p id="bottomText">
                    <Link to="/" id="link" className={theme}>{t.home}</Link>
                </p>
            </div>
        </div>
    );
}