import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearAllTodos } from "../slices/todoSlicer";
import { v4 as uuid } from 'uuid';


export default function AddTodoInputbox() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const todoSelector = useSelector((state => state.todos.todos));

    function handleAddTodoClick () {
        dispatch(addTodo({id: uuid(), text: text, status: 'active'}));
        setText('');
    };

    function handleClearAllTodos() {
        dispatch(clearAllTodos());
        setText('');
    };

    function handleOnChangeInputbox(e) {
        setText(e.target.value);
    };

    return (<div>
                <input className="addTodo" type="text" value={text} onChange={handleOnChangeInputbox}/>
                <button onClick={handleAddTodoClick}>Add todo</button>
                <button onClick={handleClearAllTodos}>Clear todos</button>
            </div>)
}