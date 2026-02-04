import { selectAuthLoading } from "../selectors/authSelector";
import { useSelector } from "react-redux";

export function LoginFormLogin({fieldErrors, handleEmailOnChange, handlePasswordOnChange, setRegistrationMode}) {
    const isAuthLoading = useSelector(selectAuthLoading);


    return (<div className="login-form-container">
                <div>
                    <div className="login-form-input-wrapper">
                        <input type="email" placeholder="Email..." onChange={(e)=> handleEmailOnChange(e)} className="login-form-input"/>
                        {fieldErrors.email && <div className="login-form-input-bubble">
                            {fieldErrors.email}
                            <span className="error-arrow"/>
                        </div>}
                    </div>
                    <div className="login-form-input-wrapper">
                        <input type="password" placeholder="Password..." onChange={(e) => handlePasswordOnChange(e)} className="input-password login-form-input"/>
                        {fieldErrors.password && <div className="login-form-input-bubble">
                            {fieldErrors.password}
                            <span className="error-arrow"/>
                        </div>}
                    </div>
                </div>

                <button type="submit" className="login-form-button" disabled={isAuthLoading}>
                    {isAuthLoading ? <><div>Logging in...</div><div className="button-spinner"></div></> : <div>Login</div>}
                </button>
                <button type='button' onClick={() => {setRegistrationMode(true)}} className="login-form-button">Register</button>
            </div>)
};