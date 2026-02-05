import { selectAuthLoading } from '../selectors/authSelector';
import { useSelector } from 'react-redux';
import { LoginFormInput } from "./loginFormInput";

export function LoginFormRegister({fieldErrors, handleEmailOnChange, handlePasswordOnChange, handleConfirmPasswordChange, setRegistrationMode}) {
    const isAuthLoading = useSelector(selectAuthLoading);


    return <div className="login-form-container">
                <div>

                    <LoginFormInput fieldError={fieldErrors.email} inputType={'email'} placeholder={'Email...'} onChange={handleEmailOnChange} />
                    <LoginFormInput fieldError={fieldErrors.password} inputType={'password'} placeholder={'Password...'} onChange={handlePasswordOnChange} />
                    <LoginFormInput fieldError={fieldErrors.confirmPassword} inputType={'password'} placeholder={'Confirm password...'} onChange={handleConfirmPasswordChange} extraClass={fieldErrors.password ? 'password-error login-form-input' : 'login-form-input'} />
                </div>

                <button type='submit' className="login-form-button">
                    {isAuthLoading ? <><div>Registering...</div><div className='button-spinner'></div></> : <div>Confirm</div>}
                </button>
                <button type="button" onClick={() => setRegistrationMode(false)} className="login-form-button">Login</button>
            </div>
};