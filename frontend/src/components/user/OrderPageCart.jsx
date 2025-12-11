import { useContext } from "react"
import {CartContext} from "../../context/cartContext"

const OrderPageCart = () => {
    const [cart, dispatctCart] = useContext(CartContext)
    
    return (
        <div>
            <div>
                {cart.items.map((item, index) => (
                    <div className = "grid grid-cols-[150px_250px]">
                        <div>
                            {console.log(item)}
                            <img src = {item.product.image[0]} alt = "Image1" className = "h-30 w-30" />
                        </div>

                        <div className = "flex flex-col   gap-2">
                            <p className = "line-clamp-2">{item.product.name}</p>
                            <p>Price: {item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Sub-Total: {item.product.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}


export default OrderPageCart