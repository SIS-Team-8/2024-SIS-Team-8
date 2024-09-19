import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import '../App.css';
import './Login.css';

export default function Login() {
    return (
        <html>
            <div>
                <img src={logo} alt="App Logo" id="logo"/>
                <div id="inputBox">
                    <form>
                        <input id="userBox" placeholder="Username"></input>
                        <p></p>
                        <input id="passBox" placeholder="Password" type="password"></input>
                    </form>
                    <button id="button">Login</button>
                    <p id="bottomText"><Link to="/sign-up" id="link">Sign Up</Link> <Link id="forgotPassword">Forgot password?</Link></p>
                </div>
            </div>
        </html>
    );
}