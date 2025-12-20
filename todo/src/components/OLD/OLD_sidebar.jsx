import { useState } from 'react';
import UserPanel from '../components/userPanel';
import SortDropdown from "./sortDropdown";
import LoginForm from "./loginForm";

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    let sidebarContent;

    function handleExpandButton() {
        setIsExpanded(!isExpanded);
    }
    if (isExpanded) {
        sidebarContent = (<><SortDropdown /> 
                            <UserPanel /></>)
    } else {
        sidebarContent = <div></div>
    }
    
// cambiare con logout buttn
    return <div className={isExpanded ? "sidebar open" : "sidebar"}>
            <button className="sidebar-action-button" onClick={handleExpandButton}>☰</button>
            {sidebarContent} 
            </div>
}