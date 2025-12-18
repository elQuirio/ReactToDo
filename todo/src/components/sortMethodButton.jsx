import { GripVertical, CalendarPlus, CalendarCog, ArrowDownAz, ChevronsRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSortBy, selectSortDirection } from '../selectors/preferencesSelector';
import { updatePreferences } from "../thunks/preferencesThunk";
import { sortByTodos } from "../thunks/todoThunks";

export function SortMethodButton () {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(selectSortBy);
    const currentSortDirection = useSelector(selectSortDirection);
    const METHODS = [ {key: 'manual', icon: GripVertical, title: 'Sorted manually'},
                      {key: 'createdAt', icon: CalendarPlus, title: 'Sorted by creation date'},
                      {key: 'updatedAt', icon: CalendarCog, title: 'Sorted by update date'},
                      {key: 'alpha', icon: ArrowDownAz, title: 'Sorted alphabetically'} ]
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ activeKey, setActiveKey ] = useState(currentSortBy);
    const [ activeFade, setActiveFade ] = useState(false);
    const [ pendingKey, setPendingKey ] = useState(null);

    const hiddenRef = useRef(null);
    const rootRef = useRef(null);

    useEffect(()=>{ setActiveKey(currentSortBy) },[currentSortBy]);

    function handleOnClickMain() {
        setIsExpanded(!isExpanded);
    }

    function handleOnClickHidden(key) {
        setPendingKey(key);
        setIsExpanded(false);
        dispatch(updatePreferences({sortBy: key}));
        dispatch(sortByTodos({sortDirection: currentSortDirection, sortBy: key}));
    }

    useEffect(() => {
        const el = hiddenRef.current;
        if (!el) return;

        function onEnd(e) {
        if (e.propertyName != 'max-width') return;
        if (isExpanded) return;
        if (!pendingKey) return;
        
        setActiveFade(true);
        requestAnimationFrame(() => {
            setActiveKey(pendingKey);
            setPendingKey(null);
            requestAnimationFrame(() => setActiveFade(false));
        })
    }
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
    }, [isExpanded, pendingKey]);

    useEffect(()=>{
        function onEsc(e) {
            if (e.key === 'Escape') setIsExpanded(false);
        }

        function onPageClick(e) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setIsExpanded(false);
        }

        document.addEventListener('mousedown', onPageClick);
        document.addEventListener('keydown', onEsc);

        return () => {
            document.removeEventListener('mousedown', onPageClick);
            document.removeEventListener('keydown', onEsc);
        }
    },[]);
    

    return <div className={`sort-method-wrapper ${isExpanded ? 'open':''}`} ref={rootRef}>
            <div className="active-wrapper">
                    {METHODS.map((m) => {
                        if (activeKey === m.key) {
                            return <button key={m.key} className={`quick-actions-button ${activeKey === m.key ? 'active':'hidden' }`} onClick={() => handleOnClickMain(m.key)} title={m.title} aria-label={m.title}>
                                        <m.icon size={18} className={`active-icon ${activeFade?'fade':''}`}/> 
                                        {isExpanded ? '' : <ChevronsRight className='active-icon' size={10}/>}
                                    </button>
                        }
                    })}
            </div>
            <div className="hidden-wrapper" ref={hiddenRef}>
                {METHODS.map((m) => {
                        if (activeKey !== m.key) {
                            return <button key={m.key} className={`quick-actions-button hidden`} onClick={() => handleOnClickHidden(m.key)} title={m.title} aria-label={m.title}>{<m.icon size={18}/>} </button>
                        }
                    })}
            </div>
           </div>
}