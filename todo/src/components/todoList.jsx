import { useSelector } from "react-redux";
import { selectActiveTodos, selectSearchedVisibleTodo, selectTodos } from "../selectors/todoSelectors";
import { selectUiTodos } from "../selectors/uiSelectors";
import { selectViewMode } from '../selectors/preferencesSelector';
import { TodoItem } from "./todoItem";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";


export default function TodoList() {
    const activeTodoSelector = useSelector( selectActiveTodos );
    const expandedTodos = useSelector( selectUiTodos );
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    const searchedTodos = useSelector(selectSearchedVisibleTodo);
    let currentViewMode = useSelector(selectViewMode);
    const allTodos = useSelector(selectTodos);

    let todoList = [];

    if (searchButtonActive) {
        todoList = searchedTodos;
    } else {
        if (currentViewMode === 'all') {
            todoList = allTodos;
        } else {
            todoList = activeTodoSelector;
        }
    }

    return (
        <div>
            {todoList.map(td => 
            <TodoItem key={td.id} todoData={{...td, isExpanded: !!expandedTodos[td.id] }} /> )}
        </div>
    )
};