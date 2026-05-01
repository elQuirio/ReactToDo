import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";


export function DueDatePicker({anchorElement, datePicker, todoItemCommands }) {
    const popoverRef = useRef(null);

    const { pickedDate: currentValue, handleConfirm, handleCancel, isDatePickerOpen} = datePicker;
    const { handleDateChange } = todoItemCommands;
    
    const { refs, floatingStyles } = useFloating({
        placement: "bottom-start",
        middleware: [offset(8), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    });

    useEffect(() => {
        if (!isDatePickerOpen) return;
        if (!anchorElement) return;
        refs.setReference(anchorElement);
    }, [isDatePickerOpen, anchorElement, refs]);

    useEffect(() => {
        if (!isDatePickerOpen) return;

        const close = () => handleCancel();

        const onGlobalPointerDown = (e) => {
            const pop = popoverRef.current;
            if (!pop) return;
            if (pop.contains(e.target)) return;
            handleCancel();
        };

        window.addEventListener('blur', close);
        document.addEventListener('pointerdown', onGlobalPointerDown);

        return () => {
            document.removeEventListener('pointerdown', onGlobalPointerDown);
            window.removeEventListener('blur', close);
        };

    }, [isDatePickerOpen, handleCancel]);

    useEffect(() => {
        if (!isDatePickerOpen) return;

        const onKeyDownCapture = (e) => {
            if (e.key !== "Enter") return;

            const pop = popoverRef.current;
            if (!pop || !pop.contains(e.target)) return;

            e.stopPropagation();
            //patch for Firefox commit on Enter button glitch
            requestAnimationFrame(() => {
            const ae = document.activeElement;
            if (ae && pop.contains(ae) && typeof ae.blur === "function") {
                ae.blur();
            }
            });
        };

        window.addEventListener("keydown", onKeyDownCapture, true);
        return () => window.removeEventListener("keydown", onKeyDownCapture, true);
    }, [isDatePickerOpen]);


    return createPortal(<div className="date-picker-overlay"  onDoubleClick={(e) => e.stopPropagation()}>
                        <div className="date-picker-popover" style={floatingStyles} onClick={(e) => e.stopPropagation()}  ref={(node) => {
                            refs.setFloating(node);
                            popoverRef.current = node;
                            }} >
                        <Flatpickr className='hidden-date-picker' options={{ enableTime: true, time_24hr: true, enableSeconds: true, dateFormat: "Y-m-d H:i:S", defaultHour: 9, disableMobile: true, inline: true }} value={currentValue ?? new Date()} 
                        onChange={(selectedDates) => {
                            const date = selectedDates?.[0];
                            if (!date) return;
                            handleDateChange(date);
                            }}
                        />
                            <div className="date-picker-actions">
                                <button type="button" className="date-picker-button" onClick={handleConfirm}>Confirm</button>
                                <button type="button" className="date-picker-button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>, document.body);
};