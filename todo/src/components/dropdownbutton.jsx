import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCompleted } from "../slices/todoSlicer";
import { clearCompletedTodos } from '../thunks/todoThunks';

export function DropDownButton({handleOnClick}) {
    const [ isToggled, setIsToggled ] = useState(false);
    const dispatch = useDispatch();

    function handleDropDownClick(e) {
        e.stopPropagation();
        setIsToggled(!isToggled);
    }

    function handleClearCompleted() {
        dispatch(clearCompletedTodos());
    }

    function handleOnBlur(e) {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsToggled(false);
    }
    
    return  <div className="dropdown-button" tabIndex={0} onBlur={handleOnBlur}>
                <button className="todo-controls-button" onClick={handleOnClick}>
                    <span>Clear todos</span>
                    <span className="caret" onClick={handleDropDownClick}> ▼ </span>
                </button>
                { isToggled && (<div className="dropdown-panel">
                                    <button className="todo-controls-button dropdown-item" onClick={handleClearCompleted} >Clear completed</button>
                                    <button className="todo-controls-button dropdown-item" style={{ display: "none"}}>Mark all as done</button>
                                    <button className="todo-controls-button dropdown-item" style={{ display: "none"}}>Mark all as active</button>
                                    <button className="todo-controls-button dropdown-item" style={{ display: "none"}}>Sort todos</button>
                                </div>)}
            </div>
}