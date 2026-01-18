import { TodoItemCommands } from '../components/todoItemCommands';

export function TodoDetails({todoData, todoDetails, todoItemCommands, datePicker}) {

    const {createdAt, updatedAt, toBeCompletedAt} = todoData;

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
                        <TodoItemCommands todoData={todoData} todoDetails={todoDetails} todoItemCommands={todoItemCommands} datePicker={datePicker} />
                    </div>
                </div>

}