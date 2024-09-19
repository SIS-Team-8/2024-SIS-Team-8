import React, { useState } from 'react';
import './MoodSelection.css'
import veryAngry from '../assets/emoji/very-angry.png'
import sad from '../assets/emoji/sad.png'
import happy from '../assets/emoji/happy.png'
import bored from '../assets/emoji/bored.png'
import scared from '../assets/emoji/scared.png'
import annoyed from '../assets/emoji/annoyed.png'
import frustrated from '../assets/emoji/frustrated.png'
import angry from '../assets/emoji/angry.png'
import extremelyAngry from '../assets/emoji/extremely-angry.png'
import upset from '../assets/emoji/upset.png'
import deflated from '../assets/emoji/deflated.png'
import distressed from '../assets/emoji/distressed.png'
import miserable from '../assets/emoji/miserable.png'
import veryHappy from '../assets/emoji/very-happy.png'
import extremelyHappy from '../assets/emoji/extremely-happy.png'
import amazinglyHappy from '../assets/emoji/amazingly-happy.png'
import ecstatic from '../assets/emoji/ecstatic.png'
import exasperated from '../assets/emoji/exasperated.png'
import sarcastic from '../assets/emoji/sarcastic.png'
import tired from '../assets/emoji/tired.png'
import exhausted from '../assets/emoji/exhausted.png'
import surprised from '../assets/emoji/surprised.png'
import nervous from '../assets/emoji/nervous.png'
import overwhelmed from '../assets/emoji/overwhelmed.png'
import terrified from '../assets/emoji/terrified.png'
import submit from '../assets/submit-icon.png'

export default function MoodSelection() {
    const [firstImageSrc, setFirstImageSrc] = useState();
    const [secondImageSrc, setSecondImageSrc] = useState();
    const [thirdImageSrc, setThirdImageSrc] = useState();
    const [forthImageSrc, setForthImageSrc] = useState();
    const [fifthImageSrc, setFifthImageSrc] = useState();

    const angryImageSrc = () => {
        setFirstImageSrc(annoyed);
        setSecondImageSrc(frustrated);
        setThirdImageSrc(angry);
        setForthImageSrc(veryAngry);
        setFifthImageSrc(extremelyAngry);
    }

    const sadImageSrc = () => {
        setFirstImageSrc(upset);
        setSecondImageSrc(sad);
        setThirdImageSrc(deflated);
        setForthImageSrc(distressed);
        setFifthImageSrc(miserable);
    }

    const happyImageSrc = () => {
        setFirstImageSrc(happy);
        setSecondImageSrc(veryHappy);
        setThirdImageSrc(extremelyHappy);
        setForthImageSrc(amazinglyHappy);
        setFifthImageSrc(ecstatic);
    }

    const boredImageSrc = () => {
        setFirstImageSrc(bored);
        setSecondImageSrc(exasperated);
        setThirdImageSrc(sarcastic);
        setForthImageSrc(tired);
        setFifthImageSrc(exhausted);
    }

    const scaredImageSrc = () => {
        setFirstImageSrc(surprised);
        setSecondImageSrc(nervous);
        setThirdImageSrc(overwhelmed);
        setForthImageSrc(scared);
        setFifthImageSrc(terrified);
    }

    return (
        <html>
        <div id='container'>
        <div id='row'>
            <img id="angry" className="column" onClick={angryImageSrc} alt="angry" src={veryAngry}/>
            <img id="sad" className="column" onClick={sadImageSrc} alt="sad" src={sad}/>
            <img id="happy" className="column" onClick={happyImageSrc} alt="happy" src={happy}/>
            <img id="bored" className="column" onClick={boredImageSrc} alt="bored" src={bored}/>
            <img id="scared" className="column" onClick={scaredImageSrc} alt="scared" src={scared}/>
        </div>
        <div id="subRow">
            <img id="first" className="subColumn" alt="" src={firstImageSrc}/>
            <img id="second" className="subColumn" alt="" src={secondImageSrc}/>
            <img id="third" className="subColumn" alt="" src={thirdImageSrc}/>
            <img id="forth" className="subColumn" alt="" src={forthImageSrc}/>
            <img id="fifth" className="subColumn" alt="" src={fifthImageSrc}/>
        </div>
        <div id="flexContainer">
            <textarea id="log" placeholder='Add Note...'/>
            <img id="submit" alt="submit" src={submit}/>
        </div>
        </div>
        </html>
    );
}