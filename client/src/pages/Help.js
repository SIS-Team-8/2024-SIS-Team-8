import React from 'react';
import { Link } from "react-router-dom";
import './help.css';

function Help() {
    return (
        <div className="help-screen">
            <h1 className="help-title">Help Screen</h1>
            <div className="help-content">
                <div className="faq-section">
                    <h2 className="section-title">Frequently Asked Questions (FAQ)</h2>
                    <ul className="faq-list">
                        <li>How do I reset my password?</li>
                        <li>How can I update my profile information?</li>
                        <li>What should I do if I encounter a bug?</li>
                        <li>How can I delete my account?</li>
                        <li>How do I change my notification settings?</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function Help() {
    return <h1>Help</h1>
}