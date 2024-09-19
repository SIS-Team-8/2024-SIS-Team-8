import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import '../App.css';
import './SignUp.css';

export default function SignUp() {
    return (
        <html>
        <div>
            <img src={logo} alt="App Logo" id="logo" />
            <form>
                <input id="emailBox" placeholder="Email"></input>
                <p></p>
                <input id="userBox" placeholder="Username"></input>
                <p></p>
                <input id="passBox" placeholder="Password" type="password"></input>
                <p></p>
                <input id="passBox" placeholder="Confirm Password" type="password"></input>
            </form>
            <button id="button">Create Account</button>
            <p id="bottomText"><Link to="/login" id="link">Login</Link></p>
        </div>
        </html>
    )
}