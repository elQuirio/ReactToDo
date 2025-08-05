import { useSelector } from 'react-redux';
import { selectCompletedTodos } from '../selectors/todoSelectors';
import { useDispatch } from 'react-redux';
import { toggleTodoStatus } from '../slices/todoSlicer';

export default function CompletedTodoList() {
    const completedTodoList = useSelector(selectCompletedTodos);
    const dispatch = useDispatch();

    function handleCheckboxChange(id) {
        dispatch(toggleTodoStatus({id}));
    }

    return <div> {completedTodoList.map((t) => <div key={t.id}> <input type="checkbox" checked={t.status === 'completed' ? true : false} onChange={() => handleCheckboxChange(t.id)} />{t.text} </div>)} </div>
}