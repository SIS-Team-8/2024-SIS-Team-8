import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './Profile.css';

const translations = {
    English: { resetPassword: "Reset Password", logOut: "Log Out", saveChanges: "Save Changes", goHome: "Go Home", name: "Name", phone: "Phone", address: "Address" },
    Spanish: { resetPassword: "Restablecer Contraseña", logOut: "Cerrar Sesión", saveChanges: "Guardar Cambios", goHome: "Volver al Inicio", name: "Nombre", phone: "Teléfono", address: "Dirección" },
    German: { resetPassword: "Passwort zurücksetzen", logOut: "Ausloggen", saveChanges: "Änderungen speichern", goHome: "Zur Startseite", name: "Name", phone: "Telefon", address: "Adresse" },
    French: { resetPassword: "Réinitialiser le mot de passe", logOut: "Se déconnecter", saveChanges: "Enregistrer les modifications", goHome: "Retour à l'accueil", name: "Nom", phone: "Téléphone", address: "Adresse" },
    Chinese: { resetPassword: "重设密码", logOut: "登出", saveChanges: "保存更改", goHome: "回到主页", name: "姓名", phone: "电话", address: "地址" }
};

export default function Profile({theme, language}) {
    // State to manage profile data
    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const [avatarPhoto, setAvatarPhoto] = useState("https://via.placeholder.com/100");

    const { name, phone, address} = profile;

    const fileUploadRef = useRef();

    const handleImageUpload = () => {
        fileUploadRef.current.click();
    }
    
    const uploadImageDisplay = () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setAvatarPhoto(cachedURL);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleError = (err) =>
        toast.error(err, {
    });

    const handleSuccess = (msg) =>
        toast.success(msg, {
    });

    const handleEditProfile = async () => {
        // Logic for editing the profile
        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/profile",
                {
                    "name": profile.name,
                    "phone": profile.phone,
                    "address": profile.address
                },
            { withCredentials: true }
            );
            const { success, message} = data;
            if (success) {
                handleSuccess(message);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const t = translations[language];

    return (
        <div className={`profile-container ${theme}`}>
            {/* Profile Information Section */}
            <div className="profile-avatar">
                <button id="profile-button" onClick={handleImageUpload}>
                    <img src={avatarPhoto} alt="Profile Avatar"/>
                </button>
                <input type="file" name="avatarPhoto" accept=".png, .jpeg" ref={fileUploadRef} onChange={uploadImageDisplay} hidden/>
            </div>
            <div className="profile-details">
                {/* Name Field */}
                <div className="profile-field">
                    <label htmlFor="name">{t.name}</label>
                    <input id="name" type="text" name="name" value={name} onChange={handleOnChange} placeholder="Johnny Appleseed" />
                </div>

                {/* Phone Field */}
                <div className="profile-field">
                    <label htmlFor="phone">{t.phone}</label>
                    <input id="phone" type="tel" name="phone" value={phone} onChange={handleOnChange} placeholder="+888 555 5512" />
                </div>

                {/* Address Field */}
                <div className="profile-field">
                    <label htmlFor="address">{t.address}</label>
                    <input id="address" type="text" name="address" value={address} onChange={handleOnChange} placeholder="11 Infinite Loop Cupertino, CA 95014" />
                </div>

                <div className="edit-profile-section">
                    <Link to="/reset-password">
                        <button id="navigation-button">{t.resetPassword}</button>
                    </Link>

                    <Link to="/login">
                        <button id="navigation-button">{t.logOut}</button>
                    </Link>

                    <button id="navigation-button" onClick={handleEditProfile}>{t.saveChanges}</button>

                    {/* Home Button */}
                    <Link to="/">
                        <button id="navigation-button">{t.goHome}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}