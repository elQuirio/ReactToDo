import { useSelector, useDispatch } from 'react-redux';
import { chatBtnToggle } from "../slices/uiTodoSlicer";
import { selectChatBtnToggled } from '../selectors/uiSelectors';
import { BotMessageSquare } from "lucide-react";

export function ChatStatusBar() {
    const chatButtonActive = useSelector(selectChatBtnToggled);
    const dispatch = useDispatch();

    function handleToggleChat() {
        dispatch(chatBtnToggle());
    }


    return <div className="status-bar-mini">
            <span className='quick-actions-container'>
                <button className={`chat-button quick-actions-button ${chatButtonActive?"active":""}`} onClick={handleToggleChat} title='Chat mode' aria-label='Chat mode'><BotMessageSquare className='chat-icon' size={18}/></button>
            </span>
            <span className='status-chip-container'>
            </span>
        </div>
}
