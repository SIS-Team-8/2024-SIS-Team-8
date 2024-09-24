import React, { useState } from 'react';
import BarChart from '../components/BarChart';
import { Link } from "react-router-dom";
import './History.css';

export default function History() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8));

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    return (
        <div id="history-container">
            <h1>History</h1>
            <div className="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>
            <BarChart/>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">Go Home</button>
                </Link>
            </div>
        </div>
    );
}