import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import './SignUp.css';

const translations = {
    English: { email: "Email", username: "Username", password: "Password", confirmPassword: "Confirm Password", createAccount: "Create Account", login: "Login" },
    Spanish: { email: "Correo Electrónico", username: "Nombre de usuario", password: "Contraseña", confirmPassword: "Confirmar Contraseña", createAccount: "Crear cuenta", login: "Iniciar sesión" },
    German: { email: "E-Mail", username: "Benutzername", password: "Passwort", confirmPassword: "Passwort bestätigen", createAccount: "Konto erstellen", login: "Anmelden" },
    French: { email: "E-mail", username: "Nom d'utilisateur", password: "Mot de passe", confirmPassword: "Confirmer le mot de passe", createAccount: "Créer un compte", login: "Connexion" },
    Chinese: { email: "电子邮件", username: "用户名", password: "密码", confirmPassword: "确认密码", createAccount: "创建账户", login: "登录" }
};

export default function SignUp( {language, theme }) {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/login");
    };

    const t = translations[language] || translations.English;

    return (
        <div id="signup-container" className={theme}>
            <img src={logo} alt="App Logo" id="logo" />

            <div id="inputBox">
                <form>
                    <input id="emailBox" placeholder={t.email} type="email" className={theme}></input>
                    <p></p>
                    <input id="userBox" placeholder={t.username} className={theme}></input>
                    <p></p>
                    <input id="passBox" placeholder={t.password} type="password" className={theme}></input>
                    <p></p>
                    <input id="passBox" placeholder={t.confirmPassword} type="password" className={theme}></input>
                </form>

                <button id="button" onClick={handleSignUpClick}>{t.createAccount}</button>

                <p id="bottomText">
                    <Link to="/login" id="link" className={theme}>{t.login}</Link>
                </p>
            </div>
        </div>
    );
}