import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markAllAsCompletedTodos } from "../thunks/todoThunks";
import { collapseAll } from "../slices/uiTodoSlicer";
import { clearCompletedTodos, markAllAsActiveTodos, sortByDirectionTodos } from '../thunks/todoThunks';
import { selectSortDirection } from '../selectors/preferencesSelector';
import { fetchPreferences, updatePreferences } from '../thunks/preferencesThunk';

export function DropDownButton({handleOnClick}) {
    const [ isToggled, setIsToggled ] = useState(false);
    const dispatch = useDispatch();
    let dropDownPanel = '';

    //allo startup controllare che il sort sempre coerente con preferences
    useEffect(() => {dispatch(fetchPreferences())}, [dispatch]);
    //aggiungere handling con resort per todo aggiunti successivamente
    const currentDirection = useSelector(selectSortDirection);

    console.log('CurrentDirection:');
    console.log(currentDirection);

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
        //pulire e aggiungere cambio name dinamico nel button
        console.log('current direction inner:');
        console.log(currentDirection);
        if (currentDirection=="asc") {
            dispatch(sortByDirectionTodos('desc'));
            dispatch(updatePreferences({sortDirection: "desc"}));
        } else if (currentDirection== "desc") {
            dispatch(sortByDirectionTodos('asc'));
            dispatch(updatePreferences({sortDirection: "asc"}));
        } 
    }

    //implementare tutti gli altri pulsanti
    //aggiungere toggle al pulsante con direzione attuale
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