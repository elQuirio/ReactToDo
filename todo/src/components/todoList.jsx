import { useSelector } from "react-redux";
import { selectActiveTodos, selectSearchedActiveTodo } from "../selectors/todoSelectors";
import { selectUiTodos } from "../selectors/uiSelectors";
import { TodoItem } from "./todoItem";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";


export default function TodoList() {
    const activeTodoSelector = useSelector( selectActiveTodos );
    const expandedTodos = useSelector( selectUiTodos );
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    const searchedTodos = useSelector(selectSearchedActiveTodo);

    let todoList = [];

    if (searchButtonActive) {
        todoList = searchedTodos;
    } else {
        todoList = activeTodoSelector;
    }

    return (
        <div>
            {todoList.map(td => 
            <TodoItem key={td.id} todoData={{...td, isExpanded: !!expandedTodos[td.id] }} /> )}
        </div>
    )
};