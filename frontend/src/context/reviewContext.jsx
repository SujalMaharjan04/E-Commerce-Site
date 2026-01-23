import { createContext, useReducer } from "react";

const reviewReducer = (state, action) => {
    switch (action.type) {
        case "SET_REVIEW":
            return action.payload

        case "ADD_REVIEW":
            return [...state, action.payload]

        default: 
            return state
    }
}

const ReviewContext = createContext()

const ReviewContextProvider = (props) => {
    const [review, dispatchReview] = useReducer(reviewReducer, [])

    return (
        <ReviewContext.Provider value = {[review, dispatchReview]}>
            {props.children}
        </ReviewContext.Provider>
    )
}

export {ReviewContext, ReviewContextProvider}