import { useContext } from "react"
import { UserContext } from "../context/adminContext"
import { useNavigate } from "react-router-dom"
import useNotificationStore from "../store/notification.store"


export const useLogout = () => {
    const [user, dispatchUser] = useContext(UserContext)
    const notify = useNotificationStore(state => state.notify)
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatchUser({
            type: 'CLEAR_USER'
        })

        window.localStorage.removeItem('loggedApp')
        const redirectPath = user.role === 'Admin' ? '/admin' : '/'
        navigate(redirectPath)

        notify("You have logged out", "success")
    }

    return {handleLogout}
}