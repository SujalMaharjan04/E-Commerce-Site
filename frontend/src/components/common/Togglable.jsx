import { useState, forwardRef, useImperativeHandle } from "react"
import { createPortal } from "react-dom"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => ({
        toggleVisibility
    }));

    return (
        <div className="relative inline-block">
            <div onClick={toggleVisibility} className={props.triggerClassName}>
                {props.trigger ? (
                    <div className = "flex flex-row justify-between items-center gap-2">
                        {props.trigger}
                        {props.triggerLabel}
                    </div> // icon or custom element
                ) : (
                    <button className={props.className}>
                        {props.buttonLabel}
                    </button>
                )}
            </div>

            {visible && (
                createPortal(
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                        <div
                            className="bg-[#0F172A] w-[90%] md:w-[60%] lg:w-[40%] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-lg relative"
                            onClick={(e) => e.stopPropagation()} // prevent close on modal click
                        >
                            {props.children}
                            <button
                                className="absolute top-2 right-3 text-[#F8FAFC] text-xl"
                                onClick={toggleVisibility}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                , document.body)
            )}
        </div>
    );
});

export default Togglable;
