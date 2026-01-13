import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { saveTodo } from '../thunks/todoThunks';
import { toggleId, collapseId } from "../slices/uiTodoSlicer";

export function useTodoItem({ id, status, text, createdAt, updatedAt, toBeCompletedAt, isExpanded, position, isEditing, setIsEditing, tempText, setTempText }) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [pickedDate, setPickedDate] = useState(toBeCompletedAt);
    const dispatch = useDispatch();
    const oneDay = 24 * 60 * 60 * 1000;

    const handlePlus1d = useCallback(() => {
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


    const handleResetDue = useCallback(() => {
        if (status !== 'completed') {
            dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: null, position: position }))
        }
    }, [dispatch, id, text, status, createdAt, position]);

    const handleOnCancelDatePicker = useCallback(() => {
        setIsDatePickerOpen(false);
    }, []);

    const handleSetDue = useCallback((e) => {
        e.stopPropagation();
        setIsDatePickerOpen(true);
    }, []);

    const handleOnChangeDatePicker = useCallback((date) => {
        setPickedDate(date.getTime());
    }, []);

    const handleOnConfirmDatePicker = useCallback(() => {
        dispatch(saveTodo({id: id, text: text, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: pickedDate, position: position }));
        setIsDatePickerOpen(false);
    }, [dispatch, id, text, status, createdAt, pickedDate, position]);

    const handleOnClick = useCallback(() => {
        if (status === 'active')
        {
            dispatch(toggleId({ id: id }));
        }
    }, [dispatch, status, id]);

    const handleDoubleClick = useCallback(() => {
        if (status !== 'completed') {
            setIsEditing(true);
        }
    }, [dispatch, status]);

    const handleCheckboxChange = useCallback(() => {
        dispatch(saveTodo({id: id, text: text, status: status === 'active' ? 'completed' : 'active', createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt, position: position }));
        dispatch(collapseId({id: id}));
    }, [dispatch, id, text, status, createdAt, toBeCompletedAt, position]);


    const handleOnBlur = useCallback(() => {
        if (tempText !== '') {
            dispatch(saveTodo({id: id, text: tempText, status: status, createdAt: createdAt, updatedAt: Date.now(), toBeCompletedAt: toBeCompletedAt, position: position }));
        }
        setIsEditing(false);
    }, [dispatch, id, tempText, status, createdAt, toBeCompletedAt, position, setIsEditing]);


    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') 
        {
            handleOnBlur();
        } else if (e.key === 'Escape') {
            setTempText(text);
            setIsEditing(false);
        }
    }, [setTempText, handleOnBlur, setIsEditing]);

    return { 
        handlePlus1d, 
        handleResetDue, 
        handleOnCancelDatePicker, 
        isDatePickerOpen, 
        handleSetDue, 
        handleOnChangeDatePicker, 
        pickedDate, 
        handleOnConfirmDatePicker,
        handleOnClick,
        handleDoubleClick,
        handleCheckboxChange,
        handleOnBlur,
        handleKeyDown
    };
    
}