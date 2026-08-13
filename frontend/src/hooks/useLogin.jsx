import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/adminContext";
import loginService from '../services/login'
import useNotificationStore from "../store/notification.store";
import useAuthStore from "../store/auth.store";

export const useLogin = (isAdmin = false) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const notify = useNotificationStore(state => state.notify)
    const setUserInfo = useAuthStore(state => state.setUserInfo)
    const setToken = useAuthStore(state => state.setToken)
    const navigate = useNavigate()


    const handleLogin = async(event) => {
        event.preventDefault()
        try {
            if (!username || !password) {
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
            setUserInfo({id: user.id, role: user.role, username: user.username})
            setToken(user.token)
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