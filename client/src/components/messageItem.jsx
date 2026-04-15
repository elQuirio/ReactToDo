import { useDispatch } from "react-redux";

import { updatePreferences } from "../thunks/preferencesThunk";
import { useTodoItem } from "../hooks/useTodoItem";
import { TodoDetails } from "./todoDetails";
import { TodoHeader } from "./todoHeader";


export function MessageItem({messageData}) {

    //const { userId, role, messageId, conversationId, position, messageText } = messageData;
    const { messageText } = messageData;

    return  <div className={`todo-item`} onDoubleClick={() => {}} >
                {messageText}
            </div>
};
