// components/BarChart.js
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Label, Cell } from 'recharts';
import './BarChart.css';

const BarChartComponent = ({ data, colours }) => {
    return ( 
        <ResponsiveContainer width="50%" height="50%">
            <BarChart id="bar-chart" data={data} margin={{bottom: 30}}>
                <YAxis stroke="white">    
                    <Label value="Frequency" angle="-90" position="Left" fill="#dddd" dx={-10}/>
                </YAxis>
                <XAxis dataKey="name" stroke="white">
                    <Label value="Emotion" offset={0} position="bottom" fill="#dddd" dy={10}/>
                </XAxis>
                <Tooltip cursor={false} content={<CustomTooltip />}/>
                <Bar dataKey="emoteFreq">
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colours[index % colours.length]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>    
    )
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div id="custom-tooltip"> 
                <p>{label}</p>
                <p>
                    Frequency:
                    <span> {payload[0].value}</span>
                </p>
            </div>
        );
    }
};

export default BarChartComponent;
