import { useDispatch } from 'react-redux';
import { User } from "lucide-react";
import { logoutUser } from "../thunks/authThunks";

export default function UserPanel () {
    const dispatch = useDispatch();

    function handleLogoutOnClick () {
        dispatch(logoutUser());
    }

    return (<div>
                <User size={20} strokeWidth={2} style={{ border: "1px solid white", padding: 8, borderRadius: 20 }}/>
                <button onClick={handleLogoutOnClick}>Logout</button>
            </div>)
}