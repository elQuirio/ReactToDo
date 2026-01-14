import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { saveTodo } from '../thunks/todoThunks';
import { toggleId, collapseId } from "../slices/uiTodoSlicer";

export function useTodoItem({ id, status, text, createdAt, updatedAt, toBeCompletedAt, isExpanded, position, isEditing, setIsEditing, tempText, setTempText }) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [pickedDate, setPickedDate] = useState(toBeCompletedAt);
    const dispatch = useDispatch();
    const oneDay = 24 * 60 * 60 * 1000;

    const todoDetailsPlus1d = useCallback(() => {
            if (status !== 'completed') {
                let dueDate;
                if (!toBeCompletedAt) {
                    dueDate = Date.now() + oneDay; //add one day
                } else {
                    dueDate = toBeCompletedAt + oneDay;
                }
                dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: dueDate, position: position }))
            }
        }, [dispatch, id, text, status, createdAt, toBeCompletedAt, position]);


    const todoDetailsResetDueDate = useCallback(() => {
        if (status !== 'completed') {
            dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: null, position: position }))
        }
    }, [dispatch, id, text, status, createdAt, position]);

    const datePickerHandleCancel = useCallback(() => {
        setIsDatePickerOpen(false);
    }, []);

    const todoItemCommandsPickDueDate = useCallback((e) => {
        e.stopPropagation();
        setIsDatePickerOpen(true);
    }, []);

    const todoItemCommandsHandleDateChange = useCallback((date) => {
        setPickedDate(date.getTime());
    }, []);

    const datePickerHandleConfirm = useCallback(() => {
        dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: pickedDate, position: position }));
        setIsDatePickerOpen(false);
    }, [dispatch, id, text, status, createdAt, pickedDate, position]);

    const todoHeaderToggleDetails = useCallback(() => {
        if (status === 'active')
        {
            dispatch(toggleId({ id: id }));
        }
    }, [dispatch, status, id]);

    const todoItemDoubleClick = useCallback(() => {
        if (status !== 'completed') {
            setIsEditing(true);
        }
    }, [dispatch, status]);

    const todoHeaderCheckboxChange = useCallback(() => {
        dispatch(saveTodo({id: id, text: text, status: status === 'active' ? 'completed' : 'active', createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt, position: position }));
        dispatch(collapseId({id: id}));
    }, [dispatch, id, text, status, createdAt, toBeCompletedAt, position]);


    const todoHeaderOnBlur = useCallback(() => {
        if (tempText !== '') {
            dispatch(saveTodo({id: id, text: tempText, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt, position: position }));
        }
        setIsEditing(false);
    }, [dispatch, id, tempText, status, createdAt, toBeCompletedAt, position, setIsEditing]);


    const todoHeaderKeyDown = useCallback((e) => {
        if (e.key === 'Enter') 
        {
            todoHeaderOnBlur();
        } else if (e.key === 'Escape') {
            setTempText(text);
            setIsEditing(false);
        }
    }, [setTempText, todoHeaderOnBlur, setIsEditing]);

    return { 
        todoDetailsPlus1d, 
        todoDetailsResetDueDate, 
        datePickerHandleCancel, 
        isDatePickerOpen, 
        todoItemCommandsPickDueDate, 
        todoItemCommandsHandleDateChange, 
        pickedDate, 
        datePickerHandleConfirm,
        todoHeaderToggleDetails,
        todoItemDoubleClick,
        todoHeaderCheckboxChange,
        todoHeaderOnBlur,
        todoHeaderKeyDown
    };
    
}