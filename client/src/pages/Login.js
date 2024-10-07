import React from 'react';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import './Login.css';

const translations = {
    English: { username: "Username", password: "Password", login: "Login", signUp: "Sign Up" },
    Spanish: { username: "Nombre de usuario", password: "Contraseña", login: "Iniciar sesión", signUp: "Regístrate" },
    German: { username: "Benutzername", password: "Passwort", login: "Anmelden", signUp: "Registrieren" },
    French: { username: "Nom d'utilisateur", password: "Mot de passe", login: "Connexion", signUp: "S'inscrire" },
    Chinese: { username: "用户名", password: "密码", login: "登录", signUp: "注册" }
};

export default function Login({ onLogin, language, theme }) {

    const t = translations[language] || translations.English;

    const handleLoginClick = () => {
        onLogin();
    };

    return (
        <div id="login-container" className={theme}>
            <img src={logo} alt="App Logo" id="logo"/>

            <div id="inputBox" className={theme}>
                <form>
                    <input id="userBox" className={theme} placeholder={t.username}></input>
                    <p></p>
                    <input id="passBox" className={theme} placeholder={t.password} type="password"></input>
                </form>

                <button id="button" className={theme} onClick={handleLoginClick}>{t.login}</button>

                <p id="bottomText" className={theme}>
                    <Link to="/sign-up" id="link">{t.signUp}</Link>
                </p>
            </div>
        </div>
    );
}