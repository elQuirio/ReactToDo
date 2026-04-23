import { useDispatch } from "react-redux";

import { updatePreferences } from "../thunks/preferencesThunk";
import { useTodoItem } from "../hooks/useTodoItem";
import { TodoDetails } from "./todoDetails";
import { TodoHeader } from "./todoHeader";


export function MessageItem({messageData}) {

    //const { userId, role, messageId, conversationId, position, messageText } = messageData;
    const { messageText, role } = messageData;

    return  <div className={`chat-item-row ${role === 'user' ? 'chat-item-row-user' : 'chat-item-row-assistant'}`}>
                <div className={`chat-item ${role === 'user' ? 'chat-item-user' : 'chat-item-assistant'}`} onDoubleClick={() => {}} >
                    {messageText}
                </div>
            </div>
};
