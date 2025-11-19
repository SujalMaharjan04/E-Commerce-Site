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

        case "UPDATE_BRAND":
            return state.map(p => p.id === action.payload.id ? action.payload : p)

        case "DELETE_BRAND":
            return state.filter(p => p.id !== action.payload)


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

const categoryReducer = (state, action) => {
    switch(action.type) {
        case "SET_CATEGORY":
            return action.payload

        case "ADD_CATEGORY":
            return [...state, action.payload]

        case "UPDATE_CATEGORY":
            return state.map(c => c.id === action.payload.id ? action.payload : c)

        case "DELETE_CATEGORY":
            return state.filter(c => c.id !== action.payload)

        default: 
            return state
    }
}

const CategoryContext = createContext()

const CategoryContextProvider = (props) => {
    const [category, dispatchCategory] = useReducer(categoryReducer, [])

    return (
        <CategoryContext.Provider value = {[category, dispatchCategory]}>
            {props.children}
        </CategoryContext.Provider>
    )
}

const productReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return action.payload

        case "ADD_PRODUCT":
            return [...state, action.payload]

        case "UPDATE_PRODUCT":
            return state.map(p => p.id === action.payload.id ? action.payload.newProduct : p)

        case "DELETE_PRODUCT":
            return state.filter(p => p.id !== action.payload)

        default:
            return state
    }
}

const ProductContext = createContext()

const ProductContextProvider = (props) => {
    const [products, dispatchProducts] = useReducer(productReducer, [])

    return (
        <ProductContext.Provider value = {[products, dispatchProducts]}>
            {props.children}
        </ProductContext.Provider>
    )
}

const usersReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS": 
            return action.payload

        case "ADD_USERS":
            return [...state, action.payload]

        case "UPDATE_USERS":
            return state.map(s => s.id === action.payload.id ? action.payload : s)

        default: 
            return state
    }
}


const UsersContext = createContext()

const UsersContextProvider = (props) => {
    const [users, dispatchUsers] = useReducer(usersReducer, [])

    return (
        <UsersContext.Provider value = {[users, dispatchUsers]}>
            {props.children}
        </UsersContext.Provider>
    )
}
export {UserContextProvider, BrandContextProvider, CategoryContextProvider, ProductContextProvider, UsersContextProvider, UserContext, BrandContext, CategoryContext, ProductContext, UsersContext}