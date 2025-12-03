import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/adminContext";
import { NotificationContext } from "../context/NotificationContext";
import loginService from '../services/login'

export const useLogin = (isAdmin = false) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, dispatchUser] = useContext(UserContext)
    const [notification, dispatch] = useContext(NotificationContext)
    const navigate = useNavigate()


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
            return
        }
        const user = isAdmin 
            ? await loginService.adminLogin({username, password})
            : await loginService.userLogin({username, password})

        if (!user || !user.token) {
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: {text: "Invalid Credentials", type: "error"}
            })

            setTimeout(() => {
                dispatch({
                    type: "CLEAR_NOTIFICATION"
                })
            }, 2000)
            return 
        }

        window.localStorage.setItem(
            'loggedApp', JSON.stringify(user)
        )
        dispatchUser({type: 'SET_USER', payload: user})
        setUsername("")
        setPassword("")

        dispatch({
            type: "SET_NOTIFICATION",
            payload: {text: 'Login Successful', type: 'success'}
        })

        setTimeout(() => {
            dispatch({
                type: "CLEAR_NOTIFICATION"
            })
        }, 2000)

        if (user.role === 'Admin') {
            navigate('/admin/dashboard')
        }  
        else {
            navigate('/')
        }
        }
        catch (err) {
            console.log(err)
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

    return {username, setUsername, password, setPassword, handleLogin }
}