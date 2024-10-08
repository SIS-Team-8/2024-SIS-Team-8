import React, { useState, useEffect } from 'react';
import BarChartComponent from '../components/BarChart';  // Import BarChart component
import { Link, useLocation } from 'react-router-dom';
import './History.css';

export default function History() {
    const location = useLocation();
    const initialMonth = location.state?.month || new Date();
    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [viewMode, setViewMode] = useState("monthly"); // Initialize view mode as monthly

    const toggleViewMode = () => {
        const nextMode = viewMode === "monthly" ? "weekly" : viewMode === "weekly" ? "yearly" : "monthly";
        setViewMode(nextMode);
    };

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    useEffect(() => {
        if (location.state?.month) {
            setCurrentMonth(location.state.month);
        }
    }, [location.state?.month]);

    // Generate data based on the current view mode
    const getChartData = () => {
        if (viewMode === "weekly") {
            return [
                { name: "Angry", emoteFreq: Math.floor(Math.random() * 3) },
                { name: "Sad", emoteFreq: Math.floor(Math.random() * 3) },
                { name: "Happy", emoteFreq: Math.floor(Math.random() * 3) },
                { name: "Bored", emoteFreq: Math.floor(Math.random() * 3) },
                { name: "Scared", emoteFreq: Math.floor(Math.random() * 3) }
            ];
        } else if (viewMode === "yearly") {
            return [
                { name: "Angry", emoteFreq: Math.floor(Math.random() * 100) },
                { name: "Sad", emoteFreq: Math.floor(Math.random() * 100) },
                { name: "Happy", emoteFreq: Math.floor(Math.random() * 100) },
                { name: "Bored", emoteFreq: Math.floor(Math.random() * 100) },
                { name: "Scared", emoteFreq: Math.floor(Math.random() * 100) }
            ];
        }
        return [
            { name: "Angry", emoteFreq: Math.floor(Math.random() * 30) },
            { name: "Sad", emoteFreq: Math.floor(Math.random() * 30) },
            { name: "Happy", emoteFreq: Math.floor(Math.random() * 30) },
            { name: "Bored", emoteFreq: Math.floor(Math.random() * 30) },
            { name: "Scared", emoteFreq: Math.floor(Math.random() * 30) }
        ];
    };

    const getHeading = () => {
        if (viewMode === "weekly") {
            const startOfWeek = new Date(currentMonth);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
        } else if (viewMode === "yearly") {
            return currentMonth.getFullYear();
        }
        return currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    const chartData = getChartData();
    const heading = getHeading();
    const barColors = ["#ff746c", "#b3ebf2", "#ffee8c", "grey", "#6c3baa"];

    return (
        <div id="history-container">
            <h1>History</h1>
            <div id="month-navigation">
                {viewMode === "monthly" && (
                    <>
                        <button onClick={() => changeMonth(-1)}>Previous</button>
                        <h2>{heading}</h2>
                        <button onClick={() => changeMonth(1)}>Next</button>
                    </>
                )}
                {viewMode !== "monthly" && <h2>{heading}</h2>}
            </div>

            <button className="view-toggle-button" onClick={toggleViewMode}>
                {viewMode === "monthly" ? "Switch to Weekly View" : viewMode === "weekly" ? "Switch to Yearly View" : "Switch to Monthly View"}
            </button>

            console.log("Data passed to BarChartComponent:", chartData);
            
            <BarChartComponent 
                data={chartData}         // Pass dynamically generated chart data
                colours={barColors}      // Pass bar colors
            />

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">Go Home</button>
                </Link>
            </div>
        </div>
    );
}
