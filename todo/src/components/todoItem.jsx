import { useState } from "react";
import { updateTodoText } from '../slices/todoSlicer';
import { useDispatch } from "react-redux";
import { toggleTodoStatus } from '../slices/todoSlicer';
import { saveTodo } from "../thunks/todoThunks";

export function TodoItem({id, status, text, createdAt, updatedAt, toBeCompletedAt }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(text);
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();
    let todoContent = '';

    function handleDoubleClick(status) {
        if (status !== 'completed') {
            setIsEditing(true);
        }
    };

    function handleOnBlur() {
        if (tempText !== '') {
            dispatch(saveTodo({id: id, text: tempText, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt }))
        }
        setIsEditing(false);
    };

    function handleCheckboxChange(id) {
        dispatch(saveTodo({id: id, text: text, status: status === 'active' ? 'completed' : 'active', createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt }))
    };

    function handleKeyDown(e) {
        if (e.key === 'Enter') 
        {
            handleOnBlur()
        } else if (e.key === 'Escape') {
            setTempText(text);
            setIsEditing(false);
        }
    };

    if (isEditing && !isExpanded) {
        todoContent = (<input className = "todo-edit-input" autoFocus value={tempText} onChange={(e) => {setTempText(e.target.value)}} onBlur={handleOnBlur} onKeyDown={handleKeyDown} />);
    } 
    else if (!isEditing && isExpanded) {
        // template filler for expanding body development
        todoContent = (<div></div>)
    } else if (!isEditing && !isExpanded) {
        todoContent = (<span className="todo-text" > {text}</span>);
    }

    return  <div className={`todo-item ${status === "active" ? "active" : "done"}`} onDoubleClick={() => handleDoubleClick(status)} >
            <input type="checkbox" checked={status === "active" ? false : true} onChange={() => handleCheckboxChange(id)} /> 
            {todoContent}
            </div>
};
