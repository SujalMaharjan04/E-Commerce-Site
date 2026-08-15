import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import reviewService from '../../services/review'
import useNotificationStore from "../../store/notification.store"
import useAuthStore from "../../store/auth.store"

const Review = () => {
    const [active, setActive] = useState(0)
    const query = useQueryClient()
    const { id } = useParams()
    const user = useAuthStore(state => state.user)
    const notify = useNotificationStore(state => state.notify)
    const [review, setReview] = useState({
        rating: 0,
        comment: ""
    })

    const handleReview = ( key, value) => {
        setReview(prev => ({
            ...prev,
            [key]: value
        }))
    }

    //Mutation for adding new reviews
    const addReview = useMutation({
        mutationFn: ({id, review}) => reviewService.addReview(id, review),
        onSuccess: () => {
            query.invalidateQueries({queryKey: ['review', id]}) //query Key
        },
        onError: (error) => {
            const msg = error?.response?.data?.error || "Failed to add Review"

            notify(msg, "error")
        }
    })

    const handleSubmit = async(event) => {
        event.preventDefault()
        console.log(review)
        if (review.comment === '' || review.rating === 0) { //Checking if whether the comment is empty or rating is 0

            notify("Rating and comments should be given", "error")
            return
        }
        await addReview.mutateAsync({id, review})
        setReview({
            rating: 0,
            comment: ""
        })
    }


    const reviewBtn = "md:border-2 md:min-w-24 md:min-h-12 md:rounded-lg "
    return (
        <div >
            {user 
            ? <form onSubmit = {handleSubmit}>
                <div className = "md:flex md:flex-row md:justify-between md:items-center ">
                    <button type = "button" name = "rating" value = {1}  onClick = {(event) => {
                        handleReview("rating", Number(event.currentTarget.value))
                        setActive(Number(event.currentTarget.value))
                        }} className = {`${reviewBtn} ${active === 1 ? "bg-green-500" : ""}`}>1</button>
                    <button type = "button" name = "rating" value = {2}  onClick = {(event) => {
                        handleReview("rating", Number(event.currentTarget.value))
                        setActive(Number(event.currentTarget.value))
                        }}  className = {`${reviewBtn} ${active === 2 ? "bg-green-500" : ""}`}>2</button>
                    <button type = "button" name = "rating" value = {3}  onClick = {(event) => {
                        handleReview("rating", Number(event.currentTarget.value))
                        setActive(Number(event.currentTarget.value))
                        }} className = {`${reviewBtn} ${active === 3 ? "bg-green-500" : ""}`}>3</button>
                    <button type = "button" name = "rating" value = {4}  onClick = {(event) => {
                        handleReview("rating", Number(event.currentTarget.value))
                        setActive(Number(event.currentTarget.value))
                        }} className = {`${reviewBtn} ${active === 4 ? "bg-green-500" : ""}`}>4</button>
                    <button type = "button" name = "rating" value = {5}  onClick = {(event) => {
                        handleReview("rating", Number(event.currentTarget.value))
                        setActive(Number(event.currentTarget.value))
                        }} className = {`${reviewBtn} ${active === 5 ? "bg-green-500" : ""}`}>5</button>
                </div>

                <div className = "mt-4">
                    <textarea rows = "5" cols = "70" className = "border-2" name = "comment" onChange = {(event) => handleReview(event.target.name, event.target.value)} />
                </div>
                <div className = "md:flex md:flex-row md:justify-end md:items-center md:mt-4">
                    <button type = "submit" className = "bg-[#E09F75] rounded-lg md:min-w-22 min-h-8 hover:cursor-pointer hover:bg-[#F79F75] text-center text-xl font-mono">Submit</button>
                </div>
            </form>
            : <h1>Please Login to Review this product</h1>}
            
        </div>
    )
}

export default Review