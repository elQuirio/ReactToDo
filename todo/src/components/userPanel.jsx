import { useDispatch } from 'react-redux';
import { User } from "lucide-react";
import { logout } from '../slices/authSlice';

export default function UserPanel () {
    const dispatch = useDispatch();

    function handleLogoutOnClick () {
        dispatch(logout());
    }

    return (<div>
                <User size={20} strokeWidth={2} style={{ border: "1px solid white", padding: 8, borderRadius: 20 }}/>
                <button onClick={handleLogoutOnClick}>Logout</button>
            </div>)
}