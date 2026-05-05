import { useSelector } from "react-redux";
import { selectMainView } from "../selectors/preferencesSelector";
import { ChatInputBar } from '../components/chatInputBar';
import { TodoInputBar } from '../components/todoInputBar';

export function InputBarWrapper() {
    const mainViewMode = useSelector(selectMainView);

    const wrapper = mainViewMode === 'chat' ? <ChatInputBar />  : <TodoInputBar /> ;

    return wrapper;
}