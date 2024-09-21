import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './help.css'; // Ensure this CSS file exists for styling

function Help() {
    // State to manage which FAQ is expanded
    const [expanded, setExpanded] = useState(null);

    // Example FAQs
    const faqs = [
        { question: "How do I reset my password?", answer: "Reset" },
        { question: "How can I update my profile information?", answer: "Update" },
        { question: "What should I do if I encounter a bug?", answer: "Report" },
        { question: "How can I delete my account?", answer: "Delete" },
    ];

    // Toggle expanded FAQ
    const toggleFaq = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'left' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Help Screen</h1>

            <div style={{ margin: '0 auto', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Frequently Asked Questions (FAQ)</h2>
                    <ul style={{ listStyle: 'none', padding: '0', fontSize: '16px' }}>
                        {faqs.map((faq, index) => (
                            <li key={index} style={{ marginBottom: '10px', cursor: 'pointer', borderBottom: '1px dashed #000', paddingBottom: '5px' }} onClick={() => toggleFaq(index)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {faq.question}
                                    <span>{expanded === index ? '▼' : '►'}</span>
                                </div>
                                {expanded === index && (
                                    <div style={{ marginTop: '5px', paddingLeft: '20px', color: '#555' }}>{faq.answer}</div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

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
