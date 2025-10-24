import { useSelector } from "react-redux";
import { selectActiveTodos } from "../selectors/todoSelectors";
import { selectUiTodos } from "../selectors/uiSelectors";
import { TodoItem } from "./todoItem";


export default function TodoList() {
    const activeTodoSelector = useSelector( selectActiveTodos );
    const expandedTodos = useSelector( selectUiTodos );

    return (
        <div>
            {activeTodoSelector.map(td => <TodoItem key={td.id} id={td.id} status={td.status} text={td.text} createdAt={td.createdAt} updatedAt={td.updatedAt} toBeCompletedAt={td.toBeCompletedAt} isExpanded={ !!expandedTodos[td.id] } position={td.position}/> )}
        </div>
    )
};