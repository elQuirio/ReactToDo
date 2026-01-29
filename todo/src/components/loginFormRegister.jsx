
export function LoginFormRegister({fieldErrors, handleEmailOnChange, handlePasswordOnChange, handleConfirmPasswordChange, setRegistrationMode}) {


    return <div className="login-form-container">
                <input type="email" placeholder="Email..." onChange={(e)=> handleEmailOnChange(e)} className="login-form-input"/>
                {fieldErrors.email && <div className="login-input-error-text">{fieldErrors.email}</div>}
                <input type="password" placeholder="Password..." onChange={(e) => handlePasswordOnChange(e)} className="input-password login-form-input"/>
                {fieldErrors.password && <div className="login-input-error-text">{fieldErrors.password}</div>}
                <input type="password" placeholder="Confirm password..." className={fieldErrors.password ? 'password-error login-form-input' : 'input-password login-form-input'} onChange={(e) => handleConfirmPasswordChange(e)}/>
                {fieldErrors.confirmPassword && <div className="login-input-error-text">{fieldErrors.confirmPassword}</div>}
                <button type='submit' className="login-form-button">Confirm</button>
                <button type="button" onClick={() => setRegistrationMode(false)} className="login-form-button">Login</button>
            </div>
};