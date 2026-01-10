import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { saveTodo } from '../thunks/todoThunks';

export function useTodoItem({ id, status, text, createdAt, updatedAt, toBeCompletedAt, isExpanded, position }) {
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

    return { 
        handlePlus1d, 
        handleResetDue, 
        handleOnCancelDatePicker, 
        isDatePickerOpen, 
        handleSetDue, 
        handleOnChangeDatePicker, 
        pickedDate, 
        handleOnConfirmDatePicker
    };
    
}