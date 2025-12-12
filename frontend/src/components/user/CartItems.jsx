import { useContext, useEffect } from 'react'
import {CartContext} from '../../context/cartContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import cartService from '../../services/cart'
import Cross from '../../assets/icons/X-circle.svg'

const CartItems = () => {
    const [cart, dispatchCart] = useContext(CartContext)
    const query = useQueryClient()
    const {data: cartItem, isLoading, isError} = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartService.getAllCart(),
        retry: 1
    })

    const cartDelete = useMutation({
        mutationFn: (productId) => cartService.deleteFromCart(productId),
        onSuccess: (productId) => {
            dispatchCart({
                type: "DELETE_CART",
                payload: productId
            })
            query.invalidateQueries(['cart'])
        }
    })

    useEffect(() => {
        dispatchCart({
            type: "SET_CART",
            payload: cartItem
        })
    }, [cartItem])

    if (isLoading) return <h1>Loading....</h1>

    if (isError) return <h1>Error Getting the Data</h1>

    if (!cart?.items || cart.items.length === 0) return <h1>Your Cart Is Empty</h1>

    
    const cartItemDelete = (productId) => {
        cartDelete.mutateAsync(productId)
    }

    return (
        <div>
            {cart?.items.map((item, index) => (
                <div className = "grid grid-cols-[40px_80px_1fr_100px_100px_120px] items-center gap-4 " key = {index}>
                    <button onClick = {() => cartItemDelete(item.product.id)} className = "hover:cursor-pointer"><img src = {Cross} className = "h-4 w-4" /></button>
                    <img src = {item.product?.image} className = "h-20 w-20" />
                    <p  >{item.product.name}</p>
                    <p>{item.product.price}</p>
                    <p>{item.quantity}</p>
                    <p>{item.product.price * item.quantity}</p>
                </div>
            ))}
        </div>
    )
}


export default CartItems