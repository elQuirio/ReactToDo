import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCompletedTodos, markAllAsActiveTodos, markAllAsCompletedTodos } from '../thunks/todoThunks';
import { fetchPreferences } from '../thunks/preferencesThunk';

export function DropDownButton({handleOnClick}) {
    const [ isToggled, setIsToggled ] = useState(false);
    const dispatch = useDispatch();
    let dropDownPanel = '';

    //allo startup controllare che il sort sempre coerente con preferences
    useEffect(() => {dispatch(fetchPreferences())}, [dispatch]);
    //aggiungere handling con resort per todo aggiunti successivamente al primo sorting
    //aggiungere logica di sorting per nome e data invece che per position

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


    if (isToggled) {
        dropDownPanel = (<div className="dropdown-panel">
                            <button className="todo-controls-button dropdown-item" onClick={handleClearCompleted} >Clear completed</button>
                            <button className="todo-controls-button dropdown-item" onClick={handleMarkAllAsDone}>Mark all as done</button>
                            <button className="todo-controls-button dropdown-item" onClick={handleMarkAllAsActive}>Mark all as active</button>
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