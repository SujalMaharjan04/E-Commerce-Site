import StarDisplay from "../common/StarDisplay"

const ProductReview = ({review}) => {
    const date = new Date(review.createdAt)
    return (
        <div>
            <hr />
            <div className = "my-4">
                <h2>Product Reviews</h2>
            </div>
            <hr />

            <div className = "my-4">
                <div className = "flex flex-row justify-between items-center">
                    <StarDisplay rating = {review.rating} />
                    <span>{date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                        
                    })}</span>
                </div>
                <span>{review.user.username}</span>
                <div>{review.comment}</div>
            </div>
            <hr />
        </div>
    )
}

export default ProductReview