import { useSelector, useDispatch } from 'react-redux';
import { collapseAll, searchBtnToggle } from "../slices/uiTodoSlicer";
import { sortByDirectionTodos } from '../thunks/todoThunks';
import { updatePreferences } from '../thunks/preferencesThunk';
import { selectSortDirection } from '../selectors/preferencesSelector';
import { selectSearchBtnToggled } from '../selectors/uiSelectors';
import { selectActiveTodos, selectCompletedTodos, selectOverdueTodos } from '../selectors/todoSelectors';
import { Search, ArrowUpAZ, ArrowDownZA, Minimize2, Maximize2 } from "lucide-react";

export function StatusBar() {
    const activeTodos = useSelector(selectActiveTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const overdueTodos = useSelector(selectOverdueTodos);
    const currentDirection = useSelector(selectSortDirection);
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    console.log(searchButtonActive);
    let sortComponent = '';

    const dispatch = useDispatch();

    function handleCollapseAll() {
        dispatch(collapseAll());
    }

    function handleSortTodos() {
        if (currentDirection=="asc") {
            dispatch(sortByDirectionTodos('desc'));
            dispatch(updatePreferences({sortDirection: "desc"}));
        } else if (currentDirection== "desc") {
            dispatch(sortByDirectionTodos('asc'));
            dispatch(updatePreferences({sortDirection: "asc"}));
        } 
    }

    function handleToggleSearch() {
        dispatch(searchBtnToggle());
    }

    if (currentDirection==="asc") {
        sortComponent = <ArrowUpAZ className='sort-icon' size={18}/>
    } else if (currentDirection === "desc") {
        sortComponent = <ArrowDownZA className='sort-icon' size={18}/>
    }

    


    // aggiungere cambio button con ordinamento e collapse expand
    return <div className="status-bar-mini">
            <span className='quick-actions-container'>
                <button className={`search-button quick-actions-button ${searchButtonActive?"active":""}`} onClick={handleToggleSearch}><Search className='search-icon' size={18}/></button>
                <button className='sort-button quick-actions-button' onClick={handleSortTodos}>{sortComponent}</button>
                <button className='collapse-button quick-actions-button' onClick={handleCollapseAll}><Minimize2 className='collapse-icon' size={18}/></button>
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
