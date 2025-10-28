import { useState } from 'react';
import { User } from "lucide-react";

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    function handleExpandButton() {
        setIsExpanded(!isExpanded);
    }
    

    return  <div className={isExpanded ? "sidebar open" : "sidebar"}>
            <button className="sidebar-action-button" onClick={handleExpandButton}>☰</button>
            </div>

}