import { User, Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../thunks/authThunks";
import { updatePreferences } from '../thunks/preferencesThunk';
import { selectIsLightMode } from '../selectors/preferencesSelector';
import { selectUser } from '../selectors/authSelector';
import SortDropdown from './sortDropdown';


export default function UserMenu() {
    const isLightMode = useSelector(selectIsLightMode);
    const user = useSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        function onPageClick(e) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setIsOpen(false);
        }
        function onEsc(e) {
            if (e.key === 'Escape') setIsOpen(false);
        }

        document.addEventListener('mousedown', onPageClick);
        document.addEventListener('keydown', onEsc);

        return () => {
            document.removeEventListener('mousedown',onPageClick);
            document.removeEventListener('keydown', onEsc);
        }
    }, []);

    function handleOpenMenu() {
        setIsOpen(!isOpen);
    }

    function handleLogoutOnClick () {
        dispatch(logoutUser());
    }

    function handleOnChangeDarkSwitch(e) {
        const isLightModeValue = e.target.checked;
        console.log(isLightModeValue);
        dispatch(updatePreferences({isLightMode: isLightModeValue}));
        localStorage.setItem('isLightMode', String(isLightModeValue));
    }

    return (<div className='user-menu-container' ref={rootRef}>
                <button className='user-preferences-button' onClick={handleOpenMenu}>
                    <User size={20} className='user-preferences-icon' strokeWidth={2}/>
                </button>
              <div className={`user-menu-panel ${isOpen ? 'open' : ''}`}>
                            <div className='user-info-wrapper'>
                                <div>User email: {user}</div>
                            </div>
                            <div className='user-divider'></div>
                            <SortDropdown className='user-panel-item'/> 
                            <label className='switch user-panel-item'>
                                <input type='checkbox' checked={isLightMode} onChange={(e)=> handleOnChangeDarkSwitch(e)}/>
                                <span className="slider round">
                                    <Moon className='moon-slider' size={14}/>
                                    <Sun className='sun-slider' size={14}/>
                                </span>
                            </label>
                            <button className='logout-button user-panel-item' onClick={handleLogoutOnClick}>Logout</button>
                        </div>
              </div>);
}