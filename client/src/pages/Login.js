import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './Login.css';

const translations = {
    English: { username: "Username", password: "Password", login: "Login", signUp: "Sign Up" },
    Spanish: { username: "Nombre de usuario", password: "Contraseña", login: "Iniciar sesión", signUp: "Regístrate" },
    German: { username: "Benutzername", password: "Passwort", login: "Anmelden", signUp: "Registrieren" },
    French: { username: "Nom d'utilisateur", password: "Mot de passe", login: "Connexion", signUp: "S'inscrire" },
    Chinese: { username: "用户名", password: "密码", login: "登录", signUp: "注册" }
};

export default function Login({ language, theme }) {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
    });

    const { username, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => toast.error(err, {});

    const handleSuccess = (msg) => toast.success(msg, {});

    const handleSubmit = async (e) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/login",
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
                    navigate("/");
                });
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }

        setInputValue({
            ...inputValue,
            username: "",
            password: ""
        });
    };

    const t = translations[language] || translations.English;

    return (
        <div id="login-container" className={theme}>
            <img src={logo} alt="App Logo" id="logo"/>

            <div id="inputBox" className={theme}>
                <form>
                    <input id="userBox" type="text" name="username" value={username} placeholder={t.username} onChange={handleOnChange} className={theme}></input>
                    <p></p>
                    <input id="passBox" type="password" name="password" value={password} placeholder={t.password} onChange={handleOnChange} className={theme}></input>
                </form>

                <button id="button" className={theme} onClick={handleSubmit}>{t.login}</button>

                <p id="bottomText" className={theme}>
                    <Link to="/sign-up" id="link">{t.signUp}</Link>
                </p>
            </div>
        </div>
    );
}