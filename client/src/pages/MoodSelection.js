import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
    const [firstOpacity, setFirstOpacity] = useState();
    const [secondOpacity, setSecondOpacity] = useState();
    const [thirdOpacity, setThirdOpacity] = useState();
    const [forthOpacity, setForthOpacity] = useState();
    const [fifthOpacity, setFifthOpacity] = useState();
    const [sixthOpacity, setSixthOpacity] = useState();
    const [seventhOpacity, setSeventhOpacity] = useState();
    const [eigthOpacity, setEigthOpacity] = useState();
    const [ninthOpacity, setNinthOpacity] = useState();
    const [tenthOpacity, setTenthOpacity] = useState();

    const angryImageSrc = () => {
        setFirstImageSrc(annoyed);
        setSecondImageSrc(frustrated);
        setThirdImageSrc(angry);
        setForthImageSrc(veryAngry);
        setFifthImageSrc(extremelyAngry);
        setFirstOpacity(1);
        setSecondOpacity(0.5);
        setThirdOpacity(0.5);
        setForthOpacity(0.5);
        setFifthOpacity(0.5);
        setSixthOpacity(1);
        setSeventhOpacity(1);
        setEigthOpacity(1);
        setNinthOpacity(1);
        setTenthOpacity(1);
    }

    const sadImageSrc = () => {
        setFirstImageSrc(upset);
        setSecondImageSrc(sad);
        setThirdImageSrc(deflated);
        setForthImageSrc(distressed);
        setFifthImageSrc(miserable);
        setFirstOpacity(0.5);
        setSecondOpacity(1);
        setThirdOpacity(0.5);
        setForthOpacity(0.5);
        setFifthOpacity(0.5);
        setSixthOpacity(1);
        setSeventhOpacity(1);
        setEigthOpacity(1);
        setNinthOpacity(1);
        setTenthOpacity(1);
    }

    const happyImageSrc = () => {
        setFirstImageSrc(happy);
        setSecondImageSrc(veryHappy);
        setThirdImageSrc(extremelyHappy);
        setForthImageSrc(amazinglyHappy);
        setFifthImageSrc(ecstatic);
        setFirstOpacity(0.5);
        setSecondOpacity(0.5);
        setThirdOpacity(1);
        setForthOpacity(0.5);
        setFifthOpacity(0.5);
        setSixthOpacity(1);
        setSeventhOpacity(1);
        setEigthOpacity(1);
        setNinthOpacity(1);
        setTenthOpacity(1);
    }

    const boredImageSrc = () => {
        setFirstImageSrc(bored);
        setSecondImageSrc(exasperated);
        setThirdImageSrc(sarcastic);
        setForthImageSrc(tired);
        setFifthImageSrc(exhausted);
        setFirstOpacity(0.5);
        setSecondOpacity(0.5);
        setThirdOpacity(0.5);
        setForthOpacity(1);
        setFifthOpacity(0.5);
        setSixthOpacity(1);
        setSeventhOpacity(1);
        setEigthOpacity(1);
        setNinthOpacity(1);
        setTenthOpacity(1);
    }

    const scaredImageSrc = () => {
        setFirstImageSrc(surprised);
        setSecondImageSrc(nervous);
        setThirdImageSrc(overwhelmed);
        setForthImageSrc(scared);
        setFifthImageSrc(terrified);
        setFirstOpacity(0.5);
        setSecondOpacity(0.5);
        setThirdOpacity(0.5);
        setForthOpacity(0.5);
        setFifthOpacity(1);
        setSixthOpacity(1);
        setSeventhOpacity(1);
        setEigthOpacity(1);
        setNinthOpacity(1);
        setTenthOpacity(1);
    }

    const sixthImageClick = () => {
        setSixthOpacity(1);
        setSeventhOpacity(0.5);
        setEigthOpacity(0.5);
        setNinthOpacity(0.5);
        setTenthOpacity(0.5);
    }

    const seventhImageClick = () => {
        setSixthOpacity(0.5);
        setSeventhOpacity(1);
        setEigthOpacity(0.5);
        setNinthOpacity(0.5);
        setTenthOpacity(0.5);
    }

    const eigthImageClick = () => {
        setSixthOpacity(0.5);
        setSeventhOpacity(0.5);
        setEigthOpacity(1);
        setNinthOpacity(0.5);
        setTenthOpacity(0.5);
    }

    const ninthImageClick = () => {
        setSixthOpacity(0.5);
        setSeventhOpacity(0.5);
        setEigthOpacity(0.5);
        setNinthOpacity(1);
        setTenthOpacity(0.5);
    }

    const tenthImageClick = () => {
        setSixthOpacity(0.5);
        setSeventhOpacity(0.5);
        setEigthOpacity(0.5);
        setNinthOpacity(0.5);
        setTenthOpacity(1);
    }

    return (
        <html>
            <div id='container'>
                <div id='row'>
                    <img id="angry" className="column" onClick={angryImageSrc} alt="angry" src={veryAngry} style={{opacity: firstOpacity}}/>
                    <img id="sad" className="column" onClick={sadImageSrc} alt="sad" src={sad} style={{opacity: secondOpacity}}/>
                    <img id="happy" className="column" onClick={happyImageSrc} alt="happy" src={happy} style={{opacity: thirdOpacity}}/>
                    <img id="bored" className="column" onClick={boredImageSrc} alt="bored" src={bored} style={{opacity: forthOpacity}}/>
                    <img id="scared" className="column" onClick={scaredImageSrc} alt="scared" src={scared} style={{opacity: fifthOpacity}}/>
                </div>

                <div id="subRow">
                    <img id="first" className="subColumn" onClick={sixthImageClick} alt="" src={firstImageSrc} style={{opacity: sixthOpacity}}/>
                    <img id="second" className="subColumn" onClick={seventhImageClick} alt="" src={secondImageSrc} style={{opacity: seventhOpacity}}/>
                    <img id="third" className="subColumn" onClick={eigthImageClick} alt="" src={thirdImageSrc} style={{opacity: eigthOpacity}}/>
                    <img id="forth" className="subColumn" onClick={ninthImageClick} alt="" src={forthImageSrc} style={{opacity: ninthOpacity}}/>
                    <img id="fifth" className="subColumn" onClick={tenthImageClick} alt="" src={fifthImageSrc} style={{opacity: tenthOpacity}}/>
                </div>

                <div id="flexContainer">
                    <textarea id="log" placeholder='Add Note...'/>

                    <Link to="/">
                        <img id="submit" alt="submit" src={submit}/>
                    </Link>
                </div>
            </div>
        </html>
    );
}