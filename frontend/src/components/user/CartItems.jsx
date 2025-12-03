import { useContext, useEffect } from 'react'
import {CartContext} from '../../context/cartContext'
import { useQuery } from '@tanstack/react-query'
import cartService from '../../services/cart'

const CartItems = () => {
    const [cart, dispatchCart] = useContext(CartContext)

    const {data: cartItem, isLoading, isError} = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartService.getAllCart(),
    })

    useEffect(() => {
        dispatchCart({
            type: 'SET_CART',
            payload: cartItem
        })
    }, [])

    if (isLoading) return <h1>Loading....</h1>

    if (isError) return <h1>Error Getting the Data</h1>

    if (!cart?.items || cart.items.length === 0) return <h1>Your Cart Is Empty</h1>

    


    return (
        <div>
            {cart?.items.map((item, index) => (
                <div className = "flex ml-30">
                    <img src = {item.image}  />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                    <p>{item.price * item.quantity}</p>
                </div>
            ))}
        </div>
    )
}


export default CartItems