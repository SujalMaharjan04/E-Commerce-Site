import { useReducer, createContext } from "react";

const initialState = {
    name: "",
    phone: "",
    email: "",
    address: "",
    items: [],
    paymentMethod: "",
    deliveryMethod: "",
    comfirmed: false
}

const orderReducer = (state, action) => {
    switch (action.type) {
        case "SET_CUSTOMER_INFO":
            return {...state, ...action.payload}

        case "SET_PAYMENT_METHOD":
            return  {...state, paymentMethod: action.payload}

        case "RESET":
            return initialState

        default: 
            return state
    }
}

const OrderContext = createContext()

const OrderContextProvider = (props) => {
    const [orderForm , dispatchOrderForm] = useReducer(orderReducer, initialState)

    return (
        <OrderContext.Provider value = {[orderForm, dispatchOrderForm]}>
            {props.children}
        </OrderContext.Provider>
    )
}

export {OrderContextProvider, OrderContext}