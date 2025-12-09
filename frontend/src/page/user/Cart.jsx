import CartItems from '../../components/user/CartItems'
import CartIcon from '../../assets/icons/image3.svg'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
    const navigate = useNavigate()
    return (
        <div className = "text-[#090F13] relative flex justify-around items-start gap-10">
            <div className = "w-[50%] space-y-4 flex flex-col">
                <div>
                    <h2 className = "font-mono text-2xl text-center">Shopping Cart</h2>
                </div>
                
                <hr className = "w-full border-4 rounded-lg border-white" />

                <div className = "grid grid-cols-[40px_80px_1fr_100px_100px_120px] items-center gap-4 py-2">
                    <h3></h3>
                    <h3></h3>
                    <h3>Product</h3>
                    <h3>Price</h3>
                    <h3>Quantity</h3>
                    <h3>Sub-Total</h3>
                </div>

                <hr className = "w-full border-4 rounded-lg border-white" />

                <div className = "min-h-64">
                    <CartItems />
                </div>

                <hr className = "w-full border-4 rounded-lg border-white" />

                <div className = "flex justify-end items-center mt-8">
                    <button className = "bg-[#E09F75] w-60 rounded-lg h-14 flex items-center justify-center gap-8 hover:cursor-pointer">
                        <img src = {CartIcon} alt = "cart Icon" className = "h-8 w-8" />
                        <h2 className = "font-medium text-xl">Update Cart</h2>
                    </button>
                </div>


            </div>

            {/* <hr className = "fixed top-[50%] left-[62%] rotate-90 border-4 rounded-lg border-white w-[50%] -translate-x-1/2 -translate-y-1/2" /> */}

            <div className = "w-[25%] space-y-4">
                <div>
                    <h2 className = "font-mono text-2xl text-center">Cart Tools</h2>
                </div>
                
                <hr className = "w-full border-4 rounded-lg border-white" />

                <div className = "flex justify-between items-center py-2">
                    <h3>Sub-Total</h3>
                    <h3>Rs 3,99,999</h3>
                </div>

                <hr className = "w-full border-4 rounded-lg border-white" />

                <div className = "grid grid-cols-2 gap-5 my-10">
                    <h3 className = "row-span-3">Shipping</h3>
                    <div className = "flex items-center gap-2">
                        Free Shipping <input type = "radio" />
                    </div>
                    <div className = "flex items-center gap-2">
                        Free Shipping <input type = "radio" />
                    </div>
                    <div className = "flex items-center gap-2">
                        Free Shipping <input type = "radio" />
                    </div>
                </div>

                <hr className = "w-full border-4 rounded-lg border-white" />

                <div className = "flex justify-between items-center py-2">
                    <h3>Total</h3>
                    <h3>Rs 3,99,999</h3>
                </div>

                <div className = "flex justify-center items-center mt-10">
                    <button className = "bg-[#E09F75] w-full h-10 rounded-lg font-bold text-xl hover:cursor-pointer" onClick = {() => navigate("/order")}>Proceed To Checkout</button>
                </div>


            </div>

        </div>
    )
}

export default Cart