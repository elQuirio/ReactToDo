import { selectAuthLoading } from "../selectors/authSelector";
import { useSelector } from "react-redux";
import { LoginFormInput } from "./loginFormInput";

export function LoginFormLogin({fieldErrors, handleEmailOnChange, handlePasswordOnChange, setRegistrationMode}) {
    const isAuthLoading = useSelector(selectAuthLoading);

    
    return (<div className="login-form-container">
                <div>
                    <LoginFormInput fieldError={fieldErrors.email} inputType={'email'} placeholder={'Email...'} onChange={handleEmailOnChange} />
                    <LoginFormInput fieldError={fieldErrors.password} inputType={'password'} placeholder={'Password...'} onChange={handlePasswordOnChange} />
                </div>

                <button type="submit" className="login-form-button" disabled={isAuthLoading}>
                    {isAuthLoading ? <><div>Logging in...</div><div className="button-spinner"></div></> : <div>Login</div>}
                </button>
                <button type='button' onClick={() => {setRegistrationMode(true)}} className="login-form-button">Register</button>
            </div>)
};