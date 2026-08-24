import { useState } from "react"


const Input = ({label, value, onChange, type = "text", error, name, showPasswordToggle = false, onBlur}) => {
    const [visible, setVisible] = useState(false)

    const inputType = type === "password" && showPasswordToggle ? (visible ? "text" : "password") : type
    return (
        <div>
            <div className = "flex justify-between items-baseline">
                <span className = "text-sm font-medium text-[#F8FAFC]">
                    {label}
                </span>
                
            </div>
            <div className = "relative">
                <input 
                name = {name}
                type = {inputType}
                value = {value}
                onChange = {(e) => onChange(e.target.value)}
                className = {`mt-2 block w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-offset-1 ${error ? "border-red-300" : "border-gray-200"}`}
                onBlur = {onBlur}
                />

                {type === "password" && showPasswordToggle && (
                    <button type = "button" onClick = {() => setVisible(!visible)} className = "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{visible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M1.458 12C2.732 7.943 6.75 4.5 12 4.5c5.25 0 9.268 3.443 10.542 7.5-1.274 4.057-5.292 7.5-10.542 7.5-5.25 0-9.268-3.443-10.542-7.5zM12 15a3 3 0 100-6 3 3 0 000 6z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17.94 17.94A10.05 10.05 0 0112 19c-5.25 0-9.268-3.443-10.542-7.5a10.05 10.05 0 014.035-4.643M3 3l18 18M9.75 9.75a3 3 0 104.5 4.5" 
                            />
                        </svg>

                    )}</button>
                )}
            </div>
            {error && (<span className = "text-xs text-red-600">{error}</span>)}
        </div>
    )
}

export default Input