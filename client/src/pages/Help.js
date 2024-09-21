import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Help.css'; // Ensure this CSS file exists for styling

function Help() {
    // State to manage which category and FAQ is expanded
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [expandedFaq, setExpandedFaq] = useState(null);

    // Using the exact provided questions and answers
    const categories = {
        "Login Issues": [
            { question: "Why can't I log in?", answer: "Please check your credentials or/and your internet connection." },
            { question: "What happens if I forget my password?", answer: "You can use the 'Reset Password' option." },
        ],
        "Settings": [
            { question: "How can I change my notification preferences?", answer: "Change the notification preferences via the Settings menu." },
            { question: "How do I switch to dark mode?", answer: "Switch to Dark Mode via the Settings menu." },
            { question: "How do I update my language preferences?", answer: "Go to 'Settings' > 'Language Preferences'." },
            { question: "How can I modify privacy settings?", answer: "You can adjust your privacy settings via the Settings menu." },
        ],
        "Support and Help": [
            { question: "How can I contact customer support?", answer: "Contact the support team, using the contact details listed in the Help page." },
            { question: "What to do if my account is hacked?", answer: "Contact the support team as soon as possible." },
            { question: "How can I view the help guide?", answer: "Visit the 'Help' section for detailed guides." },
        ],
        "Profile Settings": [
            { question: "How can I update my profile information?", answer: "Click on 'Edit Profile' in the Profile page." },
            { question: "How can I change my email address?", answer: "Go to 'Profile' > 'Edit Profile'." },
            { question: "How do I reset my password?", answer: "Visit 'Profile' and then select 'Reset Password'." },
        ],
        "Onboarding": [
            { question: "How do I skip the introduction?", answer: "Select the 'Skip Introduction' button at the bottom of the screen." },
            { question: "What happens during onboarding?", answer: "You'll be guided through each of the app's core features." },
            { question: "Can I revisit the onboarding later?", answer: "Yes, via the 'Help' section." },
        ],
        "Daily View": [
            { question: "How do I log today's mood?", answer: "Click 'Log Daily Emotion' on the home screen." },
            { question: "How do I view past moods?", answer: "Go to 'History' or 'Daily View' from the home screen." },
        ],
        "Logout": [
            { question: "How do I confirm logout?", answer: "Click 'Confirm Logout' to exit the session." },
            { question: "Can I cancel logout?", answer: "Yes, select 'Cancel' to return to the home screen." },
        ],
    };

    // Toggle expanded category
    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
        setExpandedFaq(null); // Reset FAQ expansion when category changes
    };

    // Toggle expanded FAQ
    const toggleFaq = (category, index) => {
        const key = `${category}-${index}`;
        setExpandedFaq(expandedFaq === key ? null : key);
    };

    return (
        <div className="help-container">
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Help</h1>

            <div style={{ margin: '0 auto', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* FAQ Section */}
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <h2 className="custom-header">Frequently Asked Questions (FAQ)</h2>

                    {Object.keys(categories).map((category, catIndex) => (
                        <div key={catIndex} style={{ marginBottom: '20px' }}>
                            <h3 style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => toggleCategory(category)}>
                                {category}
                                <span style={{ marginLeft: '10px' }}>{expandedCategory === category ? '▼' : '►'}</span>
                            </h3>

                            {expandedCategory === category && (
                                <ul style={{ listStyle: 'none', padding: '0', fontSize: '16px' }}>
                                    {categories[category].map((faq, index) => (
                                        <li key={index} style={{ marginBottom: '10px', cursor: 'pointer', borderBottom: '1px dashed #fff', paddingBottom: '5px' }} onClick={() => toggleFaq(category, index)}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                {faq.question}
                                                <span>{expandedFaq === `${category}-${index}` ? '▼' : '►'}</span>
                                            </div>
                                            {expandedFaq === `${category}-${index}` && (
                                                <div style={{ marginTop: '5px', paddingLeft: '20px', color: '#ddd' }}>{faq.answer}</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Support Section */}
                <div style={{ flex: '1', marginLeft: '20px' }}>
                    <h2 className="custom-header">Contact Support</h2>
                    <p style={{ margin: '10px 0', fontSize: '16px' }}><u>Email:</u> support@emotelog.com</p>
                    <p style={{ margin: '10px 0', fontSize: '16px' }}><u>Support Hours:</u> Available from 9am-5pm.</p>
                </div>
            </div>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button className="button">Go Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Help;