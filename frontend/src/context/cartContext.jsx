import { createContext, useEffect, useReducer } from "react";
import cartService from '../services/cart'

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

    useEffect(() => {
        const loadCart = async () => {
            const data = await cartService.getAllCart()
            dispatchCart({type: "SET_CART", payload: data})
        }

        loadCart()
    }, [])

    return (
        <CartContext.Provider value = {[cart, dispatchCart]}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContextProvider, CartContext}