import { useSelector } from "react-redux";
import { selectActiveTodos, selectSearchedVisibleTodo, selectTodos } from "../selectors/todoSelectors";
import { selectUiTodos } from "../selectors/uiSelectors";
import { selectViewMode } from '../selectors/preferencesSelector';
import { TodoItem } from "./todoItem";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";
import { useRef, useEffect } from "react";

export default function TodoList() {
    const activeTodoSelector = useSelector( selectActiveTodos );
    const expandedTodos = useSelector( selectUiTodos );
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    const searchedTodos = useSelector(selectSearchedVisibleTodo);
    const allTodos = useSelector(selectTodos);
    const prevCountRef = useRef(allTodos.length);
    let currentViewMode = useSelector(selectViewMode);
    let todoList = [];

    useEffect( () => {
        const prev = prevCountRef.current;
        const next = allTodos.length;

        if (next > prev) {
            window.scrollTo({top: document.documentElement.scrollHeight, behavior: "auto"});
        }

        prevCountRef.current = next;

    }, [allTodos.length]);

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