import { useDispatch, useSelector } from "react-redux";
import { updatePreferences } from "../thunks/preferencesThunk";
import { sortByTodos } from '../thunks/todoThunks';
import { selectSortBy, selectSortDirection } from "../selectors/preferencesSelector";

export default function SortDropdown() {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(selectSortBy);
    const currentSortDirection = useSelector(selectSortDirection);

    const SORT_OPTIONS = [
        {value: "manual", label: "Manual"},
        {value: "createdAt", label:"Created date"},
        {value: "updatedAt", label:"Updated date"},
        {value: "alpha", label:"Alphabetically"}
    ]
    
    function handleOnClick(e) {
        dispatch(updatePreferences({sortBy: e.target.value}));
        dispatch(sortByTodos({sortDirection: currentSortDirection, sortBy: e.target.value}));
    }

    return <div className={"sort-dropdown"}>
            <span className='sort-dropdown-label'>Sort by:</span>
            <select value={currentSortBy} onClick={handleOnClick}>
                { SORT_OPTIONS.map((o) => { return <option key={o.value} value={o.value}>{o.label}</option> }) }
            </select>
            </div>
}