import { useSelector } from "react-redux";
import { selectMainView } from "../selectors/preferencesSelector";
import { ChatView } from "./chatView";
import { TodoView } from "./todoView";

export function ViewWrapper() {
    const mainViewMode = useSelector(selectMainView);

    const wrapper = mainViewMode==='chat' ? <ChatView />  : <TodoView /> ;

    return wrapper;
}