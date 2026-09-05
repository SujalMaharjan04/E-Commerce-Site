import { Link, useNavigate } from "react-router-dom"
import StarDisplay from "../../components/common/StarDisplay"

const ProductPageCard = ({product}) => {
    const navigate = useNavigate()

    return (
        <div className = "bg-[#0F172A] my-4 mx-2 lg:w-full lg:h-[361px] lg:m-2 text-[#F8FAFC] lg:flex lg:justify-start lg:items-center">
            <Link to = {`/products/${product.id}`} className = "block shrink-0">
                <div className = " lg:min-w-[25%] lg:min-h-[85%] lg:p-16 lg:mx-14">
                    {product.image[0] ? <img src = {product.image[0]} loading = 'lazy' className = "w-36 h-36 lg:w-48 lg:h-48 object-contain"  /> : (<div className = "w-36 h-36 lg:w-48 lg:h-48"></div>)}
                </div>
            </Link>

            <div className = "lg:min-w-[50%] lg:flex lg:flex-col lg:justify-start lg:items-start lg:mx-12 my-2">
                <Link to = {`/products/${product.id}`}>
                    <div className="text-sm lg:text-2xl text-justify line-clamp-3 leading-6 min-h-18">
                        {product.name}
                    </div>
                    <div>
                        <StarDisplay rating = {5} />
                    </div>

                    <div className="text-sm font-semibold lg:text-xl lg:font-bold">
                        Rs {product.price}
                    </div>
                </Link>

                <button className = "bg-linear-to-br from-[#3B82F6] to-[#4084f1]  rounded-xl text-sm p-2 lg:p-4 lg:mt-4 lg:text-2xl font-bold hover:cursor-pointer hover:bg-linear-to-br hover:from-[#327df5] hover:to-[#2862be] " onClick = {() => navigate(`/products/${product.id}`)}>Get More Info</button>
            </div>
        </div>
    )
}

export default ProductPageCard