import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/adminContext";
import authService from '../services/auth'
import useNotificationStore from "../store/notification.store";
import useAuthStore from "../store/auth.store";

export const useLogin = (isAdmin = false) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const notify = useNotificationStore(state => state.notify)
    const setUser = useAuthStore(state => state.setUser)
    const navigate = useNavigate()


    const handleLogin = async(event) => {
        event.preventDefault()
        try {
            if (!username || !password) {
                return
            }
            const user = isAdmin 
                ? await authService.adminLogin({username, password})
                : await authService.userLogin({username, password})

            if (!user.success && user.type === 'RATE-LIMIT') {
                console.log(user.message)
                notify(`${user.message} ${user.retryAfter} seconds`, "error")
                return 
            }

            if (!user || !user.id) {
                notify("Invalid Credentials", "error")
                return 
            }
            setUser({id: user.id, role: user.role, username: user.username})
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