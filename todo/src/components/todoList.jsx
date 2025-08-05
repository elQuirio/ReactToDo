import { useSelector, useDispatch } from "react-redux";
import { toggleTodoStatus } from '../slices/todoSlicer';
import { selectActiveTodos } from "../selectors/todoSelectors";


export default function TodoList() {
    const activeTodoSelector = useSelector( selectActiveTodos );
    const dispatch = useDispatch();

    function handleCheckboxChange(id) {
        dispatch(toggleTodoStatus({id}));
    };

    return (
        <div>
            {activeTodoSelector.map(i => <div key={i.id}><input type="checkbox" checked={i.status === "active" ? false : true} onChange={() => handleCheckboxChange(i.id)} />{i.text}</div>) }
        </div>
    )
};
