import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import './SignUp.css';

export default function SignUp() {
    return (
        <div id="signup-container">
            <img src={logo} alt="App Logo" id="logo" />
            <form>
                <input id="emailBox" placeholder="Email" type="email" />
                <p></p>
                <input id="userBox" placeholder="Username" />
                <p></p>
                <input id="passBox" placeholder="Password" type="password" />
                <p></p>
                <input id="passBox" placeholder="Confirm Password" type="password" />
            </form>
            <button id="button">Create Account</button>
            <p id="bottomText"><Link to="/login" id="link">Login</Link></p>
        </div>
    );
}