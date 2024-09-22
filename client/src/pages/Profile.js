import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Profile.css'; // Ensure CSS file exists for styling

function Profile() {
    // State for managing profile details (name, email, other details)
    const [profile, setProfile] = useState({
        name: 'Ishaan Verma',  // Replace with actual user data
        email: 'ishaan.verma@example.com',  // Replace with actual user data
        otherDetails: ['Address: Sydney', 'Phone: +61 123 456 789', 'DOB: 01-01-1998'], // Sample data
    });

    const handleEditProfile = () => {
        // Logic for editing the profile
        alert("Edit Profile Clicked");
    };

    return (
        <div className="profile-container">
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Profile Screen</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* Left Section (Buttons) */}
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
                        {/* Placeholder for user profile image */}
                        <img src="https://via.placeholder.com/100" alt="Profile" />
                    </div>
                    <div className="profile-details">
                        <p><b>Name:</b> {profile.name}</p>
                        <p><b>Email:</b> {profile.email}</p>

                        {/* Other details */}
                        <div className="other-details">
                            <h3>Other Details</h3>
                            {profile.otherDetails.map((detail, index) => (
                                <p key={index}>{detail}</p>
                            ))}
                        </div>

                        {/* Settings */}
                        <div className="settings-details">
                            <h3>Settings</h3>
                            <p>Notification Preferences: Enabled</p>
                            <p>Privacy Settings: High</p>
                            <p>Language: English</p>
                        </div>

                        {/* Edit Profile Button */}
                        <div className="edit-profile-section">
                            <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
