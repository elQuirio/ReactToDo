import { useDispatch, useSelector } from 'react-redux';
import { User, Sun, Moon } from "lucide-react";
import { logoutUser } from "../thunks/authThunks";
import { updatePreferences } from '../thunks/preferencesThunk';
import { selectIsDarkMode } from '../selectors/preferencesSelector';

export default function UserPanel () {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(selectIsDarkMode);

    function handleLogoutOnClick () {
        dispatch(logoutUser());
    }

    function handleOnChangeDarkSwitch(e) {
        console.log(e.target.checked);
        dispatch(updatePreferences({isDarkMode: e.target.checked}))
    }

    return (<div>
                <User size={20} strokeWidth={2} style={{ border: "1px solid white", padding: 8, borderRadius: 20 }}/>
                <button onClick={handleLogoutOnClick}>Logout</button>
                <label className='switch'>
                    <input type='checkbox' checked={isDarkMode} onChange={(e)=> handleOnChangeDarkSwitch(e)}/>
                    <span className="slider round">
                        <Moon className='moon-slider' size={14}/>
                        <Sun className='sun-slider' size={14}/>
                    </span>
                </label>
            </div>)
}