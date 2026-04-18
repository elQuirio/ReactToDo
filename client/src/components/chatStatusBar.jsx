import { useSelector, useDispatch } from 'react-redux';
import { collapseAll, searchBtnToggle, chatBtnToggle, updateSearchString } from "../slices/uiTodoSlicer";
import { updatePreferences } from '../thunks/preferencesThunk';
import { selectSortDirection, selectViewMode } from '../selectors/preferencesSelector';
import { selectSearchBtnToggled, selectChatBtnToggled } from '../selectors/uiSelectors';
import { selectActiveTodos, selectCompletedTodos, selectOverdueTodos } from '../selectors/todoSelectors';
import { SortMethodSwitch } from '../components/sortMethodSwitch';
import { Search, Minimize2, ArrowUpNarrowWide, ArrowDownNarrowWide, BotMessageSquare } from "lucide-react";

export function ChatStatusBar({  }) {
    const activeTodos = useSelector(selectActiveTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const overdueTodos = useSelector(selectOverdueTodos);
    const currentDirection = useSelector(selectSortDirection);
    const viewMode = useSelector(selectViewMode);
    const searchButtonActive = useSelector(selectSearchBtnToggled);
    const chatButtonActive = useSelector(selectChatBtnToggled);

    let sortComponent = '';

    const dispatch = useDispatch();


    function handleCollapseAll() {
        dispatch(collapseAll());
    }

    function handleSortTodos() {
        if (currentDirection=="asc") {
            dispatch(updatePreferences({sortDirection: "desc"}));
        } else if (currentDirection== "desc") {
            dispatch(updatePreferences({sortDirection: "asc"}));
        } 
    }

    function handleShowAll() {
        dispatch(updatePreferences({viewMode: 'all'}));
    }

    function handleShowActive() {
        dispatch(updatePreferences({viewMode: 'active'}));
    }

    function handleToggleSearch() {
        dispatch(updateSearchString({text: searchString}));
        dispatch(searchBtnToggle());
    }

    function handleToggleChat() {
        dispatch(chatBtnToggle());
    }

    if (currentDirection === "desc") {
        sortComponent = <ArrowDownNarrowWide className='sort-icon' size={18}/>
    } else {
        sortComponent = <ArrowUpNarrowWide className='sort-icon' size={18}/>
    }


    return <div className="status-bar-mini">
            <span className='quick-actions-container'>
                <button className={`chat-button quick-actions-button ${chatButtonActive?"active":""}`} onClick={handleToggleChat} title='Chat mode' aria-label='Chat mode'><BotMessageSquare className='chat-icon' size={18}/></button>
            </span>
            <span className='status-chip-container'>
            </span>
        </div>
}
