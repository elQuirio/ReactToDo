import { useSelector } from 'react-redux';
import { selectActiveTodos, selectCompletedTodos, selectOverdueTodos } from '../selectors/todoSelectors';

export function StatusBar() {
    const activeTodos = useSelector(selectActiveTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const overdueTodos = useSelector(selectOverdueTodos);

    return <div className="status-bar-mini">
            <span className='status-chip'>Active: {activeTodos.length}</span>
            <span className="dot"> | </span>
            <span className='status-chip'>Completed: {completedTodos.length}</span>
            <span className="dot"> | </span>
            <span className='status-chip'>Overdue: {overdueTodos.length}</span>
        </div>
}
