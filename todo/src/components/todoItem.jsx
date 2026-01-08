import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveTodo, dragAndDropReorderTodos } from "../thunks/todoThunks";
import { updatePreferences } from "../thunks/preferencesThunk";
import { toggleId, collapseId } from "../slices/uiTodoSlicer";
import { AlertCircle, Plus, Minus, GripVertical } from "lucide-react";
import { TodoItemCommands } from '../components/todoItemCommands';


export function TodoItem({id, status, text, createdAt, updatedAt, toBeCompletedAt, isExpanded, position }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(text);
    const [pickedDate, setPickedDate] = useState(toBeCompletedAt);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const dispatch = useDispatch();
    const oneDay = 24 * 60 * 60 * 1000;
    let todoContent = '';

    function handleOnClick() {
        if (status === 'active')
        {
            dispatch(toggleId({ id: id }));
        }
    };

    function handleDoubleClick() {
        if (status !== 'completed') {
            setIsEditing(true);
        }
    };

    function handleOnBlur() {
        if (tempText !== '') {
            dispatch(saveTodo({id: id, text: tempText, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt, position: position }))
        }
        setIsEditing(false);
    };

    function handleCheckboxChange() {
        dispatch(saveTodo({id: id, text: text, status: status === 'active' ? 'completed' : 'active', createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt, position: position }));
        dispatch(collapseId({id: id}));
    };

    function handlePlus1d() {
        if (status !== 'completed') {
            let dueDate;
            if (!toBeCompletedAt) {
                dueDate = Date.now() + oneDay; //add one day
            } else {
                dueDate = toBeCompletedAt + oneDay;
            }
            dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: dueDate, position: position }))
        }
    }

    function handleResetDue() {
        if (status !== 'completed') {
            dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: null, position: position }))
        }
    }

    function handleSetDue(e) {
        e.stopPropagation();
        setIsDatePickerOpen(true);
    }

    function handleOnChangeDatePicker(date) {
        setPickedDate(date);
    }

    function handleOnConfirmDatePicker() {
        dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: pickedDate, position: position }));
        setIsDatePickerOpen(false);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') 
        {
            handleOnBlur();
        } else if (e.key === 'Escape') {
            setTempText(text);
            setIsEditing(false);
        }
    }

    function handleOnDragStart(e, id) {
        if (status !== 'completed') {
            e.dataTransfer.setData('text/plain', id);
            e.dataTransfer.effectAllowed = 'move';
        }
    }

    function handleOnDragOver(e, id) {
        if (status !== 'completed') {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData('text/plain');
            
            if (draggedId === String(id)) {
                e.dataTransfer.dropEffect = 'none';
                return;
            } else {
                e.dataTransfer.dropEffect = 'move';
            }
        }
    }
    
    function handleOnDrop(e, id) {
        if (status !== 'completed') {
            e.preventDefault();
            const fromId = e.dataTransfer.getData('text/plain');
            const toId = id;
            if (!fromId || fromId === toId) return; // ignora drop su se stesso
            
            dispatch(dragAndDropReorderTodos({fromId, toId}));
            dispatch(updatePreferences({sortBy: "manual"}));
        }
    }

    function handleOnCancelDatePicker() {
        setIsDatePickerOpen(false);
    }

    if (isEditing) {
        todoContent = (<input className = {`todo-edit-input ${status === "active" ? "todo-active" : "todo-done"}`} autoFocus value={tempText} onChange={(e) => {setTempText(e.target.value)}} onBlur={handleOnBlur} onKeyDown={handleKeyDown} />);
    } else if (!isEditing) {
        todoContent = (<div className="todo-text-wrapper"><span className={`todo-text ${status === "active" ? "todo-active" : "todo-done"}`} > {text} { (toBeCompletedAt && toBeCompletedAt < Date.now() && status !== 'completed' ) && <AlertCircle className="todo-alert"/> }</span></div>);
    }

    return  <div className={`todo-item`} draggable onDragStart={(e) => handleOnDragStart(e, id)} onDragOver={(e) => handleOnDragOver(e, id)} onDrop={(e) => handleOnDrop(e, id)} onDoubleClick={() => handleDoubleClick(status)} >
                <div className="todo-header">
                    < GripVertical size={24} className="drag-handle"/>
                    <input type="checkbox" checked={status === "active" ? false : true} onChange={() => handleCheckboxChange(id)} onClick={(e) => e.stopPropagation()}/> 
                    {todoContent}
                    <button className="expand-todo-btn" onClick={handleOnClick} title={isExpanded ? 'Collapse': 'Expand'} aria-label={isExpanded ? 'Collapse': 'Expand'}>{isExpanded ? <Minus size={26}/> : <Plus size={26}/> }</button>
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
                        <TodoItemCommands todoStatus={status} handlePlus1d={handlePlus1d} handleResetDue={handleResetDue} handleSetDue={handleSetDue} currentValue={pickedDate} handleOnConfirmDatePicker={handleOnConfirmDatePicker} handleOnCancelDatePicker={handleOnCancelDatePicker} handleOnChangeDatePicker={handleOnChangeDatePicker} isDatePickerOpen={isDatePickerOpen} />
                    </div>
                </div>)}
            </div>
};
