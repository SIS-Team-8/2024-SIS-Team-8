import styles from "./pages.module.css"
import angry from '../assets/emoji/angry.png'
import sad from '../assets/emoji/sad.png'
import happy from '../assets/emoji/happy.png'
import bored from '../assets/emoji/bored.png'
import scared from '../assets/emoji/scared.png'
import veryHappy from '../assets/emoji/very-happy.png'
import extreamlyHappy from '../assets/emoji/extreamly-happy.png'
import amazinglyHappy from '../assets/emoji/amazingly-happy.png'
import ecstatic from '../assets/emoji/ecstatic.png'
import submit from '../assets/submit-icon.png'
import back from '../assets/back-icon.png'

export function Mood() {
    return (
        <div className={styles.container}>
        <div className={styles.row}>
            <img className={styles.column} src={angry}/>
            <img className={styles.column} src={sad}/>
            <img className={styles.column} src={happy}/>
            <img className={styles.column} src={bored}/>
            <img className={styles.column} src={scared}/>
        </div>
        <div className={styles.row}>
            <img className={styles.column} src={happy}/>
            <img className={styles.column} src={veryHappy}/>
            <img className={styles.column} src={extreamlyHappy}/>
            <img className={styles.column} src={amazinglyHappy}/>
            <img className={styles.column} src={ecstatic}/>
        </div>
        <div className={styles.flexContainer}>
            <button className={styles.imageButton} type="back">
                <img className={styles.back} src={back} border="0"/>
            </button>
            <input className={styles.log}/>
            <button className={styles.imageButton} type="submit">
                <img className={styles.submit} src={submit} border="0"/>
            </button>
        </div>
        </div>
    );
}