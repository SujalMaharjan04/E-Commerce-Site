import { useContext } from "react"
import { UserContext } from "../context/adminContext"
import { NotificationContext } from "../context/NotificationContext"
import { useNavigate } from "react-router-dom"


export const useLogout = () => {
    const [user, dispatchUser] = useContext(UserContext)
    const [notification, dispatch] = useContext(NotificationContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatchUser({
            type: 'CLEAR_USER'
        })

        window.localStorage.removeItem('loggedApp')
        const redirectPath = user.role === 'Admin' ? '/admin' : '/'
        navigate(redirectPath)
        dispatch({
            type: "SET_NOTIFICATION",
            payload: {
                text: 'You have logged out',
                type: 'success'
            }
        })

        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION'
            })
        }, 2000)
    }

    return {handleLogout}
}