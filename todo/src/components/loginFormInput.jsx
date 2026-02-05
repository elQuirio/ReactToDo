
export function LoginFormInput({fieldError, inputType, placeholder, onChange, extraClass = ''}) {


    return <div className="login-form-input-wrapper">
                <input type={inputType} placeholder={placeholder} onChange={(e) => onChange(e)} className={`login-form-input ${extraClass}`} />
                    {fieldError && <div className="login-form-input-bubble">
                        {fieldError}
                    <span className="error-arrow"/>
                </div>}
            </div>
}