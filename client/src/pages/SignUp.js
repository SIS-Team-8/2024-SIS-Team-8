import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import './SignUp.css';

const translations = {
    English: { username: "Username", password: "Password", confirmPassword: "Confirm Password", createAccount: "Create Account", login: "Login" },
    Spanish: { username: "Nombre de usuario", password: "Contraseña", confirmPassword: "Confirmar Contraseña", createAccount: "Crear cuenta", login: "Iniciar sesión" },
    German: { username: "Benutzername", password: "Passwort", confirmPassword: "Passwort bestätigen", createAccount: "Konto erstellen", login: "Anmelden" },
    French: { username: "Nom d'utilisateur", password: "Mot de passe", confirmPassword: "Confirmer le mot de passe", createAccount: "Créer un compte", login: "Connexion" },
    Chinese: { username: "用户名", password: "密码", confirmPassword: "确认密码", createAccount: "创建账户", login: "登录" }
};

export default function SignUp( {language, theme }) {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const { username, password, confirmPassword } = inputValue

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
        });
    
    const handleSubmit = async () => {
        if (username === "" || password === "") {
            toast.error("Enter desired username and password to create account")
        }
        else if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        else {

            try {
                const { data } = await axios.post(
                    "http://localhost:3000/api/sign-up",
                    {
                    "username": inputValue.username,
                    "password": inputValue.password
                    },
                    { withCredentials: true }
                );
                const { success, message } = data;
                if (success) {
                    handleSuccess(message);
                    setTimeout(() => {
                        navigate("/login");
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
            username: "",
            password: "",
            confirmPassword: ""
        });
    };

    const t = translations[language] || translations.English;

    return (
        <div id="signup-container" className={theme}>
            <img src={logo} alt="App Logo" id="logo" />

            <div id="inputBox">
                <form>
                    <input id="userBox" type="text" name="username" value={username} placeholder={t.username} onChange={handleOnChange} className={theme}></input>
                    <p></p>
                    <input id="passBox" type="password" name="password" value={password} placeholder={t.password} onChange={handleOnChange} className={theme}></input>
                    <p></p>
                    <input id="passBox" type="password" name="confirmPassword" value={confirmPassword} placeholder={t.confirmPassword} onChange={handleOnChange} className={theme}></input>
                </form>

                <button id="button" onClick={handleSubmit}>{t.createAccount}</button>

                <p id="bottomText">
                    <Link to="/login" id="link" className={theme}>{t.login}</Link>
                </p>
            </div>
        </div>
    );
}