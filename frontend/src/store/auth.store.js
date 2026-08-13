import {create} from 'zustand' 
import {createJSONStorage, persist} from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
        //This stores the user info: e.g name, and other info
        userInfo: {},
        token: null, //This stores the token received during login or signup

        //This sets the userinfo into the state
        setUserInfo: (userInfo) => set({userInfo}),

        //Stores the token
        setToken: (token) => set({token}),

        //Clear the token when logging out
        logout: () => set({userInfo: {}, token: null})
        }),
        {
            name: "loggedApp",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                token: state.token,
                userInfo: state.userInfo
            })
        }
    )
)

export default useAuthStore