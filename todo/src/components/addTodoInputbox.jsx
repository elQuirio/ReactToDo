import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, clearAllTodos } from "../slices/todoSlicer";
import { v4 as uuid } from 'uuid';
import  { DropDownButton } from './dropdownbutton';
import { StatusBar } from './statusBar';
import { fetchTodos, insertTodo, clearTodos } from '../thunks/todoThunks';


export default function AddTodoInputbox() {
    const [text, setText] = useState('');
    const [isDroppedDown, setIsDroppedDown] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => { dispatch(fetchTodos()) }, [dispatch]);

    function handleAddTodoClick () {
        if (text.trim()) {
            const now = Date.now();
            dispatch(insertTodo({id: uuid(), text: text, status: 'active', createdAt: now, updatedAt: now, toBeCompletedAt: null }))
            setText('');
        }
    };

    function handleClearAllTodos() {
        dispatch(clearTodos());
        setText('');
    };

    function handleOnChangeInputbox(e) {
        setText(e.target.value);
    };

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleAddTodoClick();
        } else if (e.key === "Escape") {
            setText('');
            e.target.blur();
        }
    }

    return (<div className="control-bar">
                <input className="addTodo" type="text" value={text} onChange={handleOnChangeInputbox} onKeyDown={handleKeyDown}/>
                <button className="todo-controls-button" onClick={handleAddTodoClick}>Add todo</button>
                < DropDownButton handleOnClick={handleClearAllTodos} />
                <StatusBar />
            </div>)
}