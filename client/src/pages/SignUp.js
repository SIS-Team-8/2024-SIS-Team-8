import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import './SignUp.css';

export default function SignUp() {
    return (
        <div id="signup-container">
            <img src={logo} alt="App Logo" id="logo" />

            <div id="inputBox">
                <form>
                    <input id="emailBox" placeholder="Email" type="email"></input>
                    <p></p>
                    <input id="userBox" placeholder="Username"></input>
                    <p></p>
                    <input id="passBox" placeholder="Password" type="password"></input>
                    <p></p>
                    <input id="passBox" placeholder="Confirm Password" type="password"></input>
                </form>
            </div>

            <button id="button">Create Account</button>

            <p id="bottomText">
                <Link to="/login" id="link">Login</Link>
            </p>
        </div>
    );
}