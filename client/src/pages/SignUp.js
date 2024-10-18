import React, {useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import './SignUp.css';

export default function SignUp() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const { username, password, confirmPassword } = inputValue

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
        });
    
    const handleSubmit = async (e) => {
        if (username === "" || password === "") {
            toast.error("Enter desired username and password to create account")
        }
        else if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        else {

            try {
                const { data } = await axios.post(
                    "http://localhost:3000/api/sign-up",
                    {
                    "username": inputValue.username,
                    "password": inputValue.password
                    },
                    { withCredentials: true }
                );
                const { success, message } = data;
                if (success) {
                    handleSuccess(message);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                } else {
                    handleError(message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setInputValue({
            ...inputValue,
            username: "",
            password: "",
            confirmPassword: ""
        });
        e.preventDefault();
    };

    return (
        <div id="signup-container">
            <img src={logo} alt="App Logo" id="logo" />

            <div id="inputBox">
                <form>
                    <input id="userBox" type="text" name="username" value={username} placeholder="Username" onChange={handleOnChange}></input>
                    <p></p>
                    <input id="passBox" type="password" name="password" value={password} placeholder="Password" onChange={handleOnChange}></input>
                    <p></p>
                    <input id="passBox" type="password"  name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={handleOnChange}></input>
                    
                </form>
                <button id="button" onClick={handleSubmit} type="button">Create Account</button>
                <p id="bottomText">
                    <Link to="/login" id="link">Login</Link> 
                </p>
            </div>
        </div>
    );
}