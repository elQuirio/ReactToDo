import { useSelector } from "react-redux";
import { selectChatBtnToggled} from "../selectors/uiSelectors";
import { ChatInputBar } from '../components/chatInputBar';
import { TodoInputBar } from '../components/todoInputBar';

export function InputBarWrapper() {
    const chatButtonActive = useSelector(selectChatBtnToggled);

    const wrapper = chatButtonActive ? <ChatInputBar />  : <TodoInputBar /> ;

    return wrapper;
}