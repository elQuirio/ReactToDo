import { TodoItemCommands } from '../components/todoItemCommands';

export function TodoDetails({createdAt, updatedAt, toBeCompletedAt, status, handlePlus1d, handleResetDue, handleSetDue, pickedDate, handleOnConfirmDatePicker, handleOnCancelDatePicker, handleOnChangeDatePicker, isDatePickerOpen}) {



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
                        <TodoItemCommands todoStatus={status} handlePlus1d={handlePlus1d} handleResetDue={handleResetDue} handleSetDue={handleSetDue} currentValue={pickedDate} handleOnConfirmDatePicker={handleOnConfirmDatePicker} handleOnCancelDatePicker={handleOnCancelDatePicker} handleOnChangeDatePicker={handleOnChangeDatePicker} isDatePickerOpen={isDatePickerOpen} />
                    </div>
                </div>

}