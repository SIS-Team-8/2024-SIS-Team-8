import React, { useState, useEffect } from 'react';
import BarChartComponent from '../components/BarChart';
import { Link, useLocation } from 'react-router-dom';
import './History.css';

export default function History() {
    const location = useLocation();
    const initialMonth = location.state?.month || new Date();
    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [viewMode, setViewMode] = useState("monthly");
    const [currentWeek, setCurrentWeek] = useState(1); // Track the current week in weekly view
    const [currentYear, setCurrentYear] = useState(currentMonth.getFullYear()); // Track the current year in yearly view

    const toggleViewMode = () => {
        const nextMode = viewMode === "monthly" ? "weekly" : viewMode === "weekly" ? "yearly" : "monthly";
        setViewMode(nextMode);
        if (nextMode === "yearly") {
            setCurrentYear(currentMonth.getFullYear());
        } else if (nextMode === "weekly") {
            setCurrentWeek(1);
        }
    };

    const changeMonth = (direction) => {
        if (viewMode === "yearly") {
            setCurrentYear((prevYear) => prevYear + direction);
        } else {
            const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
            setCurrentMonth(newMonth);
        }
    };

    const changeWeek = (direction) => {
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const weeksInMonth = Math.ceil(daysInMonth / 7);
        const nextWeek = currentWeek + direction;

        if (nextWeek < 1) {
            setCurrentWeek(weeksInMonth); // Cycle to last week if going backward from first
        } else if (nextWeek > weeksInMonth) {
            setCurrentWeek(1); // Cycle to first week if going forward from last
        } else {
            setCurrentWeek(nextWeek);
        }
    };

    useEffect(() => {
        if (location.state?.month) {
            setCurrentMonth(location.state.month);
        }
    }, [location.state?.month]);

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
            const startOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), (currentWeek - 1) * 7 + 1);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
        } else if (viewMode === "yearly") {
            return `${currentYear}`;
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
                {viewMode === "weekly" && (
                    <>
                        <button onClick={() => changeWeek(-1)}>Previous Week</button>
                        <h2>{heading}</h2>
                        <button onClick={() => changeWeek(1)}>Next Week</button>
                    </>
                )}
                {viewMode === "yearly" && (
                    <>
                        <button onClick={() => changeMonth(-1)}>Previous Year</button>
                        <h2>{heading}</h2>
                        <button onClick={() => changeMonth(1)}>Next Year</button>
                    </>
                )}
            </div>

            <button className="view-toggle-button" onClick={toggleViewMode}>
                {viewMode === "monthly" ? "Switch to Weekly View" : viewMode === "weekly" ? "Switch to Yearly View" : "Switch to Monthly View"}
            </button>

            <BarChartComponent 
                data={chartData}         
                colours={barColors}      
            />

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">Go Home</button>
                </Link>
            </div>
        </div>
    );
}
