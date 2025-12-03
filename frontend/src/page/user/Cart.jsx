import CartItems from '../../components/user/CartItems'
const Cart = () => {


    return (
        <div className = "text-[#090F13] relative flex justify-around items-center gap-4">
            <div className = "w-[50%] space-y-4">
                <div>
                    <h2 className = "font-mono text-2xl text-center">Shopping Cart</h2>
                </div>
                
                <hr className = "w-full border-4 rounded-lg border-white" />

                <div className = "flex justify-end items-center py-2">
                    <h3></h3>
                    <h3 className = "ml-30">Product</h3>
                    <h3 className = "ml-30">Price</h3>
                    <h3 className = "ml-30">Quantity</h3>
                    <h3 className = "ml-30">Sub-Total</h3>
                </div>

                <hr className = "w-full border-4 rounded-lg border-white" />

                <CartItems />


            </div>

            <hr className = "fixed top-[35%] left-[50%] rotate-90 border-4 rounded-lg border-white w-[25%]" />

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

            </div>

        </div>
    )
}

export default Cart