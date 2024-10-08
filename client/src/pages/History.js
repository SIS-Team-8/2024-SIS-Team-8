import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import { Link, useLocation } from 'react-router-dom';
import './History.css';

export default function History() {
    const location = useLocation();
    const initialMonth = location.state?.month || new Date();
    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [viewMode, setViewMode] = useState("monthly"); // Initialize view mode as monthly

    // Function to toggle between weekly, monthly, and yearly views
    const toggleViewMode = () => {
        const nextMode = viewMode === "monthly" ? "weekly" : viewMode === "weekly" ? "yearly" : "monthly";
        setViewMode(nextMode);
    };

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

    // Sample data for each view mode (replace with actual data logic)
    const weeklyData = [
        { name: "Angry", emoteFreq: 2 },
        { name: "Sad", emoteFreq: 1 },
        { name: "Happy", emoteFreq: 4 },
        { name: "Bored", emoteFreq: 1 },
        { name: "Scared", emoteFreq: 1 }
    ];

    const monthlyData = [
        { name: "Angry", emoteFreq: 10 },
        { name: "Sad", emoteFreq: 15 },
        { name: "Happy", emoteFreq: 20 },
        { name: "Bored", emoteFreq: 5 },
        { name: "Scared", emoteFreq: 8 }
    ];

    const yearlyData = [
        { name: "Angry", emoteFreq: 50 },
        { name: "Sad", emoteFreq: 40 },
        { name: "Happy", emoteFreq: 60 },
        { name: "Bored", emoteFreq: 30 },
        { name: "Scared", emoteFreq: 25 }
    ];

    // Select data based on the current view mode
    const chartData = viewMode === "weekly" ? weeklyData : viewMode === "yearly" ? yearlyData : monthlyData;

    return (
        <div id="history-container">
            <h1>History</h1>
            <div id="month-navigation">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>

            <button className="view-toggle-button" onClick={toggleViewMode}>
                {viewMode === "monthly" ? "Switch to Weekly View" : viewMode === "weekly" ? "Switch to Yearly View" : "Switch to Monthly View"}
            </button>

            {/* Pass the selected chart data to the BarChart component */}
            <BarChart 
                data={chartData}
                xAxisLabel="Emotions"
                yAxisLabel="Frequency"
                tooltipText="Frequency"
                barColors={["#ff746c", "#b3ebf2", "#ffee8c", "grey", "#6c3baa"]}
            />

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">Go Home</button>
                </Link>
            </div>
        </div>
    );
}
