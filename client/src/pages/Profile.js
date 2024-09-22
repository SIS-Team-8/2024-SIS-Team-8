import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './profile.css';  

export default function Profile() {
    const navigate = useNavigate();

    // State to manage profile data
    const [profile, setProfile] = useState({
        name: 'Ishaan Verma',
        email: 'ishaan.verma@example.com',
        phone: '+61 123 456 789',
        address: '123 Sydney Street, Sydney, NSW',
    });

    // Handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveChanges = () => {
        // Logic to save changes (e.g., API call)
        console.log('Profile updated: ', profile);
        // Optionally, redirect or show a success message
    };

    return (
        <div className="profile-container">
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Profile Screen</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                        {/* Placeholder for user profile image */}
                        <img src="https://via.placeholder.com/100" alt="Profile Avatar" />
                    </div>
                    <div className="profile-details">
                        <form>
                            <input
                                id="nameBox"
                                placeholder="Name"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                            />
                            <p></p>
                            <input
                                id="emailBox"
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                            />
                            <p></p>
                            <input
                                id="phoneBox"
                                placeholder="Phone Number"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                            />
                            <p></p>
                            <input
                                id="addressBox"
                                placeholder="Address"
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                            />
                        </form>

                        {/* Save Profile Button */}
                        <div className="edit-profile-section">
                            <button className="edit-profile-button" onClick={handleSaveChanges}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}