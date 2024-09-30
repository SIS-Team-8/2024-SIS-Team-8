import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Label, Cell } from 'recharts';
import './BarChart.css';

const translations = {
    English: { frequency: "Frequency", emotion: "Emotion", tooltipText: "Frequency", Angry: "Angry", Sad: "Sad", Happy: "Happy", Bored: "Bored", Scared: "Scared" },
    Spanish: { frequency: "Frecuencia", emotion: "Emoción", tooltipText: "Frecuencia", Angry: "Enfadado", Sad: "Triste", Happy: "Feliz", Bored: "Aburrido", Scared: "Asustado" },
    German: { frequency: "Häufigkeit", emotion: "Emotion", tooltipText: "Häufigkeit", Angry: "Wütend", Sad: "Traurig", Happy: "Glücklich", Bored: "Gelangweilt", Scared: "Ängstlich" },
    French: { frequency: "Fréquence", emotion: "Émotion", tooltipText: "Fréquence", Angry: "En colère", Sad: "Triste", Happy: "Heureux", Bored: "Ennuyé", Scared: "Effrayé" },
    Chinese: { frequency: "频率", emotion: "情绪", tooltipText: "频率", Angry: "生气", Sad: "难过", Happy: "开心", Bored: "无聊", Scared: "害怕" }
};

const defaultEmoteData = [
    //data goes here
    {
        name: 'Angry',
        emoteFreq: 5,
    },
    {
        name: 'Sad',
        emoteFreq: 5,
    },
    {
        name: 'Happy',
        emoteFreq: 10,
    },
    {
        name: 'Bored',
        emoteFreq: 5,
    },
    {
        name: 'Scared',
        emoteFreq: 5,
    },
];

const colours = ['#ff746c', '#b3ebf2', '#ffee8c', 'grey', '#6c3baa'];

const BarChartComponent = ({ data, xAxisLabel, yAxisLabel, tooltipText, barColors, language }) => {
    const t = translations[language] || translations.English;

    const translatedData = defaultEmoteData.map((item) => ({
        ...item,
        name: t[item.Angry] || item.Angry, // Replace the `name` property with the translated label if it exists, else keep the original
        name: t[item.Sad] || item.Sad,
        name: t[item.Happy] || item.Happy,
        name: t[item.Bored] || item.Bored,
        name: t[item.Scared] || item.Scared
    }));

    return ( 
        <ResponsiveContainer width="50%" height="50%">
            <BarChart id="bar-chart" data={translatedData} margin={{bottom: 30}}>
                <YAxis stroke="white">    
                    <Label value={t.frequency} angle="-90" position="Left" fill="#dddd" dx={-10}/>
                </YAxis>
                <XAxis dataKey="name" stroke="white">
                    <Label value={t.emotion} offset={0} position="bottom" fill="#dddd" dy={10}/>
                </XAxis>
                <Tooltip cursor={false} content={<CustomTooltip tooltipText={t.tooltipText} />}/>
                <Bar dataKey="emoteFreq">
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


const CustomTooltip = ({ active, payload, label, tooltipText}) => {
    if (active && payload && payload.length) {
        return (
            <div id="custom-tooltip"> 
                <p>{label}</p>
                <p>
                    Frequency:
                    {tooltipText}: <span> {payload[0].value}</span>
                </p>
            </div>
        );
    }
};


export default BarChartComponent;