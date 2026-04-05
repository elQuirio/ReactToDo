import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import  { DropDownButton } from './dropdownbutton';
import { StatusBar } from './statusBar';
import { AutoGrowTextArea } from './autoGrowTextArea';
import { updateSearchString } from "../slices/uiTodoSlicer";
import { fetchTodos, insertTodo } from '../thunks/todoThunks';
import { fetchPreferences } from "../thunks/preferencesThunk";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";
import { CircleArrowUp } from "lucide-react";

export default function AddTodoInputbox() {
    const dispatch = useDispatch();
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    const [text, setText] = useState('');

    useEffect(() => { dispatch(fetchTodos()) }, [dispatch]);
    useEffect(() => { dispatch(fetchPreferences())}, [dispatch]);

    function handleAddTodoClick () {
        if (searchButtonActive) {
            return;
        }
        if (text.trim()) {
            const now = Date.now();
            dispatch(insertTodo({id: uuid(), text: text, status: 'active', createdAt: now, updatedAt: now, toBeCompletedAt: null }))
            setText('');
        }
    };

    function handleOnChangeInputbox(e) {
        const value = e.target.value;
        setText(e.target.value);
        if (searchButtonActive) {
            dispatch(updateSearchString({text: value}));
        }
    };

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleAddTodoClick();
            e.preventDefault();
        } else if (e.key === "Escape") {
            setText('');
            dispatch(updateSearchString({text: ''}));
            e.target.blur();
        }
    }

    const placeholder = searchButtonActive ? 'Type to search...' : 'Write something...';

    return (<div className="control-bar">
                <div className="add-todo-wrapper">
                    <AutoGrowTextArea text={text} onChange={handleOnChangeInputbox} onKeyDown={handleKeyDown} placeholder={placeholder}/>
                    <div className="control-bar-buttons-wrapper">
                        <button className={`todo-controls-button ${searchButtonActive ? 'disabled' : ''}`} disabled={searchButtonActive} title={searchButtonActive ? 'Disable search mode to use actions' : ''} onClick={handleAddTodoClick} >
                            < CircleArrowUp size={28}/>
                        </button>
                        <DropDownButton />
                    </div>
                </div>
                <StatusBar searchString={text}/>
            </div>)
}