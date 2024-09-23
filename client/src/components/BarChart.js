
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Label, Cell } from 'recharts';

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

const colours = ['red', 'blue', 'yellow', 'grey', 'purple'];

const BarChartComponent = () => {
    return ( 
        <ResponsiveContainer width="50%" height="50%">
            <BarChart width={500} height={400} data={emoteData} margin={{bottom: 15}}>
                <YAxis stroke="white">    
                    <Label value="Frequency" angle="-90" position="Left" fill="white"/>
                </YAxis>
                <XAxis dataKey="name" stroke="white">
                    <Label value="Emotion" offset={0} position="bottom" fill="white"/>
                </XAxis>
                <Tooltip />
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

/*
const CustomTooltip = ({ active, payload, label}) => {
    if (active && payload && payload.length) {
        return (
            <div id="tooltip"> 

            </div>
        )
    }
};
*/

export default BarChartComponent;