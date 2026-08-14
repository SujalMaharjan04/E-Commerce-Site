import {create} from 'zustand' 
import {createJSONStorage, persist} from 'zustand/middleware'
import authService from '../services/auth'

const useAuthStore = create(
    persist(
        (set) => ({
        //This stores the user info: e.g name, and other info
        user: null,
        isAuthenticated: false,
        isLoading: true,

        //This sets the user into the state
        setUser: (user) => set({user, isAuthenticated: true}),

        //Clear the token when logging out
        logout: async() => {
            await authService.logout()
            set({user: {}, isAuthenticated: false})
        },

        checkAuth: async() => {
            try {
                const user = await authService.checkAuth()
                set({user, isAuthenticated: true, isLoading: false})
            }
            catch {
                set({user: null, isAuthenticated: false, isLoading: false})
            }
        }
        }),
        {
            name: "loggedApp",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                user: state.user
            })
        }
    )
)

export default useAuthStore