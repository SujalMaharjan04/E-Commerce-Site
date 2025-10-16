import { createContext, useReducer } from "react";


const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload

        case "CLEAR_NOTIFICATION":
            return null

        default:
            return state
    }
}


const NotificationContext = createContext()

const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, {text: null, type: null})

    return (
        <NotificationContext.Provider value = {[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export  {NotificationContextProvider, NotificationContext}