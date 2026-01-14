import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveTodo, dragAndDropReorderTodos } from "../thunks/todoThunks";
import { updatePreferences } from "../thunks/preferencesThunk";

import { useTodoItem } from "../hooks/useTodoItem";
import { TodoDetails } from "./todoDetails";
import { TodoHeader } from "./todoHeader";


export function TodoItem({id, status, text, createdAt, updatedAt, toBeCompletedAt, isExpanded, position }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(text);
    const { 
        todoDetailsPlus1d, //handlePlus1d 
        todoDetailsResetDueDate, //handleResetDue 
        datePickerHandleCancel, //handleOnCancelDatePicker
        isDatePickerOpen, 
        todoItemCommandsPickDueDate, //handleSetDue 
        todoItemCommandsHandleDateChange, //handleOnChangeDatePicker
        pickedDate, 
        datePickerHandleConfirm, //handleOnConfirmDatePicker
        todoHeaderToggleDetails, //handleOnClick
        todoItemDoubleClick, //handleDoubleClick
        todoHeaderCheckboxChange, //handleCheckboxChange
        todoHeaderOnBlur, //handleOnBlur
        todoHeaderKeyDown 

    } = useTodoItem({id, status, text, createdAt, updatedAt, toBeCompletedAt, isExpanded, position, isEditing, setIsEditing, tempText, setTempText });

    const dispatch = useDispatch();


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

    function handleTextChange(e) {
        setTempText(e.target.value)
    }


    return  <div className={`todo-item`} draggable onDragStart={(e) => handleOnDragStart(e, id)} onDragOver={(e) => handleOnDragOver(e, id)} onDrop={(e) => handleOnDrop(e, id)} onDoubleClick={() => todoItemDoubleClick(status)} >
                < TodoHeader id={id} status={status} isEditing={isEditing} tempText={tempText} todoHeaderOnBlur={todoHeaderOnBlur} todoHeaderKeyDown={todoHeaderKeyDown} text={text} toBeCompletedAt={toBeCompletedAt} todoHeaderToggleDetails={todoHeaderToggleDetails} isExpanded={isExpanded} todoHeaderCheckboxChange={todoHeaderCheckboxChange} handleTextChange={handleTextChange} />
                { isExpanded && <TodoDetails createdAt={createdAt} updatedAt={updatedAt} toBeCompletedAt={toBeCompletedAt} status={status} todoDetailsPlus1d={todoDetailsPlus1d} todoDetailsResetDueDate={todoDetailsResetDueDate} todoItemCommandsPickDueDate={todoItemCommandsPickDueDate} pickedDate={pickedDate} datePickerHandleConfirm={datePickerHandleConfirm} datePickerHandleCancel={datePickerHandleCancel} todoItemCommandsHandleDateChange={todoItemCommandsHandleDateChange} isDatePickerOpen={isDatePickerOpen}/> }
            </div>
};
