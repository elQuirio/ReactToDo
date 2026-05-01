import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from 'uuid';
import { ChatStatusBar } from './chatStatusBar';
import { AutoGrowTextArea } from './autoGrowTextArea';
import { fetchMessages } from "../thunks/chatThunks";
import { SendHorizonal } from "lucide-react";
import { askChat } from "../thunks/chatThunks";
import { addTempMessages } from "../slices/messageSlice";

export function ChatInputBar() {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    useEffect(() => { dispatch(fetchMessages()) }, [dispatch]);

    function handleSendMessageClick () {
        const userText = text.trim();
        if (userText) {
            const tmpUserMsgId = uuid();
            const tempUserMessage = {
                role: "user",
                messageId: tmpUserMsgId,
                conversationId: "1",
                messageText: userText,
                isTemp: true
            };
            dispatch(addTempMessages([tempUserMessage]));
            dispatch(askChat({ userText: userText, conversationId: '1', tmpUserMsgId }));
            setText('');
        }
    };

    function handleOnChangeInputbox(e) {
        setText(e.target.value);
    };

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
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