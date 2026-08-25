import Cross from '../../assets/icons/X-circle.svg'
import { useCarts, useDeleteFromCart } from '../../hooks/useCart'
import useNotificationStore from '../../store/notification.store'

const CartItems = () => {
    const {data: cartItem, isLoading, isError} = useCarts()
    const cartDelete = useDeleteFromCart()
    const notify = useNotificationStore()

    if (isLoading) return <h1>Loading....</h1>

    if (isError) return <h1>Error Getting the Data</h1>

    if (!cartItem || cartItem.items.length === 0) return <h1>Your Cart Is Empty</h1>

    
    const cartItemDelete = (productId) => {
        cartDelete.mutateAsync(productId, {
            onSuccess: () => {
                notify("Cart Item deleted Successfully", "success")
            }
        })
    }
    return (
        <div>
            {cartItem?.items.map((item, index) => (
                <div className = "grid grid-cols-[40px_80px_1fr_100px_100px_120px] items-center gap-4 " key = {index}>
                    <button onClick = {() => cartItemDelete(item.product.id)} className = "hover:cursor-pointer"><img src = {Cross} className = "h-4 w-4" /></button>
                    <img src = {item.product?.image} className = "h-20 w-20" loading = "lazy" />
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