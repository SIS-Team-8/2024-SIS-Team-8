import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './profile.css';

export default function Profile() {
    // State to manage profile data
    const [profile, setProfile] = useState({
        name: 'Ishaan Verma',
        email: 'ishaan.verma@example.com',
        phone: '+61 123 456 789',
        address: '123 Sydney Street, Sydney, NSW',
    });

    const handleEditProfile = () => {
        // Logic for editing the profile
        alert("Edit Profile Clicked");
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profile Screen</h1>
            </div>

            {/* Left Menu Section */}
            <div className="left-menu">
                <button className="menu-button">Settings</button>
                <button className="menu-button">Notification Settings</button>
                <button className="menu-button">Reset Password</button>
                <button className="menu-button">Log Out</button>
                <Link to="/">
                    <button className="menu-button">Home Page</button>
                </Link>
            </div>

            {/* Profile Information Section */}
            <div className="profile-info">
                <div className="profile-avatar">
                    <img src="https://via.placeholder.com/100" alt="Profile Avatar" />
                </div>
                <div className="profile-details">
                    {/* Name Field */}
                    <div className="profile-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="profile-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="profile-field">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            id="phone"
                            name="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                    </div>

                    {/* Address Field */}
                    <div className="profile-field">
                        <label htmlFor="address">Address:</label>
                        <input
                            id="address"
                            name="address"
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        />
                    </div>

                    <div className="edit-profile-section">
                        <button className="edit-profile-button" onClick={handleEditProfile}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
