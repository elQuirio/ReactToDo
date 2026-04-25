import { useRef, useLayoutEffect, useState } from "react";

export function MessageItem({messageData}) {
    //const { userId, role, messageId, conversationId, position, messageText } = messageData;
    const { messageText, role } = messageData;
    const visibleRef = useRef();
    const measureRef = useRef();
    const rowRef = useRef();
    const [bubbleWidth, setBubbleWidth] = useState();

    useLayoutEffect(() => {
        if(!rowRef.current || !measureRef.current || !visibleRef.current) return;

        const rowWidth = rowRef.current.getBoundingClientRect().width;
        const maxBubbleWidth = rowWidth * 0.65;
        //need to fix a max width in px for correct measurements
        measureRef.current.style.maxWidth = `${maxBubbleWidth}px`;

        const measureEl = measureRef.current;
        const range = document.createRange();
        range.selectNodeContents(measureEl);
        const rects = Array.from(range.getClientRects())

        if (rects.length === 0) return;

        const maxLineWidth = rects.reduce((acc, rect) => {
            return Math.max(acc, rect.width);
        }, 0);

        const nextWidth = Math.min(maxLineWidth, maxBubbleWidth);
        
        setBubbleWidth(nextWidth);

    }, [messageText]);

    return  <>
                <div ref={measureRef} className={`chat-item-measure chat-item ${role === 'user' ? 'chat-item-user' : 'chat-item-assistant'}`} >
                    {messageText}
                </div>
                <div ref={rowRef} className={`chat-item-row ${role === 'user' ? 'chat-item-row-user' : 'chat-item-row-assistant'}`}>
                    <div ref={visibleRef} className={`chat-item ${role === 'user' ? 'chat-item-user' : 'chat-item-assistant'}`} style={bubbleWidth ? {width: `${bubbleWidth}px`} : undefined} onDoubleClick={() => {}} >
                        {messageText}
                    </div>
                </div>
            </>
};
