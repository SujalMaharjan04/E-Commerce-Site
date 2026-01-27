import { useState } from "react";

const StarDisplay = ( {rating}) => {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span key = {star} className = {`text-2xl ${star <= rating ? "text-orange-400" : "text-gray-700"}`}>
                    &#9733;
                </span>
            ))}
        </div>
    )
}

export default StarDisplay