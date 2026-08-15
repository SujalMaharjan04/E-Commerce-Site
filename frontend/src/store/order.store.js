import {create} from "zustand"


const initialState = {
    name: "",
    phone: "",
    email: "",
    address: "",
    items: [],
    paymentMethod: "",
    deliveryMethod: "",
    comfirmed: false,
}

export const useOrderStore = create(
    (set) => ({
        order : {...initialState},

        setCustomerInfo: (payload) => {
            set((state) => ({order: {...state.order, ...payload}}))
        },

        setOrderItems: (items) => {
            set((state) => ({order: {...state.order, items}}))
        },

        setPaymentInfo: (method) => {
            set((state) => ({order: {...state.order, paymentMethod: method}}))
        },

        reset: () => set({order: {...initialState}})
    })
)