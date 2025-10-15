import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => ({
        toggleVisibility
    }))

    return (
        <div>
            <div className = "relative inline-block">
                <button onClick={() => toggleVisibility()} className = {props.className}>{props.buttonLabel}</button>
            </div>
            {visible && (
                <div className = "fixed inset-0 bg-black/40 bg-opacity-25 flex justify-center items-center z-50">
                    <div className = "bg-white w-[90%] md:w-[60%] lg:w-[40%] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-lg">
                        {props.children}
                        
                    </div>
                </div>)}
            
        </div>
    )
})

export default Togglable