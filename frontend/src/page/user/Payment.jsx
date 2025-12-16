import { useContext, useState, useEffect } from "react"
import { OrderContext } from "../../context/orderContext"
import Esewa from '../../assets/icons/image 1.svg'
import Khalti from '../../assets/icons/image 2.svg'
import { useLocation, useNavigate } from "react-router-dom"



const Payment = () => {
    const [orderForm, dispatchOrderForm] = useContext(OrderContext)
    const [paymentMethod, setPaymentMethod] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const {canProceed} = location.state || {}

    useEffect(() => {
        if (!canProceed) {
            navigate('/cart')
        }
    },  [canProceed])

    const handleChange = (e) => {
        setPaymentMethod(e.target.value)
        dispatchOrderForm({
            type: "SET_PAYMENT_METHOD",
            payload: e.target.value
        })
    }

    

    return (
        <div>
            <div className = "flex justify-around items-start gap-10">
                <div className = "w-[50%] space-y-4">
                    <div>
                        <h2 className = "font-mono text-2xl text-center">Payment</h2>
                    </div>

                    <hr className = "w-full border-4 rounded-lg border-white" />

                    <div className = "w-full space-y-4 ">
                        <div>
                            <h2 className = "font-mono text-xl text-center">Payment Method</h2>
                        </div>

                        <div className = "bg-[#BFC7E2] w-full md:h-80 rounded-lg md:p-20 ">

                            <form id = "orderForm">
                                <div className = "flex justify-around items-center gap-12">
                                    <input type = "radio" name = "paymentMethod" value = "Esewa" className="w-5 h-5" checked = {orderForm.paymentMethod === 'Esewa'} onChange = {handleChange} />
                                    <p className = "font-mono text-2xl">Esewa</p>
                                    <img src = {Esewa} alt = "Esewa Logo" className = "w-10 h-10" />
                                </div>
                                <div className = "flex justify-around items-center gap-12" >
                                    <input type = "radio" name = "paymentMethod" value = "Khalti" className="w-5 h-5" checked = {orderForm.paymentMethod === 'Khalti'} onChange = {handleChange} />
                                    <p className = "font-mono text-2xl">Khalti</p>
                                    <img src = {Khalti} alt = "Khalti Logo" className = "w-10 h-10" />
                                </div>
                                <div className = "flex justify-around items-center gap-2">
                                    <input type = "radio" name = "paymentMethod" value = "COD" className="w-5 h-5" checked = {orderForm.paymentMethod === 'COD'} onChange = {handleChange} />
                                    <p className = "font-mono text-2xl">Cash On Delivery</p>
                                    <p></p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr className = "w-full border-4 rounded-lg border-white mt-10" />
                </div>

                <div className = "w-[40%] space-y-4">
                    <div>
                        <h2 className = "font-mono text-2xl text-center">Hello</h2>
                    </div>

                    <hr className = "w-full border-4 rounded-lg border-white" />

                    <div className="space-y-4 w-full">
                        <div>
                            <h2 className="font-mono text-xl text-center">Your Order</h2>
                        </div>

                        <div className = "w-full h-80 bg-[#BFC7E2]">
                            <div className="flex flex-col justify-evenly items-start w-[50%] md:ml-10 text-[#090F13]">
                                {orderForm.items.map((item, index) => (
                                    <div className="flex justify-center items-center my-4 gap-2" key = {index}>
                                        <p className = "line-clamp-2">{item.product.name.split(":")[0]}, {item.selectedSpecs.colors}</p>
                                        <p className = "font-bold">&times;</p>
                                        <p>{item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center items-center md:mt-30">
                                <hr className = "w-[90%] border-2 rounded-lg border-white" />
                            </div>

                            <div className="flex justify-center items-center gap-60 mt-10 text-[#090F13] font-bold">
                                <h2>Total: </h2>
                                <p>Rs {orderForm.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)}</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className = "flex justify-center items-center mt-20">
                <button disabled = {!paymentMethod} type = "submit" form = "orderForm" className = "w-[90%] h-10 font-bold bg-[#E09F75] rounded-lg text-2xl hover:cursor-pointer disabled:bg-gray-500">Place An Order</button>
            </div>
        </div>
    )
}

export default Payment