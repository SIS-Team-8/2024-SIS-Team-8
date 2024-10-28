import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Label, Cell } from 'recharts';
import './BarChart.css';
import React, { useEffect } from 'react';
import axios from "axios";

const translations = {
    English: { frequency: "Frequency", emotion: "Emotion", tooltipText: "Frequency", Angry: "Angry", Sad: "Sad", Happy: "Happy", Bored: "Bored", Scared: "Scared" },
    Spanish: { frequency: "Frecuencia", emotion: "Emoción", tooltipText: "Frecuencia", Angry: "Enfadado", Sad: "Triste", Happy: "Feliz", Bored: "Aburrido", Scared: "Asustado" },
    German: { frequency: "Häufigkeit", emotion: "Emotion", tooltipText: "Häufigkeit", Angry: "Wütend", Sad: "Traurig", Happy: "Glücklich", Bored: "Gelangweilt", Scared: "Ängstlich" },
    French: { frequency: "Fréquence", emotion: "Émotion", tooltipText: "Fréquence", Angry: "En colère", Sad: "Triste", Happy: "Heureux", Bored: "Ennuyé", Scared: "Effrayé" },
    Chinese: { frequency: "频率", emotion: "情绪", tooltipText: "频率", Angry: "生气", Sad: "难过", Happy: "开心", Bored: "无聊", Scared: "害怕" }
};

// This needs to be replaced.
const defaultEmoteData = [
    {
        name: 'Angry',
        emoteFreq: 1,
    },
    {
        name: 'Sad',
        emoteFreq: 6,
    },
    {
        name: 'Happy',
        emoteFreq: 6,
    },
    {
        name: 'Bored',
        emoteFreq: 4,
    },
    {
        name: 'Scared',
        emoteFreq: 1
    },
];


const colours = ['#ff746c', '#b3ebf2', '#ffee8c', 'grey', '#6c3baa'];

const BarChartComponent = ({ data, xAxisLabel, yAxisLabel, tooltipText, barColors, language, theme }) => {
    const t = translations[language] || translations.English;

    let defaultEmoteData = [
        {
            name: 'Angry',
            emoteFreq: 0,
        },
        {
            name: 'Sad',
            emoteFreq: 0,
        },
        {
            name: 'Happy',
            emoteFreq: 0,
        },
        {
            name: 'Bored',
            emoteFreq: 0,
        },
        {
            name: 'Scared',
            emoteFreq: 0
        },
    ];

    let translatedData = defaultEmoteData.map((item) => ({
        ...item,
        name: t[item.name] || item.name
    }));
    
    console.log(data);

    return (
        <ResponsiveContainer width="50%" height="40%">
            <BarChart id="bar-chart" data={data} margin={{bottom: 30}}>
                <YAxis stroke="white">
                    <Label value={t.frequency} angle="-90" position="Left" fill="#dddd" dx={-10}/>
                </YAxis>
                <XAxis dataKey="name" stroke="white"> {/* This needs to be replaced. */}
                    <Label value={t.emotion} offset={0} position="bottom" fill="#dddd" dy={10}/>
                </XAxis>
                <Tooltip cursor={false} content={<CustomTooltip tooltipText={t.tooltipText} theme={theme} />}/>
                <Bar dataKey="emoteFreq"> {/* This needs to be replaced. */}
                    {
                        translatedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colours[index]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
};


const CustomTooltip = ({ active, payload, label, tooltipText, theme }) => {
    if (active && payload && payload.length) {
        return (
            <div id="custom-tooltip" className={theme}>
                <p>{label}</p>
                <p>
                    {tooltipText}: <span> {payload[0].value}</span>
                </p>
            </div>
        );
    }
};

export default BarChartComponent;