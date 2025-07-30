import { useSelector } from "react-redux";

export default function TodoList() {
    const todoSelector = useSelector((state) => state.todos.todos);

    return (
        <div>
            {todoSelector.map(i => <div key={i.id}><input type="checkbox" />{i.text}</div>) }
        </div>
    )
};