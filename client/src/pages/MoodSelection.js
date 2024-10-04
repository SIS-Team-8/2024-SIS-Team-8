import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './MoodSelection.css'
import veryAngry from '../assets/emoji/very-angry.png';
import sad from '../assets/emoji/sad.png';
import happy from '../assets/emoji/happy.png';
import veryHappy from '../assets/emoji/very-happy.png';
import extremelyHappy from '../assets/emoji/extremely-happy.png';
import upset from '../assets/emoji/upset.png';
import deflated from '../assets/emoji/deflated.png';
import distressed from '../assets/emoji/distressed.png';
import miserable from '../assets/emoji/miserable.png';
import ecstatic from '../assets/emoji/ecstatic.png';
import submit from '../assets/submit-icon.png';

const MoodSelection = () => {
    const { date } = useParams(); // Get the date from the URL

    const [firstImageSrc, setFirstImageSrc] = useState();
    const [secondImageSrc, setSecondImageSrc] = useState();
    const [thirdImageSrc, setThirdImageSrc] = useState();
    const [forthImageSrc, setForthImageSrc] = useState();
    const [fifthImageSrc, setFifthImageSrc] = useState();

    const happyImageSrc = () => {
        setFirstImageSrc(happy);
        setSecondImageSrc(veryHappy);
        setThirdImageSrc(extremelyHappy);
        setForthImageSrc(ecstatic);
    }

    const sadImageSrc = () => {
        setFirstImageSrc(upset);
        setSecondImageSrc(sad);
        setThirdImageSrc(deflated);
        setForthImageSrc(distressed);
        setFifthImageSrc(miserable);
    }

    return (
        <html>
            <div id='container'>
                <h2>Select Mood for {date}</h2>
                <div id='row'>
                    <img id="happy" className="column" onClick={happyImageSrc} alt="happy" src={happy}/>
                    <img id="sad" className="column" onClick={sadImageSrc} alt="sad" src={sad}/>
                </div>

                <div id="subRow">
                    <img id="first" className="subColumn" alt="" src={firstImageSrc}/>
                    <img id="second" className="subColumn" alt="" src={secondImageSrc}/>
                    <img id="third" className="subColumn" alt="" src={thirdImageSrc}/>
                    <img id="forth" className="subColumn" alt="" src={forthImageSrc}/>
                </div>

                <div id="flexContainer">
                    <textarea id="log" placeholder='Add Note...'/>
                    <img id="submit" alt="submit" src={submit}/>
                </div>
            </div>
        </html>
    );
}

export default MoodSelection;
