import { useState } from "react";
import { useDispatch } from "react-redux";
import { markAllAsCompletedTodos } from "../thunks/todoThunks";
import { collapseAll } from "../slices/uiTodoSlicer";
import { clearCompletedTodos, markAllAsActiveTodos, sortByDirectionTodos } from '../thunks/todoThunks';

export function DropDownButton({handleOnClick}) {
    const [ isToggled, setIsToggled ] = useState(false);
    const dispatch = useDispatch();
    let dropDownPanel = '';

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

    function handleCollapseAll() {
        dispatch(collapseAll());
    }

    function handleOnBlur(e) {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsToggled(false);
    }
    function handleSortTodos() {
        dispatch(sortByDirectionTodos('desc'));
    }

    //implementare tutti gli altri pulsanti
    if (isToggled) {
        dropDownPanel = (<div className="dropdown-panel">
                            <button className="todo-controls-button dropdown-item" onClick={handleClearCompleted} >Clear completed</button>
                            <button className="todo-controls-button dropdown-item" onClick={handleMarkAllAsDone}>Mark all as done</button>
                            <button className="todo-controls-button dropdown-item" onClick={handleMarkAllAsActive}>Mark all as active</button>
                            <button className="todo-controls-button dropdown-item" onClick={handleSortTodos}>Sort todos</button>
                            <button className="todo-controls-button dropdown-item" onClick={handleCollapseAll} >Collapse todos</button>
                        </div>)
    }

    
    return  <div className="dropdown-button" tabIndex={0} onBlur={handleOnBlur}>
                <button className="todo-controls-button" onClick={handleOnClick}>
                    <span>Clear todos</span>
                    <span className="caret" onClick={handleDropDownClick}> ▼ </span>
                </button>
                { dropDownPanel }
            </div>
}