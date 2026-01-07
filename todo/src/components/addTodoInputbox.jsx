import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import  { DropDownButton } from './dropdownbutton';
import { StatusBar } from './statusBar';
import { fetchTodos, insertTodo, clearTodos } from '../thunks/todoThunks';
import { fetchPreferences } from "../thunks/preferencesThunk";
import { updateSearchString } from "../slices/uiTodoSlicer";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";


export default function AddTodoInputbox() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const searchButtonActive = useSelector(selectSearchBtnToggled);

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

    function handleClearAllTodos() {
        dispatch(clearTodos());
        setText('');
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
        } else if (e.key === "Escape") {
            setText('');
            dispatch(updateSearchString({text: ''}));
            e.target.blur();
        }
    }

    function handlePlaceholder() {
        if(searchButtonActive) {
            return 'Type to search...';
        } else {
            return 'Write something to do...';
        }
    }

    return (<div className="control-bar">
                <input className="addTodo" type="text" value={text} onChange={handleOnChangeInputbox} onKeyDown={handleKeyDown} placeholder={handlePlaceholder()}/>
                <div className="control-bar-buttons-wrapper">
                    <button className="todo-controls-button" onClick={handleAddTodoClick}>Add todo</button>
                    <DropDownButton handleOnClick={handleClearAllTodos} />
                </div>
                <StatusBar searchString={text}/>
            </div>)
}