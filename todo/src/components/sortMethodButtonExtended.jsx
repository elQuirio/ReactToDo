import { GripVertical, CalendarPlus, CalendarCog, ArrowDownAz } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectSortBy, selectSortDirection } from '../selectors/preferencesSelector';
import { updatePreferences } from "../thunks/preferencesThunk";
import { sortByTodos } from "../thunks/todoThunks";

export function SortMethodButtonExtended () {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(selectSortBy);
    const currentSortDirection = useSelector(selectSortDirection);
    const METHODS = [ {key: 'manual', icon: GripVertical, title: 'Sorted manually'},
                      {key: 'createdAt', icon: CalendarPlus, title: 'Sorted by creation date'},
                      {key: 'updatedAt', icon: CalendarCog, title: 'Sorted by update date'},
                      {key: 'alpha', icon: ArrowDownAz, title: 'Sorted alphabetically'} ]


    function handleOnClick(key) {
        dispatch(updatePreferences({sortBy: key}));
        dispatch(sortByTodos({sortDirection: currentSortDirection, sortBy: key}));
    }
    
    return <div className={`sort-method-wrapper`}>
            <div className="active-wrapper">
                    {METHODS.map((m) => {
                            return <button key={m.key} className={`quick-actions-button extended ${currentSortBy === m.key ? 'active': ''}`} onClick={() => handleOnClick(m.key)} title={m.title} aria-label={m.title}>
                                        <m.icon size={18} className={`active-icon`}/> 
                                    </button>
                    })}
            </div>
           </div>
}