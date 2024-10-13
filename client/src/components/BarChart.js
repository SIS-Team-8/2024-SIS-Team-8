// BarChart.js
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Label, Cell } from 'recharts';
import './BarChart.css';

const testData = [
    { name: "Angry", emoteFreq: 10 },
    { name: "Sad", emoteFreq: 15 },
    { name: "Happy", emoteFreq: 20 },
    { name: "Bored", emoteFreq: 5 },
    { name: "Scared", emoteFreq: 8 }
];

const colours = ["#ff746c", "#b3ebf2", "#ffee8c", "grey", "#6c3baa"];

const BarChartComponent = () => {
    return ( 
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={testData} margin={{bottom: 30}}>
                <YAxis stroke="white">    
                    <Label value="Frequency" angle="-90" position="Left" fill="#dddd" dx={-10}/>
                </YAxis>
                <XAxis dataKey="name" stroke="white">
                    <Label value="Emotion" offset={0} position="bottom" fill="#dddd" dy={10}/>
                </XAxis>
                <Tooltip cursor={false} />
                <Bar dataKey="emoteFreq">
                    {
                        testData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colours[index % colours.length]} />
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>    
    );
};

export default BarChartComponent;
