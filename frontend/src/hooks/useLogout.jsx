import { UserContext } from "../context/adminContext"
import { useNavigate } from "react-router-dom"
import useNotificationStore from "../store/notification.store"
import useAuthStore from "../store/auth.store"


export const useLogout = () => {
    const logout = useAuthStore(state => state.logout)
    const user = useAuthStore(state => state.userInfo)
    const notify = useNotificationStore(state => state.notify)
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        console.log(user)
        const redirectPath = user.role === 'Admin' ? '/admin' : '/'
        navigate(redirectPath)

        notify("You have logged out", "success")
    }

    return {handleLogout}
}