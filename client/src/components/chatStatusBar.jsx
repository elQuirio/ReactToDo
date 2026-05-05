import { useSelector, useDispatch } from 'react-redux';
import { selectMainView } from '../selectors/preferencesSelector';
import { BotMessageSquare } from "lucide-react";
import { updatePreferences } from '../thunks/preferencesThunk';

export function ChatStatusBar() {
    const mainViewMode = useSelector(selectMainView);
    const dispatch = useDispatch();

    function handleToggleChat() {
        dispatch(updatePreferences({mainView: 'todo'}));
    }


    return <div className="status-bar-mini">
            <span className='quick-actions-container'>
                <button className={`chat-button quick-actions-button ${mainViewMode==='chat'?"active":""}`} onClick={handleToggleChat} title='Chat mode' aria-label='Chat mode'><BotMessageSquare className='chat-icon' size={18}/></button>
            </span>
            <span className='status-chip-container'>
            </span>
        </div>
}
