import {Star} from 'lucide-react'
const ProductCard = ({product}) => {
    const maxStar = 5
    return (
        <div className = "flex flex-col w-full px-4 shadow-xl/50 mb-10 ">
            <div className = "flex justify-center">
                <img src = {product.image[0]} alt = "laptop" className = "h-60 w-auto" />
            </div>
            <div className = "text-[#090F13] mx-4">
                <p>{product.name}</p>
                {/* <p>Apple 2025 MacBook Air 13-inch Laptop with M4 chip: Built for Apple Intelligence, 13.6-inch Liquid Retina Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID; Sky Blue</p> */}
            </div>

            <div className = "flex items-center mt-5 ml-4">
                {Array.from({length: maxStar}, (_, i) => {
                    <Star key = {i} size = {20} className = {i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                })}
            </div>

            <div className = "text-[#090F13] mx-4">
                {product.price}{/* Rs 3,99,999.00 */}
            </div>

            <div className = "flex justify-center items-center">
                <button className = " border-solid border-2 bg-[#E09F75] w-[70%] rounded-xl my-5 h-8 hover:bg-[#DF8E64]">Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductCard