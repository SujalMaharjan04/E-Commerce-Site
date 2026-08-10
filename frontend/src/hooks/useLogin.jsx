import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/adminContext";
import loginService from '../services/login'
import useNotificationStore from "../store/notification.store";

export const useLogin = (isAdmin = false) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, dispatchUser] = useContext(UserContext)
    const notify = useNotificationStore(state => state.notify)
    const navigate = useNavigate()


    const handleLogin = async(event) => {
        event.preventDefault()
        try {
            if (!username || !password) {
                notify("Username and password required", "error")
                return
            }
            const user = isAdmin 
                ? await loginService.adminLogin({username, password})
                : await loginService.userLogin({username, password})

            if (!user.success && user.type === 'RATE-LIMIT') {
                console.log(user.message)
                notify(`${user.message} ${user.retryAfter} seconds`, "error")
                return 
            }

            if (!user || !user.token) {
                notify("Invalid Credentials", "error")
                return 
            }

            window.localStorage.setItem(
                'loggedApp', JSON.stringify(user)
            )
            dispatchUser({type: 'SET_USER', payload: user})
            setUsername("")
            setPassword("")

            notify("Login Successful", "success")

            if (user.role === 'Admin') {
                navigate('/admin/dashboard')
            }  
            else {
                navigate('/')
            }
        }
        catch (err) {
            console.log(err)
            notify("Login Credentials Failed", "error")
        }
    }

    return {username, setUsername, password, setPassword, handleLogin }
}