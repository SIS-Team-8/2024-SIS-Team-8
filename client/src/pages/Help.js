import React from 'react';
import { Link } from "react-router-dom";
import './help.css';

function Help() {
    return (
        <div className="help-screen">
        <h1 className="help-title">Help Screen</h1>
        <div className="help-content">
            <div className="faq-section">
                <h2>Frequently Asked Questions (FAQ)</h2>
                <ul className="faq-list">
                    <li>----------------------------------------</li>
                    <li>----------------------------------------</li>
                    <li>----------------------------------------</li>
                    <li>----------------------------------------</li>
                    <li>----------------------------------------</li>
                    <li>----------------------------------------</li>
                </ul>
            </div>
            <div className="support-section">
                <h2>Contact Support</h2>
                <p>For support with using this program, please:</p>
                <p>Email: ----------@gmail.com</p>
                <p>Chat: --------------------</p>
            </div>
        </div>
        <Link to="/">
            <button className="home-button">Home Page</button>
        </Link>
    </div>
    );
}

export default Help;
/*export default function Help() {
    return <h1>Help</h1>
}*/