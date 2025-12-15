import { createContext, useContext, useEffect, useReducer } from "react";
import cartService from '../services/cart'
import { UserContext } from './adminContext'

const cartReducer = (state, action) => {
    switch (action.type) {
        case "SET_CART":
            return action.payload

        case "DELETE_CART":
            return state.items.filter(item => item.product.id !== action.payload)

        default: 
            return state
    }
}


const CartContext = createContext()

const CartContextProvider = (props) => {
    const [cart, dispatchCart] = useReducer(cartReducer, {user: null, items: []})
    const [user, dispatchUser] = useContext(UserContext)

    useEffect(() => {
        if (!user) return 
        
        const loadCart = async () => {
            const data = await cartService.getAllCart()
            dispatchCart({type: "SET_CART", payload: data})
        }

        loadCart()
    }, [user])

    return (
        <CartContext.Provider value = {[cart, dispatchCart]}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContextProvider, CartContext}