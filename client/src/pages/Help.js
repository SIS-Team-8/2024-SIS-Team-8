import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './help.css';

function Help() {

    const [expanded, setExpanded] = useState(null);

    const faqs = [
        { question: "How do I reset my password?", answer: "Reset" },
        { question: "How can I update my profile information?", answer: "Update" },
        { question: "What should I do if I encounter a bug?", answer: "Report" },
        { question: "How can I delete my account?", answer: "Delete" },
    ];

    const toggleFaq = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div className="help-screen">
            <h1 className="help-title">Help Screen</h1>
            <div className="help-content">
                <div className="columns">
                    <div className="faq-section column">
                        <h2>Frequently Asked Questions (FAQ)</h2>
                        <ul className="faq-list">
                            {faqs.map((faq, index) => (
                                <li key={index} className="faq-item" onClick={() => toggleFaq(index)}>
                                    <div className="faq-question">
                                        {faq.question}
                                        <span className="arrow">{expanded === index ? '▼' : '►'}</span>
                                    </div>
                                    {expanded === index && (
                                        <div className="faq-answer">{faq.answer}</div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="support-section column">
                        <h2>Contact Support</h2>
                        <p>For support with using this program, please:</p>
                        <p>Email: support@example.com</p>
                        <p>Chat: Available 9am-5pm</p>
                    </div>
                </div>
            </div>
            <Link to="/">
                <button className="home-button">Home Page</button>
            </Link>
        </div>
    );
}

export default Help;
