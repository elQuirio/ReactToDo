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

    function handleOnClick() {
        setIsExpanded(!isExpanded);
    };

    function handleDoubleClick() {
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

    function handleCheckboxChange() {
        dispatch(saveTodo({id: id, text: text, status: status === 'active' ? 'completed' : 'active', createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt }))
    };

    function handlePlus1d() {
        let dueDate;
        if (!toBeCompletedAt) {
            dueDate = Date.now() + (24 * 60 * 60 * 1000); //add one day
        } else {
            dueDate = toBeCompletedAt + (24 * 60 * 60 * 1000);
        }
        dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: dueDate }))
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') 
        {
            handleOnBlur()
        } else if (e.key === 'Escape') {
            setTempText(text);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        todoContent = (<input className = {`todo-edit-input ${status === "active" ? "todo-active" : "todo-done"}`} autoFocus value={tempText} onChange={(e) => {setTempText(e.target.value)}} onBlur={handleOnBlur} onKeyDown={handleKeyDown} />);
    } else if (!isEditing) {
        todoContent = (<span className={`todo-text ${status === "active" ? "todo-active" : "todo-done"}`} > {text}</span>);
    }

    return  <div className={`todo-item`} onDoubleClick={() => handleDoubleClick(status)} >
                <div className="todo-header">
                    <input type="checkbox" checked={status === "active" ? false : true} onChange={() => handleCheckboxChange(id)} onClick={(e) => e.stopPropagation()}/> 
                    {todoContent}
                    <button className="expand-todo-btn" onClick={() => handleOnClick()}>{isExpanded ? "-" : "+" }</button>
                </div>

                {isExpanded && (<div className="todo-details">
                    <div className="detail-row"><span className="label">Created:</span> {createdAt ? new Date(createdAt).toLocaleString() : "—"}</div>
                    <div className="detail-row"><span className="label">Updated:</span> {updatedAt ? new Date(updatedAt).toLocaleString() : "—"}</div>
                    <div className="detail-row"><span className="label">Due:</span> {toBeCompletedAt ? new Date(toBeCompletedAt).toLocaleString() : "—"}</div>
                    <button className="detail-row due-date-button" onClick={handlePlus1d}>+1d</button>
                </div>)}
            </div>
};
