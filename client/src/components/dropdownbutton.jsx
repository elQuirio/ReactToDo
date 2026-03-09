import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markAllAsActiveTodos, markAllAsCompletedTodos, clearTodos } from '../thunks/todoThunks';
import { fetchPreferences } from '../thunks/preferencesThunk';
import { ListChevronsUpDown, ListChevronsDownUp } from 'lucide-react';
import { selectSearchBtnToggled } from "../selectors/uiSelectors";

export function DropDownButton() {
    const [ isToggled, setIsToggled ] = useState(false);
    const dispatch = useDispatch();
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    let dropDownPanel = '';
    let caret;

    useEffect(() => {dispatch(fetchPreferences())}, [dispatch]);

    function handleDropDownClick(e) {
        e.stopPropagation();
        setIsToggled(!isToggled);
    }

    function handleClearCompleted() {
        dispatch(clearTodos('completed'));
        setIsToggled(false);
    }

    function handleMarkAllAsActive() {
        dispatch(markAllAsActiveTodos());
        setIsToggled(false);
    }

    function handleMarkAllAsDone() {
        dispatch(markAllAsCompletedTodos());
        setIsToggled(false);
    }

    function handleOnBlur(e) {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsToggled(false);
    }

    function handleClearAllTodos() {
        dispatch(clearTodos('all'));
        setIsToggled(false);
    };

    
    if (isToggled) {
        dropDownPanel = (<div className="dropdown-panel dropdown-panel--up">
                            <button className="dropdown-item" onClick={handleClearAllTodos} >Clear all</button>
                            <button className="dropdown-item" onClick={handleClearCompleted} >Clear completed</button>
                            <button className="dropdown-item" onClick={handleMarkAllAsDone}>Mark all done</button>
                            <button className="dropdown-item" onClick={handleMarkAllAsActive}>Mark all active</button>
                        </div>)
        caret = (< ListChevronsDownUp size={28} onClick={handleDropDownClick}/>)
    } else {
        caret = (< ListChevronsUpDown size={28} onClick={handleDropDownClick}/>)
    }

    
    return  <div className={`dropdown-button ${searchButtonActive ? 'disabled' : ''}`} tabIndex={0} onBlur={handleOnBlur}>
                <button className={`todo-controls-button ${searchButtonActive ? 'disabled' : ''}`} title={searchButtonActive ? 'Disable search mode to use actions' : ''} disabled={searchButtonActive} >
                    { caret }
                </button>
                { dropDownPanel }
            </div>
}