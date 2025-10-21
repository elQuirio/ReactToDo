import { useSelector } from 'react-redux';
import { selectActiveTodos, selectCompletedTodos, selectOverdueTodos } from '../selectors/todoSelectors';
import { Search, ArrowUpAZ, ArrowDownZA, Minimize2, Maximize2 } from "lucide-react";

export function StatusBar() {
    const activeTodos = useSelector(selectActiveTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const overdueTodos = useSelector(selectOverdueTodos);


    // aggiungere cambio button con ordinamento e collapse expand
    return <div className="status-bar-mini">
            <span className='quick-actions-container'>
                <button className='search-button quick-actions-button'><Search className='search-icon' size={18}/></button>
                <button className='sort-button quick-actions-button'><ArrowUpAZ className='sort-icon' size={18}/></button>
                <button className='collapse-button quick-actions-button'><Minimize2 className='collapse-icon' size={18}/></button>
            </span>
            <span className='status-chip-container'>
                <span className='status-chip'>Active: {activeTodos.length}</span>
                <span className="dot"> | </span>
                <span className='status-chip'>Completed: {completedTodos.length}</span>
                <span className="dot"> | </span>
                <span className='status-chip'>Overdue: {overdueTodos.length}</span>
            </span>
        </div>
}
