import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../thunks/authThunks";
import { selectIsLogged, selectError } from '../selectors/authSelector';
import validator from "validator";
import { LoginFormRegister } from './loginFormRegister';
import { LoginFormLogin } from './loginFormLogin';
import { clearError } from '../slices/authSlice';

export function LoginForm() {
    const [registrationMode, setRegistrationMode] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    //const [serverError, setServerErrors] = useState('');
    const isLogged = useSelector(selectIsLogged);
    const serverError = useSelector(selectError);
    const dispatch = useDispatch();
    const isFirstRender = useRef(true);

    let loginContent;

    useEffect(() => {
        if (isFirstRender.current === true) {
            isFirstRender.current = false;
            return
        }
        setFieldErrors({});
        //setServerErrors('');
        dispatch(clearError());
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
                //setServerErrors(e);
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
                //setServerErrors(e);
                console.log('LOGIN ERROR:', e);
            }
        }
    };

    function handleEmailOnChange(e) {
        //setServerErrors("");
        dispatch(clearError());
        removeError('email');
        setEmail(e.target.value);
    };

    function handleConfirmPasswordChange(e) {
        //setServerErrors("");
        const value = e.target.value;
        
        if (!registrationMode) return;
        removeError('confirmPassword');
        setConfirmPassword(value);
        validateConfirmPassword(password, value);
    }


    function handlePasswordOnChange(e) {
        //setServerErrors("");
        const value = e.target.value;
        
        if (value==='') { 
            removeError('confirmPassword');
        }

        removeError('password');
        setPassword(value);
    }

    function validateRegistrationForm(eventName, {email, password, confirmPassword}) {
        const errors = {};

        const addError = (field, condition, message) => {
            if (!errors[field] && condition) {
                errors[field] = message;
            }
        }

        addError('email', !email, 'Email is required.');
        addError('email', !validator.isEmail(email), 'Please enter a valid email address.');
        addError('password', !password, 'Password is required.');

        if (eventName === 'registration') {
            addError('confirmPassword', !confirmPassword, 'Please confirm password.');
            addError('password', password.length<8, 'Password must be at least 8 characters.');
            addError('confirmPassword', !(password===confirmPassword), "Passwords don't match.");
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
            setFieldErrors({confirmPassword: "Passwords don't match."});
        }
    };

    function removeError(field) {
        setFieldErrors(prev => {
            const {[field]: _, ...rest} = prev;
            return rest;
        })
    };

    if (registrationMode) {
        loginContent = <LoginFormRegister fieldErrors={fieldErrors} handleEmailOnChange={handleEmailOnChange} handlePasswordOnChange={handlePasswordOnChange} handleConfirmPasswordChange={handleConfirmPasswordChange} setRegistrationMode={setRegistrationMode} />
    } else {
        loginContent = <LoginFormLogin fieldErrors={fieldErrors} handleEmailOnChange={handleEmailOnChange} handlePasswordOnChange={handlePasswordOnChange} setRegistrationMode={setRegistrationMode} />
    }

    return  (<form onSubmit={handleOnSubmit} className="login-form-wrapper">
                {<div className="error-box">{serverError}</div>}
                {loginContent}
             </form>);
};