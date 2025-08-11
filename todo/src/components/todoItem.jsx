import { useState } from "react";
import { updateTodoText } from '../slices/todoSlicer';
import { useDispatch } from "react-redux";
import { toggleTodoStatus } from '../slices/todoSlicer';

export function TodoItem({id, status, text }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(text);
    const dispatch = useDispatch();

    function handleDoubleClick() {
        setIsEditing(true);
    };

    function handleOnBlur() {
        if (tempText !== '') {
            dispatch(updateTodoText({id: id, text: tempText}));
        }
        setIsEditing(false);
    };

    function handleCheckboxChange(id) {
        dispatch(toggleTodoStatus({id}));
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

    return  <div className={`todo-item ${status === "active" ? "active" : "done"}`} onDoubleClick={handleDoubleClick} >
            <input type="checkbox" checked={status === "active" ? false : true} onChange={() => handleCheckboxChange(id)} /> 
            {isEditing ? (<input className = "todo-edit-input" autoFocus value={tempText} onChange={(e) => {setTempText(e.target.value)}} onBlur={handleOnBlur} onKeyDown={handleKeyDown} />) 
            :
            (<span className="todo-text" > {text}</span>)}
            </div>
};
