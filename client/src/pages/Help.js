import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './help.css'; // Ensure this CSS file exists for styling

function Help() {
    // State to manage which FAQ is expanded
    const [expanded, setExpanded] = useState(null);

    // Example categorized FAQs
    const categories = {
        "Login Issues": [
            { question: "How do I reset my password?", answer: "Reset" },
            { question: "How can I recover my username?", answer: "Recover" },
            { question: "Why can't I log in?", answer: "Check credentials or internet connection" },
            { question: "What happens if I forget my password?", answer: "Use the 'Forgot Password' option" },
        ],
        "Settings": [
            { question: "How can I change my notification preferences?", answer: "Change" },
            { question: "How do I switch to dark mode?", answer: "Switch" },
            { question: "How do I update my language preferences?", answer: "Go to 'Settings' > 'Language Preferences'" },
            { question: "How can I modify privacy settings?", answer: "Adjust in the 'Privacy Settings' section" },
        ],
        "Support and Help": [
            { question: "What should I do if I encounter a bug?", answer: "Report" },
            { question: "How can I contact customer support?", answer: "Contact" },
            { question: "What to do if my account is hacked?", answer: "Contact Support immediately" },
            { question: "How can I view the help guide?", answer: "Visit the 'Help' section for detailed guides" },
        ],
        "Profile Settings": [
            { question: "How can I update my profile information?", answer: "Update" },
            { question: "How do I delete my account?", answer: "Delete" },
            { question: "How can I change my email address?", answer: "Go to 'Profile' > 'Edit Profile'" },
            { question: "How do I reset my password?", answer: "Visit 'Profile' and select 'Reset Password'" },
        ],
        "Onboarding": [
            { question: "How do I skip the introduction?", answer: "Select 'Skip Introduction'" },
            { question: "What happens during onboarding?", answer: "You'll be guided through app features" },
            { question: "Can I revisit the onboarding later?", answer: "Yes, from the 'Help' section" },
        ],
        "Daily View": [
            { question: "How do I log today's mood?", answer: "Click 'Log Daily Emotion' on the home screen" },
            { question: "How do I view past moods?", answer: "Go to 'History' or 'Daily View' from the home screen" },
        ],
        "Logout": [
            { question: "How do I confirm logout?", answer: "Click 'Confirm Logout' to exit the session" },
            { question: "Can I cancel logout?", answer: "Yes, select 'Cancel' to return to the home screen" },
        ],
    };

    // Toggle expanded FAQ
    const toggleFaq = (category, index) => {
        const key = `${category}-${index}`;
        setExpanded(expanded === key ? null : key);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'left' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Help Screen</h1>

            <div style={{ margin: '0 auto', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* FAQ Section */}
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Frequently Asked Questions (FAQ)</h2>
                    
                    {Object.keys(categories).map((category, catIndex) => (
                        <div key={catIndex} style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>{category}</h3>
                            <ul style={{ listStyle: 'none', padding: '0', fontSize: '16px' }}>
                                {categories[category].map((faq, index) => (
                                    <li key={index} style={{ marginBottom: '10px', cursor: 'pointer', borderBottom: '1px dashed #000', paddingBottom: '5px' }} onClick={() => toggleFaq(category, index)}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {faq.question}
                                            <span>{expanded === `${category}-${index}` ? '▼' : '►'}</span>
                                        </div>
                                        {expanded === `${category}-${index}` && (
                                            <div style={{ marginTop: '5px', paddingLeft: '20px', color: '#555' }}>{faq.answer}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Support Section */}
                <div style={{ flex: '1', marginLeft: '20px' }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Contact Support</h2>
                    <p style={{ margin: '10px 0', fontSize: '16px' }}>For support with using this program, please:</p>
                    <p style={{ margin: '10px 0', fontSize: '16px' }}>Email: support@example.com</p>
                    <p style={{ margin: '10px 0', fontSize: '16px' }}>Chat: Available 9am-5pm</p>
                </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Link to="/">
                    <button style={{ padding: '10px 20px', fontSize: '16px' }}>Home Page</button>
                </Link>
            </div>
        </div>
    );
}

export default Help;