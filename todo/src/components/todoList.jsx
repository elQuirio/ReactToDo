import { useSelector } from "react-redux";
import { selectActiveTodos } from "../selectors/todoSelectors";
import { TodoItem } from "./todoItem";


export default function TodoList() {
    const activeTodoSelector = useSelector( selectActiveTodos );

    return (
        <div>
            {activeTodoSelector.map(td => <TodoItem key={td.id} id={td.id} status={td.status} text={td.text}/> )}
        </div>
    )
};