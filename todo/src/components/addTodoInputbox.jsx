import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import  { DropDownButton } from './dropdownbutton';
import { StatusBar } from './statusBar';
import { fetchTodos, insertTodo, clearTodos } from '../thunks/todoThunks';
import { fetchPreferences } from "../thunks/preferencesThunk";
import { updateSearchString } from "../slices/uiTodoSlicer";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";
import { CircleArrowUp } from "lucide-react";

export default function AddTodoInputbox() {
    const dispatch = useDispatch();
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    const [text, setText] = useState('');
    const textAreaRef = useRef(null);

    useEffect(() => { dispatch(fetchTodos()) }, [dispatch]);
    useEffect(() => { dispatch(fetchPreferences())}, [dispatch]);

    useLayoutEffect(() => {
        const el = textAreaRef.current;
        if (!el) return;
        el.style.height = '0px';
        el.style.height = `${el.scrollHeight}px`;
    }, [text]);

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
            e.preventDefault();
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
            return 'Write something...';
        }
    }
    //<input className="addTodo" type="text" value={text} onChange={handleOnChangeInputbox} onKeyDown={handleKeyDown} placeholder={handlePlaceholder()}/>

    return (<div className="control-bar">
                <div className="add-todo-wrapper">
                    <textarea className="addTodo" rows={1} value={text} onChange={handleOnChangeInputbox} onKeyDown={(e) => {handleKeyDown(e)}} placeholder={handlePlaceholder()} ref={textAreaRef}></textarea>
                    <div className="control-bar-buttons-wrapper">
                        <button className={`todo-controls-button ${searchButtonActive ? 'disabled' : ''}`} disabled={searchButtonActive} title={searchButtonActive ? 'Disable search mode to use actions' : ''} onClick={handleAddTodoClick} >
                            < CircleArrowUp size={28}/>
                        </button>
                        <DropDownButton handleOnClick={handleClearAllTodos} />
                    </div>
                </div>
                <StatusBar searchString={text}/>
            </div>)
}