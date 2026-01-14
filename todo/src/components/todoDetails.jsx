import { TodoItemCommands } from '../components/todoItemCommands';

export function TodoDetails({createdAt, updatedAt, toBeCompletedAt, status, todoDetailsPlus1d, todoDetailsResetDueDate, todoItemCommandsPickDueDate, pickedDate, datePickerHandleConfirm, datePickerHandleCancel, todoItemCommandsHandleDateChange, isDatePickerOpen}) {



    return <div className="todo-details">
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
                        <TodoItemCommands todoStatus={status} todoDetailsPlus1d={todoDetailsPlus1d} todoDetailsResetDueDate={todoDetailsResetDueDate} todoItemCommandsPickDueDate={todoItemCommandsPickDueDate} currentValue={pickedDate} datePickerHandleConfirm={datePickerHandleConfirm} datePickerHandleCancel={datePickerHandleCancel} todoItemCommandsHandleDateChange={todoItemCommandsHandleDateChange} isDatePickerOpen={isDatePickerOpen} />
                    </div>
                </div>

}