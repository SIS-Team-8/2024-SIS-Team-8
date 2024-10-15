import React, { useState, useEffect } from 'react';
import BarChartComponent from '../components/BarChart';
import { Link, useLocation } from 'react-router-dom';
import './History.css';

export default function History() {
    const location = useLocation();
    const initialMonth = location.state?.month || new Date();

    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [viewMode, setViewMode] = useState("monthly");
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentYear, setCurrentYear] = useState(currentMonth.getFullYear());

    useEffect(() => {
        if (location.state?.month) {
            setCurrentMonth(location.state.month);
        }
    }, [location.state?.month]);

    const toggleViewMode = () => {
        const viewModes = { monthly: "weekly", weekly: "yearly", yearly: "monthly" };
        const nextMode = viewModes[viewMode];
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

        setCurrentWeek(nextWeek < 1 ? weeksInMonth : nextWeek > weeksInMonth ? 1 : nextWeek);
    };

    const getHeading = () => {
        if (viewMode === "weekly") {
            const startOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), (currentWeek - 1) * 7 + 1);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
        }

        if (viewMode === "yearly") {
            return currentYear.toString();
        }

        return currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    return (
        <div id="history-container">
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <button className="view-toggle-button" onClick={toggleViewMode}>
                    {viewMode === "monthly" ? "Switch to Weekly View" : viewMode === "weekly" ? "Switch to Yearly View" : "Switch to Monthly View"}
                </button>
            </div>

            <div id="interval-navigation">
                {viewMode === "monthly" && (
                    <>
                        <button onClick={() => changeMonth(-1)}>Previous</button>
                        <h2>{getHeading()}</h2>
                        <button onClick={() => changeMonth(1)}>Next</button>
                    </>
                )}
                {viewMode === "weekly" && (
                    <>
                        <button onClick={() => changeWeek(-1)}>Previous Week</button>
                        <h2>{getHeading()}</h2>
                        <button onClick={() => changeWeek(1)}>Next Week</button>
                    </>
                )}
                {viewMode === "yearly" && (
                    <>
                        <button onClick={() => changeMonth(-1)}>Previous Year</button>
                        <h2>{getHeading()}</h2>
                        <button onClick={() => changeMonth(1)}>Next Year</button>
                    </>
                )}
            </div>

            <BarChartComponent/>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">Go Home</button>
                </Link>
            </div>
        </div>
    );
}