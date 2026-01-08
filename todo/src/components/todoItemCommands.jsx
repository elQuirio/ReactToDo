import { DueDatePicker } from "./dueDatePicker";
import { useRef } from "react";

export function TodoItemCommands ({todoStatus, handlePlus1d, handleResetDue, handleSetDue, currentValue, handleOnConfirmDatePicker, handleOnCancelDatePicker, handleOnChangeDatePicker, isDatePickerOpen }) {

    const refDatePicker = useRef(null);

    let dueDateCommands = '';

    if (todoStatus !== 'completed') {
        dueDateCommands = (<div className="due-date-box-commands">
                            <button className="detail-row due-date-button" onClick={handlePlus1d} title="Add 1 day" aria-label="Add 1 day">+1d</button>
                            <button className="detail-row due-date-button" onClick={handleResetDue} title="Reset due date" aria-label="Reset due date">Reset</button>
                            <button className="detail-row due-date-button" onClick={handleSetDue} title="Pick due date" aria-label="Pick due date" ref={refDatePicker}>Pick</button>
                            {isDatePickerOpen && (<DueDatePicker anchorElement={refDatePicker.current} currentValue={currentValue} onConfirm={handleOnConfirmDatePicker} onCancel={handleOnCancelDatePicker} onChange={handleOnChangeDatePicker} />)}
                            </div>);
    } else {
        dueDateCommands = <div className="due-date-box-commands"></div>;
    }

    return  dueDateCommands

};
