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
                        <div className = "mt-4">
                            <button className = {props.className}>{props.buttonLabel}</button>
                            <button onClick={() => toggleVisibility()} className = "border border-solid border-black border-2 w-48 h-14 bg-red-900 text-white rounded-2xl hover:cursor-pointer hover:bg-red-700 transition-all duration-150">Cancel</button>
                        </div>
                    </div>
                </div>)}
            
        </div>
    )
})

export default Togglable