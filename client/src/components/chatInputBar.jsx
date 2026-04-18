import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import  { DropDownButton } from './dropdownbutton';
import { ChatStatusBar } from './chatStatusBar';
import { AutoGrowTextArea } from './autoGrowTextArea';
import { updateSearchString } from "../slices/uiTodoSlicer";
import { fetchTodos, insertTodo } from '../thunks/todoThunks';
import { fetchPreferences } from "../thunks/preferencesThunk";
import { fetchMessages } from "../thunks/chatThunks";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";
import { SendHorizonal } from "lucide-react";
import { askChat } from "../thunks/chatThunks";
import { addTempMessages } from "../slices/messageSlice";

export function ChatInputBar() {
    const dispatch = useDispatch();
    //const searchButtonActive = useSelector(selectSearchBtnToggled);
    const [text, setText] = useState('');

    useEffect(() => { dispatch(fetchMessages()) }, [dispatch]);
    //useEffect(() => { dispatch(fetchPreferences())}, [dispatch]);

    function handleSendMessageClick () {
        const userText = text.trim();
        if (userText) {
            const tmpUserMsgId = uuid();
            const tmpAssistantMsgId = uuid();
            const tempUserMessage = {
                role: "user",
                messageId: tmpUserMsgId,
                conversationId: "1",
                messageText: userText,
                isTemp: true
            };
            const tempAssistantMessage = {
                role: "assistant",
                messageId: tmpAssistantMsgId,
                conversationId: "1",
                messageText: "...",
                isTemp: true,
                isLoading: true
            };
            //dispatch(insertTodo({id: uuid(), text: text, status: 'active', createdAt: now, updatedAt: now, toBeCompletedAt: null }))
            dispatch(addTempMessages([tempUserMessage, tempAssistantMessage]));
            dispatch(askChat({ userText: userText, conversationId: '1', tmpUserMsgId, tmpAssistantMsgId }));
            setText('');
        }
    };

    function handleOnChangeInputbox(e) {
        const value = e.target.value;
        setText(e.target.value);
    };

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleSendMessageClick();
            e.preventDefault();
        } else if (e.key === "Escape") {
            setText('');
            e.target.blur();
        }
    }

    const placeholder = 'Ask something...';

    return (<div className="control-bar">
                <div className="add-todo-wrapper">
                    <AutoGrowTextArea text={text} onChange={handleOnChangeInputbox} onKeyDown={handleKeyDown} placeholder={placeholder}/>
                    <div className="control-bar-buttons-wrapper">
                        <button className={`todo-controls-button`} onClick={handleSendMessageClick} >
                            < SendHorizonal size={28}/>
                        </button>
                    </div>
                </div>
                <ChatStatusBar />
            </div>)
}