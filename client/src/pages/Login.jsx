import styles from "./pages.module.css"
import logo from "../assets/logo.png"
import { SignUp } from './SignUp';
import { Link } from "react-router-dom";

export function Login() {
    return (
        <body>
            <div className={styles.container}>
                <img src={logo} alt="App Logo" className={styles.logoStyle}/>
                <div className={styles.inputBoxes}>
                    <form>
                        <input className={styles.userBox} placeholder='Username'></input>
                        <p></p>
                        <input className={styles.passBox} placeholder='Password' type="password"></input>
                    </form>
                    <button>Login</button>
                    <p className={styles.bottom}><Link to="/signUp" className={styles.link}>Sign Up</Link> <a className={styles.forgotPassword}>Forgot password?</a></p>
                </div>
            </div>
        </body>
    );
}