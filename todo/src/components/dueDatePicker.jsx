import { useState } from "react";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";


export function DueDatePicker({anchorElement, currentValue, onConfirm, onCancel, onChange, isDatePickerOpen}) {
    const [pos, setPos] = useState(null);
    const popoverRef = useRef(null);

    useEffect(() => {
        if (!anchorElement) return;
        const ae = anchorElement.getBoundingClientRect();
        setPos({
            top: ae.bottom + window.scrollY + 8,
            left: ae.left + window.scrollX,
        });
    }, [anchorElement]);

    useEffect(() => {
        if (!isDatePickerOpen) return;
        const onGlobalPointerDown = (e) => {
            if (popoverRef.current.contains(e.target)) return;
            onCancel();
        };

        document.addEventListener('pointerdown', onGlobalPointerDown);

        return () => document.removeEventListener('pointerdown', onGlobalPointerDown);

    }, [isDatePickerOpen, onCancel]);

    useEffect(() => { // capire se posso unire i due useEffect
        if (!isDatePickerOpen) return;
        const close = () => onCancel();

        window.addEventListener('blur', close);

        return () => { 
            window.removeEventListener('blur', close);
        }
    },[isDatePickerOpen, onCancel])

    let pickerContent = '';

    if (!pos) return null;

    pickerContent = createPortal(<div className="date-picker-overlay"  onDoubleClick={(e) => e.stopPropagation()}>
                        <div className="date-picker-popover" style={{top: pos.top, left: pos.left}} onClick={(e) => e.stopPropagation()} ref={popoverRef}>
                        <Flatpickr className='hidden-date-picker' options={{ enableTime: true, time_24hr: true, enableSeconds: true, dateFormat: "Y-m-d H:i:S", defaultHour: 9, disableMobile: true, inline: true }} value={currentValue} 
                        onChange={(selectedDates) => {
                            const date = selectedDates?.[0];
                            if (!date) return;
                            onChange(date);
                            }} />
                            <div className="date-picker-actions">
                                <button className="date-picker-button" onClick={onConfirm}>Confirm</button>
                                <button className="date-picker-button" onClick={onCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>, document.body)

    return  pickerContent;
};
