import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../thunks/authThunks";
import { selectIsLogged } from '../selectors/authSelector';
import validator from "validator";

export default function LoginForm() {
    const [registrationMode, setRegistrationMode] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [serverError, setServerErrors] = useState('');
    const isLogged = useSelector(selectIsLogged);
    const dispatch = useDispatch();

    let loginContent;

    useEffect(() => {
        setFieldErrors({});
        setServerErrors('');
    },[registrationMode]);
    
    async function handleOnSubmit(e) {
          e.preventDefault();
          e.stopPropagation();
        if (registrationMode) {
            await handleRegisterOnClick();
        }
        else {
            await handleLoginOnClick();
        } 
    }

    async function handleRegisterOnClick () {
        const errors = validateRegistrationForm('registration', {email, password, confirmPassword});
        if (Object.keys(errors).length > 0 ) {
            setFieldErrors(errors);
            console.log('ERRORS!') // manage errors
            console.log(errors);
        } else {
            try {
                console.log('Registration');
                const respEmail = await dispatch(registerUser({email, password, confirmPassword})).unwrap();
                console.log(respEmail);
                console.log(isLogged ? 'LOGGED': 'NOT LOGGED');
            } catch (e) {
                setServerErrors(e);
                console.log('REGISTRATION ERROR:', e);
            }
        }
    }

    async function handleLoginOnClick () {
        const errors = validateRegistrationForm('login', {email, password, confirmPassword});
        if (Object.keys(errors).length > 0 ) {
            setFieldErrors(errors);
            console.log('ERRORS!') // manage errors
            console.log(errors);
        } else {
            try {
                console.log('login');
                const resplogin = await dispatch(loginUser({email, password})).unwrap();
                console.log(resplogin);
                console.log(isLogged ? 'LOGGED' : 'NOT LOGGED');
            } catch (e) {
                setServerErrors(e); //migliorare il messaggio
                console.log('LOGIN ERROR:', e);
            }
        }
    };

    function handleEmailOnChange(e) {
        setServerErrors("");
        removeError('email');
        setEmail(e.target.value);
    };



    function handlePasswordOnChange(e, eventName) {
        setServerErrors("");
        const value = e.target.value;
        if (eventName === 'password') {
            if (value==='') { 
                removeError('confirmPassword');
            }
            removeError('password');
            setPassword(value);
            return;
        } else if (eventName === 'confirmPassword') {
            if (!registrationMode) return;
            removeError('confirmPassword');
            setConfirmPassword(value);
            validateConfirmPassword(password, value);
            return;
            }
        }

    function validateRegistrationForm(eventName, {email, password, confirmPassword}) {
        const errors = {};

        const addError = (field, condition, message) => {
            if (!errors[field] && condition) {
                errors[field] = message;
            }
        }

        addError('email', !email, 'Email is missing!');
        addError('email', !validator.isEmail(email), 'Email is not a valid format!');
        addError('password', !password, 'Password is null!');

        if (eventName === 'registration') {
            addError('confirmPassword', !confirmPassword, 'Confirm password is null!');
            addError('password', password.length<8, 'Password is too short!');
            addError('confirmPassword', !(password===confirmPassword), 'Confirm password is different!');
        } 
        
        return errors;
    };

    function validateConfirmPassword(password, confirmPassword) {
        if (password==='' || confirmPassword==='') {
            return;
        }
        else if (password===confirmPassword) {
            setFieldErrors({confirmPassword: ''});
        } else {
            setFieldErrors({confirmPassword: 'Confirm password is different!'});
        }
    };

    function removeError(field) {
        setFieldErrors(prev => {
            const {[field]: _, ...rest} = prev;
            return rest;
        })
    };


    if (registrationMode) {
        loginContent = <div className="login-form-container">
                            <input type="email" placeholder="Email..." onChange={(e)=> handleEmailOnChange(e)} className="login-form-input"/>
                            {fieldErrors.email && <div className="login-input-error-text">{fieldErrors.email}</div>}
                            <input type="password" placeholder="Password..." onChange={(e) => handlePasswordOnChange(e, 'password')} className="input-password login-form-input"/>
                            {fieldErrors.password && <div className="login-input-error-text">{fieldErrors.password}</div>}
                            <input type="password" placeholder="Confirm password..." className={fieldErrors.password ? 'password-error login-form-input' : 'input-password login-form-input'} onChange={(e) => handlePasswordOnChange(e, 'confirmPassword')}/>
                            {fieldErrors.confirmPassword && <div className="login-input-error-text">{fieldErrors.confirmPassword}</div>}
                            <button type='submit' className="login-form-button">Confirm</button>
                            <button type="button" onClick={() => setRegistrationMode(false)} className="login-form-button">Login</button>
                        </div>
    } else {
        loginContent =  <div className="login-form-container">
                            <input type="email" placeholder="Email..." onChange={(e)=> handleEmailOnChange(e)} className="login-form-input"/>
                            {fieldErrors.email && <div className="login-input-error-text">{fieldErrors.email}</div>}
                            <input type="password" placeholder="Password..." onChange={(e) => handlePasswordOnChange(e, 'password')} className="input-password login-form-input"/>
                            {fieldErrors.password && <div className="login-input-error-text">{fieldErrors.password}</div>}
                            <button type="submit" className="login-form-button">Login</button>
                            <button type='button' onClick={() => {setRegistrationMode(true)}} className="login-form-button">Register</button>
                        </div>
    }

    return  <form onSubmit={handleOnSubmit} className="login-form-wrapper">{loginContent}</form>;
};