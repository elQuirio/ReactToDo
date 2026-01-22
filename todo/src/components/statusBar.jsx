import { useSelector, useDispatch } from 'react-redux';
import { collapseAll, searchBtnToggle, updateSearchString } from "../slices/uiTodoSlicer";
import { sortByTodos } from '../thunks/todoThunks';
import { updatePreferences } from '../thunks/preferencesThunk';
import { selectSortDirection, selectSortBy, selectViewMode } from '../selectors/preferencesSelector';
import { selectSearchBtnToggled } from '../selectors/uiSelectors';
import { selectActiveTodos, selectCompletedTodos, selectOverdueTodos } from '../selectors/todoSelectors';
import { SortMethodSwitch } from '../components/sortMethodSwitch';
import { Search, Minimize2, ArrowUpNarrowWide, ArrowDownNarrowWide } from "lucide-react";

export function StatusBar({ searchString }) {
    const activeTodos = useSelector(selectActiveTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const overdueTodos = useSelector(selectOverdueTodos);
    const currentDirection = useSelector(selectSortDirection);
    const currentSortBy = useSelector(selectSortBy);
    const viewMode = useSelector(selectViewMode);
    const searchButtonActive = useSelector(selectSearchBtnToggled);

    let sortComponent = '';

    const dispatch = useDispatch();


    function handleCollapseAll() {
        dispatch(collapseAll());
    }

    function handleSortTodos() {
        if (currentDirection=="asc") {
            dispatch(sortByTodos({sortDirection: 'desc', sortBy: currentSortBy}));
            dispatch(updatePreferences({sortDirection: "desc"}));
        } else if (currentDirection== "desc") {
            dispatch(sortByTodos({sortDirection: 'asc', sortBy:currentSortBy}));
            dispatch(updatePreferences({sortDirection: "asc"}));
        } 
    }

    function handleShowAll() {
        dispatch(updatePreferences({viewMode: 'all'}));
    }

    function handleShowActive() {
        dispatch(updatePreferences({viewMode: 'active'}));
    }

    function handleToggleSearch() {
        //condizione che resetta il search string
        dispatch(updateSearchString({text: searchString}));
        dispatch(searchBtnToggle());
    }

    if (currentDirection === "desc") {
        sortComponent = <ArrowDownNarrowWide className='sort-icon' size={18}/>
    } else {
        sortComponent = <ArrowUpNarrowWide className='sort-icon' size={18}/>
    }


    return <div className="status-bar-mini">
            <span className='quick-actions-container'>
                <button className={`search-button quick-actions-button ${searchButtonActive?"active":""}`} onClick={handleToggleSearch} title='Search mode' aria-label='Search mode'><Search className='search-icon' size={18}/></button>
                <button className='sort-button quick-actions-button' onClick={handleSortTodos} title='Sort direction' aria-label='Sort direction'>{sortComponent}</button>
                <button className='collapse-button quick-actions-button' onClick={handleCollapseAll} title='Collapse all todos' aria-label='Collapse all todos' ><Minimize2 className='collapse-icon' size={18}/></button>
                <SortMethodSwitch />
            </span>
            <span className='status-chip-container'>
                <span className='status-chip'>Active: {activeTodos.length}</span>
                <span className="dot"> | </span>
                <span className='status-chip'>Completed: {completedTodos.length}</span>
                <span className="dot"> | </span>
                <span className='status-chip'>Overdue: {overdueTodos.length}</span>
            </span>
            <span>
                <div className='viewMode-selector-container'>
                    <button type='button' className={`viewMode-button ${viewMode === 'active' ? 'active' : ''}`} onClick={handleShowActive}>Active</button>
                    <button type='button' className={`viewMode-button ${viewMode === 'all' ? 'active' : ''}`} onClick={handleShowAll}>All</button>
                </div>
            </span>
        </div>
}
