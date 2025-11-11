import { useState } from 'react';
import { User } from "lucide-react";
import SortDropdown from "./sortDropdown";

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    let sidebarContent;

    function handleExpandButton() {
        setIsExpanded(!isExpanded);
    }
    if (isExpanded) {
        sidebarContent = <SortDropdown />
    } else {
        sidebarContent = <div></div>
    }
    

    return <><div className={isExpanded ? "sidebar open" : "sidebar"}>
            <button className="sidebar-action-button" onClick={handleExpandButton}>☰</button>
            {sidebarContent}
            </div>
            
            </>

}