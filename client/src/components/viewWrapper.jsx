import { useSelector } from "react-redux";
import { selectChatBtnToggled} from "../selectors/uiSelectors";
import { ChatView } from "./chatView";
import { TodoView } from "./todoView";

export function ViewWrapper() {
    const chatButtonActive = useSelector(selectChatBtnToggled);

    const wrapper = chatButtonActive ? <ChatView />  : <TodoView /> ;

    return wrapper;
}