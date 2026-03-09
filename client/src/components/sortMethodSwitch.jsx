import { useState, useEffect } from "react";
import { SortMethodButtonExtended } from "./sortMethodButtonExtended";
import { SortMethodButtonDynamic } from "./sortMethodButtonDynamic";

export function SortMethodSwitch () {

    function useMediaQuery(query) {
        const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

        useEffect(() => {
            const m = window.matchMedia(query);
            const onChange = () => setMatches(m.matches);
            m.addEventListener('change', onChange);
            return () => m.removeEventListener('change', onChange);
        }, [query]);
        return matches;
    }

    const isNarrow = useMediaQuery("(max-width: 630px)");
    
    if (isNarrow) {
        return <SortMethodButtonExtended />
    } else {
        return <SortMethodButtonDynamic />
    }
}