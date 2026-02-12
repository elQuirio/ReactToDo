import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCompletedTodos, markAllAsActiveTodos, markAllAsCompletedTodos, clearTodos } from '../thunks/todoThunks';
import { fetchPreferences } from '../thunks/preferencesThunk';
import { CircleChevronUp, CircleChevronDown } from 'lucide-react';
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
        dispatch(clearCompletedTodos());
    }

    function handleMarkAllAsActive() {
        dispatch(markAllAsActiveTodos());
    }

    function handleMarkAllAsDone() {
        dispatch(markAllAsCompletedTodos());
    }

    function handleOnBlur(e) {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsToggled(false);
    }

    function handleClearAllTodos() {
        dispatch(clearTodos());
    };

    
    if (isToggled) {
        dropDownPanel = (<div className="dropdown-panel dropdown-panel--up">
                            <button className="dropdown-item" onClick={handleClearAllTodos} >Clear all</button>
                            <button className="dropdown-item" onClick={handleClearCompleted} >Clear completed</button>
                            <button className="dropdown-item" onClick={handleMarkAllAsDone}>Mark all done</button>
                            <button className="dropdown-item" onClick={handleMarkAllAsActive}>Mark all active</button>
                        </div>)
        caret = (< CircleChevronDown size={24} onClick={handleDropDownClick}/>)
    } else {
        caret = (< CircleChevronUp size={24} onClick={handleDropDownClick}/>)
    }

    
    return  <div className={`dropdown-button ${searchButtonActive ? 'disabled' : ''}`} disabled={searchButtonActive} tabIndex={0} onBlur={handleOnBlur}>
                <button className={`todo-controls-caret ${searchButtonActive ? 'disabled' : ''}`} title={searchButtonActive ? 'Disable search mode to use actions' : ''} disabled={searchButtonActive} >
                    { caret }
                </button>
                { dropDownPanel }
            </div>
}