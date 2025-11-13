import { useSelector } from 'react-redux';
import { selectCompletedTodos, selectSearchedCompletedTodo } from '../selectors/todoSelectors';
import { TodoItem } from "./todoItem";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";

export default function CompletedTodoList() {
    const completedTodoList = useSelector(selectCompletedTodos);
    const searchedCompletedTodo = useSelector(selectSearchedCompletedTodo);
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    let todoList = [];

    if (searchButtonActive) {
        todoList = searchedCompletedTodo;
    } else {
        todoList = completedTodoList;
    }

    return <div> {todoList.map((td) => <TodoItem key={td.id} id={td.id} status={td.status} text={td.text} createdAt={td.createdAt} updatedAt={td.updatedAt} toBeCompletedAt={td.toBeCompletedAt} position={td.position} />)} </div>
};