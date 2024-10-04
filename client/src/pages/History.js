import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import { Link, useLocation } from 'react-router-dom';
import './History.css';

export default function History() {
    const location = useLocation();
    const initialMonth = location.state?.month || new Date();
    const [currentMonth, setCurrentMonth] = useState(initialMonth);

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    useEffect(() => {
        // If navigating from the Calendar, set the month from the location state
        if (location.state?.month) {
            setCurrentMonth(location.state.month);
        }
    }, [location.state?.month]);

    return (
        <div id="history-container">
            <h1>History</h1>
            <div id="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>
            <BarChart />
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">Go Home</button>
                </Link>
            </div>
        </div>
    );
}
