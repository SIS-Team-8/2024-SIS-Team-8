import React from 'react';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import './Login.css';

const translations = {
    English: { username: "Username", password: "Password", login: "Login", signUp: "Sign Up", forgotPassword: "Forgot password?" },
    Spanish: { username: "Nombre de usuario", password: "Contraseña", login: "Iniciar sesión", signUp: "Regístrate", forgotPassword: "¿Olvidaste tu contraseña?" },
    German: { username: "Benutzername", password: "Passwort", login: "Anmelden", signUp: "Registrieren", forgotPassword: "Passwort vergessen?" },
    French: { username: "Nom d'utilisateur", password: "Mot de passe", login: "Connexion", signUp: "S'inscrire", forgotPassword: "Mot de passe oublié?" },
    Chinese: { username: "用户名", password: "密码", login: "登录", signUp: "注册", forgotPassword: "忘记密码？" }
};

export default function Login({ onLogin, language}) {

    const t = translations[language];

    const handleLoginClick = () => {
        onLogin();
    };

    return (
        <div id="login-container">
            <img src={logo} alt="App Logo" id="logo"/>

            <div id="inputBox">
                <form>
                    <input id="userBox" placeholder={t.username}></input>
                    <p></p>
                    <input id="passBox" placeholder={t.password} type="password"></input>
                </form>

                <button id="button" onClick={handleLoginClick}>{t.login}</button>

                <p id="bottomText">
                    <Link to="/sign-up" id="link">{t.signUp}</Link>
                    <Link id="forgotPassword">{t.forgotPassword}</Link>
                </p>
            </div>
        </div>
    );
}