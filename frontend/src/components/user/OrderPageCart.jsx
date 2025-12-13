import { useContext, useEffect, useState } from "react"
import {CartContext} from "../../context/cartContext"

const OrderPageCart = ({getTotal}) => {
    const [cart, dispatctCart] = useContext(CartContext)
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        if (!cart?.items) return

        const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

        setSubTotal(total)
        
    }, [cart])

    useEffect(() => {
        getTotal(subTotal)
    }, [subTotal])
    
    return (
        <div>
            <div>
                {cart.items.map((item, index) => (
                    <div className = "grid grid-cols-[150px_250px]" key = {index}>
                        <div>
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