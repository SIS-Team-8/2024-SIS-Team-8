import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Profile.css';

export default function Profile() {
    // State to manage profile data
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleEditProfile = () => {
        // Logic for editing the profile
        alert("Changes saved.");
    };

    return (
        <div className="profile-container">
            {/* Profile Information Section */}
            <div className="profile-avatar">
                <img src="https://via.placeholder.com/100" alt="Profile Avatar" />
            </div>
            <div className="profile-details">
                {/* Name Field */}
                <div className="profile-field">
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Johnny Appleseed" />
                </div>

                {/* Phone Field */}
                <div className="profile-field">
                    <label htmlFor="phone">Phone:</label>
                    <input id="phone" name="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="+888 555 5512" />
                </div>

                {/* Address Field */}
                <div className="profile-field">
                    <label htmlFor="address">Address:</label>
                    <input id="address" name="address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} placeholder="11 Infinite Loop Cupertino, CA 95014" />
                </div>

                <div className="edit-profile-section">
                    <button id="navigation-button">Reset Password</button>

                    <Link to="/login">
                        <button id="navigation-button">Log Out</button>
                    </Link>

                    <button id="navigation-button" onClick={handleEditProfile}>Save Changes</button>

                    {/* Home Button */}
                    <Link to="/">
                        <button id="navigation-button">Go Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}