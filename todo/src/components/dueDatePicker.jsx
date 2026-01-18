import { useState } from "react";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";


export function DueDatePicker({anchorElement, datePicker, todoItemCommands }) {
    const [pos, setPos] = useState(null);
    const popoverRef = useRef(null);

    const { pickedDate: currentValue, handleConfirm, handleCancel, isDatePickerOpen} = datePicker;
    const { handleDateChange } = todoItemCommands;
    
    useEffect(() => {
        if (!anchorElement) return;

        const updatePos = () => {
            const ae = anchorElement.getBoundingClientRect();
            setPos({
                top: ae.bottom + 8,
                left: ae.left,
            });
        }
        updatePos();

        document.addEventListener('scroll', updatePos, true);
        window.addEventListener('resize', updatePos);

        return () => {
            document.removeEventListener('scroll', updatePos, true);
            window.removeEventListener('resize', updatePos);
        }
        
    }, [anchorElement]);

    useEffect(() => {
        if (!isDatePickerOpen) return;

        const close = () => handleCancel();

        const onGlobalPointerDown = (e) => {
            if (popoverRef.current.contains(e.target)) return;
            handleCancel();
        };

//        window.addEventListener('blur', close);
//        document.addEventListener('pointerdown', onGlobalPointerDown);

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

  window.addEventListener("keydown", onKeyDownCapture, true); // capture
  return () => window.removeEventListener("keydown", onKeyDownCapture, true);
}, [isDatePickerOpen]);

    let pickerContent = '';

    if (!pos) return null;


    pickerContent = createPortal(<div className="date-picker-overlay"  onDoubleClick={(e) => e.stopPropagation()}>
                        <div className="date-picker-popover" style={{top: pos.top, left: pos.left}} onClick={(e) => e.stopPropagation()}  ref={popoverRef} >
                        <Flatpickr className='hidden-date-picker' options={{ enableTime: true, time_24hr: true, enableSeconds: true, dateFormat: "Y-m-d H:i:S", defaultHour: 9, disableMobile: true, inline: true }} value={currentValue} 
                        onChange={(selectedDates) => {
                            const date = selectedDates?.[0];
                            if (!date) return;
                            console.log(date);
                            handleDateChange(date);
                            }}
                        />
                            <div className="date-picker-actions">
                                <button type="button" className="date-picker-button" onClick={handleConfirm}>Confirm</button>
                                <button type="button" className="date-picker-button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>, document.body)

    return  pickerContent;
};
