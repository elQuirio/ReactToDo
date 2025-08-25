import { useState } from "react";
import { updateTodoText } from '../slices/todoSlicer';
import { useDispatch } from "react-redux";
import { toggleTodoStatus } from '../slices/todoSlicer';
import { saveTodo } from "../thunks/todoThunks";

export function TodoItem({id, status, text }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(text);
    const dispatch = useDispatch();

    function handleDoubleClick(status) {
        if (status !== 'completed') {
            setIsEditing(true);
        }
    };

    function handleOnBlur() {
        if (tempText !== '') {
            dispatch(saveTodo({id: id, text: tempText, status: status}))
            //dispatch(updateTodoText({id: id, text: tempText}));
        }
        setIsEditing(false);
    };

    function handleCheckboxChange(id) {
        //console.log({id: id, text: text, status: status === 'active' ? 'completed' : 'active'});
        dispatch(saveTodo({id: id, text: text, status: status === 'active' ? 'completed' : 'active'}))
        //dispatch(toggleTodoStatus({id}));
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

    return  <div className={`todo-item ${status === "active" ? "active" : "done"}`} onDoubleClick={() => handleDoubleClick(status)} >
            <input type="checkbox" checked={status === "active" ? false : true} onChange={() => handleCheckboxChange(id)} /> 
            {isEditing ? (<input className = "todo-edit-input" autoFocus value={tempText} onChange={(e) => {setTempText(e.target.value)}} onBlur={handleOnBlur} onKeyDown={handleKeyDown} />) 
            :
            (<span className="todo-text" > {text}</span>)}
            </div>
};
