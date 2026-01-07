import { GripVertical, CalendarPlus, CalendarCog, ArrowDownAz, ChevronsRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSortBy, selectSortDirection } from '../selectors/preferencesSelector';
import { updatePreferences } from "../thunks/preferencesThunk";
import { sortByTodos } from "../thunks/todoThunks";

export function SortMethodButtonDynamic () {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(selectSortBy);
    const currentSortDirection = useSelector(selectSortDirection);
    const METHODS = [ {key: 'manual', icon: GripVertical, title: 'Sorted manually'},
                      {key: 'createdAt', icon: CalendarPlus, title: 'Sorted by creation date'},
                      {key: 'updatedAt', icon: CalendarCog, title: 'Sorted by update date'},
                      {key: 'alpha', icon: ArrowDownAz, title: 'Sorted alphabetically'} ]
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ visualKey, setVisualKey ] = useState(currentSortBy);
    const [ activeFade, setActiveFade ] = useState(false);
    const [ pendingKey, setPendingKey ] = useState(null);

    const hiddenRef = useRef(null);
    const activeRef = useRef(null);
    const rootRef = useRef(null);

    useEffect(()=>{ setVisualKey(currentSortBy) },[currentSortBy]);

    function handleOnClickMain() {
        setIsExpanded(!isExpanded);
    }

    function handleOnClickHidden(key) {
        setPendingKey(key);
        setIsExpanded(false);
    }

    useEffect(() => {
        const el = hiddenRef.current;
        const ar = activeRef.current;
        if (!el) return;
        if (!ar) return;

        function onEndCollpse(e) {
            if (e.propertyName != 'max-width') return;
            if (isExpanded) return;
            if (!pendingKey) return;
            
            requestAnimationFrame(() => setActiveFade(true));
        }

        function onEndFade(e) {
            if (e.propertyName != 'opacity') return;
            if (isExpanded) return;
            if (!pendingKey) return;

            requestAnimationFrame(() => {
                setVisualKey(pendingKey);
                console.log(pendingKey);
                dispatch(updatePreferences({sortBy: pendingKey}));
                dispatch(sortByTodos({sortDirection: currentSortDirection, sortBy: pendingKey}));
                setPendingKey(null);
                requestAnimationFrame(() => setActiveFade(false));
            })
        }

        el.addEventListener('transitionend', onEndCollpse);
        ar.addEventListener('transitionend', onEndFade);

        return () => {
            el.removeEventListener('transitionend', onEndCollpse);
            ar.removeEventListener('transitionend', onEndFade);
        };
        }, [isExpanded, pendingKey, currentSortDirection, dispatch]);


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
            <div className="active-wrapper" ref={activeRef}>
                    {METHODS.map((m) => {
                        if (visualKey === m.key) {
                            return <button key={m.key} className={`quick-actions-button active ${isExpanded ? '' : 'collapsed'}`} onClick={handleOnClickMain} title={m.title} aria-label={m.title}>
                                        <m.icon size={18} className={`active-icon ${activeFade?'fade':''}`}/> 
                                        {isExpanded ? '' : <ChevronsRight className={`active-icon ${activeFade?'fade':''}`} size={11}/>}
                                    </button>
                        }
                    })}
            </div>
            <div className="hidden-wrapper" ref={hiddenRef}> 
                {METHODS.map((m) => {
                        if (visualKey !== m.key) {
                            return <button key={m.key} className={`quick-actions-button ${isExpanded ? '' : 'hidden'}`} onClick={() => handleOnClickHidden(m.key)} title={m.title} aria-label={m.title}>{<m.icon size={18}/>} </button>
                        }
                    })}
            </div>
           </div>
}