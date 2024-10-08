import React, { useState } from 'react';
import BarChart from '../components/BarChart';
import { Link } from "react-router-dom";
import './History.css';

const translations = {
    English: { history: "History", previous: "Previous", next: "Next", goHome: "Go Home", toggleView: "Switch View", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], chart: {
        xLabels: ["Angry", "Sad", "Happy", "Bored", "Scared"],
        xAxisLabel: "Emotions",
        yAxisLabel: "Frequency",
        tooltipText: "Frequency"
    }},
    // Other languages...
};

export default function History({ theme, language }) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // Set initial month to September 2024
    const [viewMode, setViewMode] = useState("monthly"); // Initialize view mode as monthly
    const t = translations[language];

    // Function to toggle between weekly, monthly, and yearly views
    const toggleViewMode = () => {
        const nextMode = viewMode === "monthly" ? "weekly" : viewMode === "weekly" ? "yearly" : "monthly";
        setViewMode(nextMode);
    };

    const changeMonth = (direction) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
        setCurrentMonth(newMonth);
    };

    // Sample data for demonstration (replace with actual data logic for each view)
    const weeklyData = [
        { name: t.chart.xLabels[0], emoteFreq: 1 },
        { name: t.chart.xLabels[1], emoteFreq: 2 },
        { name: t.chart.xLabels[2], emoteFreq: 3 },
        { name: t.chart.xLabels[3], emoteFreq: 2 },
        { name: t.chart.xLabels[4], emoteFreq: 1 }
    ];

    const monthlyData = [
        { name: t.chart.xLabels[0], emoteFreq: 5 },
        { name: t.chart.xLabels[1], emoteFreq: 5 },
        { name: t.chart.xLabels[2], emoteFreq: 10 },
        { name: t.chart.xLabels[3], emoteFreq: 5 },
        { name: t.chart.xLabels[4], emoteFreq: 5 }
    ];

    const yearlyData = [
        { name: t.chart.xLabels[0], emoteFreq: 50 },
        { name: t.chart.xLabels[1], emoteFreq: 40 },
        { name: t.chart.xLabels[2], emoteFreq: 100 },
        { name: t.chart.xLabels[3], emoteFreq: 30 },
        { name: t.chart.xLabels[4], emoteFreq: 20 }
    ];

    // Select data based on current view mode
    const chartData = viewMode === "weekly" ? weeklyData : viewMode === "yearly" ? yearlyData : monthlyData;

    return (
        <div id="history-container" className={theme}>
            <h1>{t.history}</h1>
            <div id="month-navigation">
                <button onClick={() => changeMonth(-1)}>{t.previous}</button>
                <h2>{`${t.months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => changeMonth(1)}>{t.next}</button>
            </div>
            
            <button className="view-toggle-button" onClick={toggleViewMode}>
                {viewMode === "monthly" ? "Switch to Weekly View" : viewMode === "weekly" ? "Switch to Yearly View" : "Switch to Monthly View"}
            </button>

            <BarChart 
                data={chartData}
                xAxisLabel={t.chart.xAxisLabel}
                yAxisLabel={t.chart.yAxisLabel}
                tooltipText={t.chart.tooltipText}
                barColors={["#ff746c", "#b3ebf2", "#ffee8c", "grey", "#6c3baa"]}
                language={language}
            />
            
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Link to="/">
                    <button id="home-button">{t.goHome}</button>
                </Link>
            </div>
        </div>
    );
}
