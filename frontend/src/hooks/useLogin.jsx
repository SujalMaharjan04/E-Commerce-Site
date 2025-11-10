import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/adminContext";
import { NotificationContext } from "../context/NotificationContext";
import loginService from '../services/login'

export const useLogin = (redirectPath) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, dispatchUser] = useContext(UserContext)
    const [notification, dispatch] = useContext(NotificationContext)
    const navigate = useNavigate()

    const handleUserChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async(event) => {
        event.preventDefault()
        try {
        if (!username || !password) {
            dispatch({
                type: "SET_NOTIFICATION",
                payload: {text: 'Username and password required', type: 'error'}
            })
            setTimeout(() => {
                dispatch({type: "CLEAR_NOTIFICATION"})
            }, 2000)
        }
        const user = await loginService.login({username, password})
        window.localStorage.setItem(
            'loggedAppAdmin', JSON.stringify(user)
        )
        dispatchUser({type: 'SET_USER', payload: user})
        setUsername("")
        setPassword("")

        if (user.token) {
            // navigate('/admin/dashboard')
            navigate(redirectPath)
        }  else {
            alert('Invalid Credentials')
        }
        }
        catch {
        dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
            text: 'Login Credentials failed',
            type: 'error'
            }
        })

        setTimeout(() => {
            dispatch({
            type: 'CLEAR_NOTIFICATION'
            })
        }, 2000)
        }
    }

    return {username, handleUserChange, password, handlePasswordChange, handleLogin }
}