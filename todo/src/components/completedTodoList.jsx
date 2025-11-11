import { useSelector } from 'react-redux';
import { selectCompletedTodos } from '../selectors/todoSelectors';
import { TodoItem } from "./todoItem";

export default function CompletedTodoList() {
    const completedTodoList = useSelector(selectCompletedTodos);
    return <div> {completedTodoList.map((td) => <TodoItem key={td.id} id={td.id} status={td.status} text={td.text} createdAt={td.createdAt} updatedAt={td.updatedAt} toBeCompletedAt={td.toBeCompletedAt} position={td.position} />)} </div>
};