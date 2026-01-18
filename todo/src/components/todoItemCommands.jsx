import { DueDatePicker } from "./dueDatePicker";
import { useRef } from "react";

export function TodoItemCommands ({todoData, todoDetails, todoItemCommands, datePicker }) {

    const refDatePicker = useRef(null);

    let dueDateCommands = '';

    function stopAndAction(action) {
        return (e) => {
            e.stopPropagation();
            action(e);
        }
    };


    if (todoData.status !== 'completed') {
        dueDateCommands = (<div className="due-date-box-commands" onDoubleClick={(e) => e.stopPropagation()} >
                            <button type="button" className="detail-row due-date-button" onClick={stopAndAction(todoDetails.plus1d)} title="Add 1 day" aria-label="Add 1 day">+1d</button>
                            <button type="button" className="detail-row due-date-button" onClick={stopAndAction(todoDetails.resetDueDate)} title="Reset due date" aria-label="Reset due date">Reset</button>
                            <button type="button" className="detail-row due-date-button" onClick={stopAndAction(todoItemCommands.pickDueDate)} title="Pick due date" aria-label="Pick due date" ref={refDatePicker}>Pick</button>
                            {datePicker.isDatePickerOpen && (<DueDatePicker anchorElement={refDatePicker.current} datePicker={datePicker} todoItemCommands={todoItemCommands} todoData={todoData} />)}
                           </div>);
    } else {
        dueDateCommands = <div className="due-date-box-commands"></div>;
    }

    return  dueDateCommands

};
