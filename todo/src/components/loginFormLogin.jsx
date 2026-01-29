
export function LoginFormLogin({fieldErrors, handleEmailOnChange, handlePasswordOnChange, setRegistrationMode}) {


    return (<div className="login-form-container">
                <input type="email" placeholder="Email..." onChange={(e)=> handleEmailOnChange(e)} className="login-form-input"/>
                {fieldErrors.email && <div className="login-input-error-text">{fieldErrors.email}</div>}
                <input type="password" placeholder="Password..." onChange={(e) => handlePasswordOnChange(e)} className="input-password login-form-input"/>
                {fieldErrors.password && <div className="login-input-error-text">{fieldErrors.password}</div>}
                <button type="submit" className="login-form-button">Login</button>
                <button type='button' onClick={() => {setRegistrationMode(true)}} className="login-form-button">Register</button>
            </div>)
};