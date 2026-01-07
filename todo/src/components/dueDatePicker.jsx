import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveTodo, dragAndDropReorderTodos } from "../thunks/todoThunks";
import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import { toggleId, collapseId } from "../slices/uiTodoSlicer";
import { AlertCircle, Plus, Minus, GripVertical } from "lucide-react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";


export function DueDatePicker({initialValue, onConfirm, onCancel, anchorElement, onChange}) {
    const [pickedDate, setPickedDate] = useState(null);
    const [pos, setPos] = useState(null);

    useEffect(() => {
        if (!anchorElement) return;
        const ae = anchorElement.getBoundingClientRect();
        setPos({
            top: ae.bottom + window.scrollY + 8,
            left: ae.left + window.scrollX,
        });
    }, [anchorElement]);

    let pickerContent = '';

    pickerContent = (pos) && createPortal(<div className="date-picker-overlay" onPointerDown={(e) => {if (e.target === e.currentTarget) onCancel()}}>
                        <div className="date-picker-popover" style={{top: pos.top, left: pos.left}} onClick={(e) => e.stopPropagation()}>
                        <Flatpickr className='hidden-date-picker' options={{ enableTime: true, time_24hr: true, enableSeconds: true, dateFormat: "Y-m-d H:i:S", defaultHour: 9, disableMobile: true, inline: true }} value={initialValue} onChange={onChange} />
                            <div className="date-picker-actions">
                                <button className="date-picker-button" onClick={onConfirm}>Confirm</button>
                                <button className="date-picker-button" onClick={onCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>, document.body)

    return  pickerContent;
};
