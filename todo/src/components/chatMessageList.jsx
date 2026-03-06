import { useSelector } from "react-redux";
import { selectActiveTodos, selectSearchedVisibleTodo, selectTodos } from "../selectors/todoSelectors";
import { selectUiTodos } from "../selectors/uiSelectors";
import { selectViewMode } from '../selectors/preferencesSelector';
import { TodoItem } from "./todoItem";
import { selectSearchBtnToggled } from "../selectors/uiSelectors";
import { useRef, useEffect } from "react";

export default function ChatMessageList() {


    

    return (
        <div>
            chat
        </div>
    )
};