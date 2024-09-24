import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Label, Cell } from 'recharts';
import './BarChart.css';

const emoteData = [
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

const BarChartComponent = () => {
    return ( 
        <ResponsiveContainer width="50%" height="50%">
            <BarChart id="bar-chart" data={emoteData} margin={{bottom: 30}}>
                <YAxis stroke="white">    
                    <Label value="Frequency" angle="-90" position="Left" fill="white" dx={-10}/>
                </YAxis>
                <XAxis dataKey="name" stroke="white">
                    <Label value="Emotion" offset={0} position="bottom" fill="white" dy={10}/>
                </XAxis>
                <Tooltip cursor={false} content={<CustomTooltip />}/>
                <Bar dataKey="emoteFreq">
                    {
                        emoteData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colours[index]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>    
    )
};


const CustomTooltip = ({ active, payload, label}) => {
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