import OrderPageCart from "../../components/user/OrderPageCart"
import { useNavigate } from "react-router-dom"

const Order = () => {
    const navigate = useNavigate()
    return (
        <div className = "text-[#090F13] flex justify-around items-start gap-10">
            <div className = "w-[50%] space-y-4">
                <div>
                    <h2 className = "font-mono text-2xl text-center">Customer Information</h2>
                </div>
                
                <hr className = "w-full border-4 rounded-lg border-white md:mb-10" />

                <div className = " w-full ">
                    <form>
                        <div className = "md:ml-10 md:my-15">
                            <div className = "my-5">
                                <label className = "text-2xl font-mono">First Name: </label>
                                <input type = "text" name = "firstName" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5 ml-7" />
                            </div>

                            <div className = "my-5">
                                <label className = "text-2xl font-mono">Last Name: </label>
                                <input type = "text" name = "lastName" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5 ml-10" />
                            </div>

                            <div className = "my-5">
                                <label className = "text-2xl font-mono">Phone Number: </label>
                                <input type = "tel" name = "phoneNum" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5" />
                            </div>

                            <div className = "my-5">
                                <label className = "text-2xl font-mono">Email: </label>
                                <input type = "email" name = "email" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5 ml-23" />
                            </div>
                        </div>
                        
                        <hr className = "w-full border-4 rounded-lg border-white " />

                        <div className = "md:mt-10">
                            <div>
                                <h2 className = "font-mono text-2xl text-center">Shipping Detail</h2>
                            </div>

                            <div className = "md:ml-10 md:my-5">
                                <label className = "text-2xl font-mono">Location: </label>
                                <input type = "text" name = "address" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5 ml-12" />
                            </div>
                        </div>

                        <div className = "md:ml-10">
                            <h5 className = "text-xl font-medium ">Delivery Method:</h5>

                            <div className = "grid grid-cols-[100px_100px] items-center md:mt-4">
                                <input type = "radio" name = "delivery" /> 
                                <p>Standard</p>
                                <input type = "radio" name = "delivery" />
                                <p>Pick Up</p>
                                <input type = "radio" name = "delivery" />
                                <p>Pick Up</p>
                            </div>
                        </div>

                        <div className = "md:m-10 flex gap-2">
                            <input type = "radio" name = "comfirm" /> 
                            <p>I Comfirm this Order.</p>
                        </div>
                    </form>

                </div>

                

            </div>

            <div className = "w-[25%] space-y-4">
                <div>
                    <h2 className = "font-mono text-2xl text-center">Your Cart</h2>
                </div>

                <hr className = "w-full border-4 rounded-lg border-white" />

                <div className = "min-h-70">
                    <OrderPageCart />
                </div>


                <div>
                    <button onClick = {() => navigate('/cart')} className = "hover:cursor-pointer"><p className = "underline font-bold ">Edit Cart</p></button>
                </div>

                <hr className = "w-full border-4 rounded-lg border-white" />
            </div>
        </div>
    )
}

export default Order