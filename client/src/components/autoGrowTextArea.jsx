import { useRef, useLayoutEffect } from "react";

export function AutoGrowTextArea({text, onChange, onKeyDown, placeholder}) {
    const textAreaRef = useRef(null);

    useLayoutEffect(() => {
        const el = textAreaRef.current;
        if (!el) return;
        el.style.height = '0px';
        el.style.height = `${el.scrollHeight}px`;
    }, [text]);

    return (<textarea className="auto-grow-text-area" rows={1} value={text} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} ref={textAreaRef}></textarea>);
}