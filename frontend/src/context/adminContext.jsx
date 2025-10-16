import { createContext, useReducer } from "react";

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload
        
        case "CLEAR_USER":
            return null
        
        default: 
            return state
    }
}

const UserContext = createContext()

const UserContextProvider = (props)  => {
    const [user, setUser] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value = {[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}

const brandReducer = (state, action) => {
    switch (action.type) {
        case "SET_BRAND":
            return action.payload
        
        case "ADD_BRAND":
            return [...state, action.payload]

        default: 
            return state
    }
}

const BrandContext = createContext()

const BrandContextProvider = (props) =>{
    const [brand, setBrand] = useReducer(brandReducer, [])

    return (
        <BrandContext.Provider value = {[brand, setBrand]}>
            {props.children}
        </BrandContext.Provider>
    )
}

export {UserContextProvider, BrandContextProvider, UserContext, BrandContext}