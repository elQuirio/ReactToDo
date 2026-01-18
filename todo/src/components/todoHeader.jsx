import { AlertCircle, Plus, Minus, GripVertical } from "lucide-react";


export function TodoHeader({ todoHeader, todoData }) {

    const {onBlur, keyDown, toggleDetails, onCheckboxChange, onTextChange, isEditing, tempText} = todoHeader;
    const {status, text, toBeCompletedAt, isExpanded} = todoData;

    let todoContent = '';

    if (isEditing) {
        todoContent = (<input className = {`todo-edit-input ${status === "active" ? "todo-active" : "todo-done"}`} autoFocus value={tempText} onChange={onTextChange} onBlur={onBlur} onKeyDown={keyDown} />);
    } else if (!isEditing) {
        //esplicitare la condizione di short circuit
        todoContent = (<div className="todo-text-wrapper"><span className={`todo-text ${status === "active" ? "todo-active" : "todo-done"}`} > {text} { (toBeCompletedAt && toBeCompletedAt < Date.now() && status !== 'completed' ) && <AlertCircle className="todo-alert"/> }</span></div>);
    }


    return <div className="todo-header">
                <GripVertical size={24} className="drag-handle"/>
                <input type="checkbox" checked={status === "active" ? false : true} onChange={() => onCheckboxChange()} onClick={(e) => e.stopPropagation()}/> 
                {todoContent}
                <button className="expand-todo-btn" onClick={toggleDetails} title={isExpanded ? 'Collapse': 'Expand'} aria-label={isExpanded ? 'Collapse': 'Expand'}>{isExpanded ? <Minus size={26}/> : <Plus size={26}/> }</button>
            </div>

}