import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveTodo } from "../thunks/todoThunks";
import { useRef } from "react";
import { toggleId } from "../slices/uiTodoSlicer";

export function TodoItem({id, status, text, createdAt, updatedAt, toBeCompletedAt, isExpanded }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(text);
    //const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();
    const refDatePicker = useRef(null);
    const oneDay = 24 * 60 * 60 * 1000;
    let todoContent = '';
    let dueDateCommands = '';

    function handleOnClick() {
        dispatch(toggleId({ id: id }));
        //setIsExpanded(!isExpanded);
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
        if (status !== 'completed') {
            let dueDate;
            if (!toBeCompletedAt) {
                dueDate = Date.now() + oneDay; //add one day
            } else {
                dueDate = toBeCompletedAt + oneDay;
            }
            dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: dueDate }))
        }
    }

    function handleResetDue() {
        if (status !== 'completed') {
            dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: null }))
        }
    }

    function handleSetDue() {
        if (status !== 'completed') {
            refDatePicker.current.showPicker();
        }
    }

    function handleOnChangeDatePicker(e) {
        const selectedDate = new Date(e.target.value);
        selectedDate.setHours(9, 0, 0, 0);
        const dueDate = selectedDate.getTime();
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

    if (status !== 'completed') {
        dueDateCommands = (<div className="due-date-box-commands">
                            <button className="detail-row due-date-button" onClick={handlePlus1d} >+1d</button>
                            <button className="detail-row due-date-button" onClick={handleResetDue} >Reset</button>
                            <button className="detail-row due-date-button" onClick={handleSetDue} >Set</button>
                            <input type="date" ref={refDatePicker} className="hidden-date-picker" onChange={(e) => handleOnChangeDatePicker(e)}></input>
                        </div>);
    } else {
        dueDateCommands = <div className="due-date-box-commands"></div>;
    }

    return  <div className={`todo-item`} onDoubleClick={() => handleDoubleClick(status)} >
                <div className="todo-header">
                    <input type="checkbox" checked={status === "active" ? false : true} onChange={() => handleCheckboxChange(id)} onClick={(e) => e.stopPropagation()}/> 
                    {todoContent}
                    <button className="expand-todo-btn" onClick={handleOnClick}>{isExpanded ? "-" : "+" }</button>
                </div>

                {isExpanded && (<div className="todo-details">
                    <div className="detail-row">
                        <span className="label">Created:</span>
                        <span> {createdAt ? new Date(createdAt).toLocaleString() : "—"}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Updated:</span> 
                        <span> {updatedAt ? new Date(updatedAt).toLocaleString() : "—"}</span>
                    </div>
                    <div className="detail-row due-date-box">
                        <div className="due-date-box-label">
                            <span className="label">Due:</span> 
                            <span> {toBeCompletedAt ? new Date(toBeCompletedAt).toLocaleString() : "—"}</span>
                        </div>
                        {dueDateCommands}
                    </div>
                </div>)}
            </div>
};
