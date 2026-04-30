import { useSelector } from "react-redux";
import { selectMessages, selectIsAsking } from "../selectors/messageSelectors";
import { TypingDots } from './typingDots';
import { MessageItem } from "./messageItem";

import { useRef, useEffect } from "react";

export function ChatView() {
    const messageList = useSelector(selectMessages);
    const isAsking = useSelector(selectIsAsking);

    const prevCountRef = useRef(messageList.length);

    useEffect( () => {
        const prev = prevCountRef.current;
        const next = messageList.length;

        if (next > prev) {
            window.scrollTo({top: document.documentElement.scrollHeight, behavior: "auto"});
        }

        prevCountRef.current = next;

    }, [messageList.length]);

    return (
        <div className="chat-view">
            {messageList.map(m => 
            <MessageItem key={m.messageId} messageData={{...m}} /> )}
            {isAsking && <TypingDots/>}
        </div>
    )
};