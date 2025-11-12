import { useState, forwardRef, useImperativeHandle } from "react";

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
                    props.trigger // icon or custom element
                ) : (
                    <button className={props.className}>
                        {props.buttonLabel}
                    </button>
                )}
            </div>

            {visible && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div
                        className="bg-white w-[90%] md:w-[60%] lg:w-[40%] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-lg relative"
                        onClick={(e) => e.stopPropagation()} // prevent close on modal click
                    >
                        {props.children}
                        <button
                            className="absolute top-2 right-3 text-gray-600 text-xl"
                            onClick={toggleVisibility}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default Togglable;
