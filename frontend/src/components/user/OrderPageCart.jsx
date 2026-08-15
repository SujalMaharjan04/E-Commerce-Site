import { useEffect, useState } from "react"
import { useCarts } from "../../hooks/useCart"

const OrderPageCart = ({getTotal}) => {
    const {data: cartItem, isLoading: cartItemLoading, isError: cartItemError} = useCarts()
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        if (!cartItem) return

        const total = cartItem.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

        setSubTotal(total)
        
    }, [cartItem])

    useEffect(() => {
        getTotal(subTotal)
    }, [subTotal, getTotal])

    if (cartItemLoading) return <div>Loading...</div>
    if (cartItemError) return <div>Error</div>
    
    return (
        <div>
            <div>
                {cartItem.items.map((item, index) => (
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