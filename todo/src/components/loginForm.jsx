import { useState } from "react";
import validator from "validator";

export default function LoginForm() {
    const [registrationMode, setRegistrationMode] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [email, setEmail] = useState("");

    let loginContent;

    function handleRegisterOnClick () {
        const errors = validateRegistrationForm('registration', {email, password, confirmPassword});
        if (Object.keys(errors).length >0 ) {
            console.log('ERRORS!') // manage errors
            console.log(errors);
        } else {
            console.log('Registration') // dispatch registration
        }
    }

    function handleLoginOnClick () {
        console.log('hello');
        const errors = validateRegistrationForm('login', {email, password, confirmPassword});
        if (Object.keys(errors).length >0 ) {
            console.log('ERRORS!') // manage errors
            console.log(errors);
        } else {
            console.log('login') // dispatch registration
        }
        //dispatch per login
    }

    function handlePasswordOnChange(e, eventName) {
        const value = e.target.value;
        if (eventName === 'password') {
            setPassword(value);
            if (confirmPassword !== "") {
                setPasswordError(value !== confirmPassword);
            }
        } else if (eventName === 'confirmPassword') {
            setConfirmPassword(value);
            if (value === "") {// da capire se importo una lunghezza minima allora error puo partire da count >3
                setPasswordError(false);
            } else {
                setPasswordError(value !== password);
            }
        }
    }

    function validateRegistrationForm(eventName, {email, password, confirmPassword}) {
        const errors = {};

        const addError = (field, condition, message) => {
            if (!errors[field] && condition) {
                errors[field] = message;
            }
        }

        if (eventName === 'registration') {
            addError('confirmPassword', !confirmPassword, 'Confirm password is null!');
            //addError('password', !password.length>3, 'Password is too short!');
            addError('confirmPassword', !(password===confirmPassword), 'Conform password is different!');
        } 
        if (eventName === 'login') {
            addError('email', !email, 'Email is missing!');
            addError('email', !validator.isEmail(email), 'Email is not a valid format!');
            addError('password', !password, 'Password is null!');
        }

        return errors;
    }


    if (registrationMode) {
        loginContent = <div className="login-form-container">
                            <input type="email" placeholder="Email..." onChange={(e)=> setEmail(e.target.value)}></input>
                            <input type="password" placeholder="Password..." onChange={(e) => handlePasswordOnChange(e, 'password')} className="input-password"></input>
                            <input type="password" placeholder="Confirm password..." className={passwordError ? 'password-error' : 'input-password'} onChange={(e) => handlePasswordOnChange(e, 'confirmPassword')}></input>
                            <button onClick={handleRegisterOnClick}>Register</button>
                        </div>
    } else {
        loginContent =  <div className="login-form-container">
                            <input type="email" placeholder="Email..." onChange={(e)=> setEmail(e.target.value)}></input>
                            <input type="password" placeholder="Password..." onChange={(e) => handlePasswordOnChange(e, 'password')} className="input-password"></input>
                            <button onClick={handleLoginOnClick}>Login</button>
                            <button onClick={() => {setRegistrationMode(true)}}>Register</button>
                        </div>
    }

    return  loginContent
};