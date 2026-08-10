import { create } from "zustand";


const useNotificationStore = create(
    (set, get) => ({
        notification: {
            message: null,
            type: null
        },
        timeoutId: null,

        setNotification: (message, type) => {
            if (!['success', 'error'].includes(type)) {
                return
            }

            set({notification: {message, type}})
        },

        clearNotification: () => {
            set({notification: {message: null, type: null}, timeoutId: null})
        },

        notify: (message, type) => {
            const {setNotification, clearNotification, timeoutId} = get()

            if (timeoutId) clearTimeout(timeoutId)

            setNotification(message, type)

            const newTimeoutId = setTimeout(() => {
                clearNotification()
            }, 5000)

            set({timeoutId: newTimeoutId})
        }
    })
)

export default useNotificationStore