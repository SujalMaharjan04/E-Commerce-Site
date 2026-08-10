import { useState } from "react";

export function useErrorLines(username, password) {
    const [touched, setTouched] = useState({username: false, password: false})
    const usernameError = !username.trim() ? "Username Required" : ""
    const passwordError = !password.trim() ? "Password Required" : password.length <= 6 ? "Password Should be greater than 6" : ""

    return {
        touched, 
        setTouched, 
        usernameError: touched.username ? usernameError : "", 
        passwordError: touched.password ? passwordError : ""
    }
}