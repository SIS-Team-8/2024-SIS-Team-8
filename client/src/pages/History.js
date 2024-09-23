import React from 'react';
import BarChart from '../components/BarChart';
import './History.css';

export default function History() {
    return (
        <div id="history-container">
            <h1>History</h1>
            <h2>Month</h2>
            <BarChart/>
        </div>
    );
}