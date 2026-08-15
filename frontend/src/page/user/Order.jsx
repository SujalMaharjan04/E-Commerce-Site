import { useState, useEffect} from "react"
import OrderPageCart from "../../components/user/OrderPageCart"
import { useNavigate, useLocation } from "react-router-dom"
import { useUserAddr } from "../../hooks/useUser"
import { useOrderStore } from "../../store/order.store"

const Order = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [total, setTotal] = useState(0)
    const order = useOrderStore(state => state.order)
    const setCustomerInfo = useOrderStore(state => state.setCustomerInfo)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName:  "",
        phone: "",
        email: "",
        address: "",
        deliveryMethod: "", 
        comfirmed: false
    })
    const {data, isLoading, isError} = useUserAddr()

    const {canProceed} = location.state || {}
    useEffect(() => {
        if (!canProceed) {
            navigate('/cart')
        }
    }, [canProceed])

    useEffect(() => {
        //check if any value of the order has empty
        console.log(order)
        const hasOrderForm = Object.values(order).some(value => value !== "" && value !== null && value !== undefined)
        if (hasOrderForm) {
            setFormData({
                firstName: order.name?.split(' ')[0] || "",
                lastName: order.name?.split(' ').slice(1).join(' ') || "",
                phone: order.phone || "",
                email: order.email || "",
                address: order.address || "",
                deliveryMethod: order.deliveryMethod,
                comfirmed: false
            })
        } else if (data) {
            const parts = data.name.trim().split(/\s+/)

            setFormData({
                firstName: parts[0] || "",
                lastName: parts.slice(1).join(" ") || "",
                phone: data.phone || "",
                email: data.email || "",
                address: data.address && data.address.length > 0 ? `${data.address[0].street}, ${data.address[0].zip} ${data.address[0].state}, ${data.address[0].city}, ${data.address[0].country}` : "",
                deliveryMethod: "Standard",
                comfirmed: false
            })
        }
    }, [data, order])

    const handleChange = (e) => {
        const {name,type, checked, value} = e.target

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }
    
    const handleNext = () => {

        setCustomerInfo({...formData, name: `${formData.firstName} ${formData.lastName}`})

        navigate('/payment', {
            state: {canProceed: true}
        })
    }

    const getTotal = (subTotal) => {
        setTotal(subTotal)
    }

    if (isLoading) return <div>Loading....</div>
    if (isError) return <div>Error</div>

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
                                <input type = "text" name = "firstName" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5 ml-7" value = {formData.firstName} onChange = {handleChange} required />
                            </div>

                            <div className = "my-5">
                                <label className = "text-2xl font-mono">Last Name: </label>
                                <input type = "text" name = "lastName" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5 ml-10" value = {formData.lastName} onChange = {handleChange} required  />
                            </div>

                            <div className = "my-5">
                                <label className = "text-2xl font-mono">Phone Number: </label>
                                <input type = "tel" name = "phone" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5" value = {formData.phone} onChange = {handleChange} required  />
                            </div>

                            <div className = "my-5">
                                <label className = "text-2xl font-mono">Email: </label>
                                <input type = "email" name = "email" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5 ml-23" value = {formData.email} onChange = {handleChange} required  />
                            </div>
                        </div>
                        
                        <hr className = "w-full border-4 rounded-lg border-white " />

                        <div className = "md:mt-10">
                            <div>
                                <h2 className = "font-mono text-2xl text-center">Shipping Detail</h2>
                            </div>

                            <div className = "md:ml-10 md:my-5">
                                <label className = "text-2xl font-mono">Location: </label>
                                <input type = "text" name = "address" className = "border-2 h-10 w-[70%] rounded-lg bg-gray-200 p-5 ml-12" value = {formData.address} onChange = {handleChange} required  />
                            </div>
                        </div>

                        <div className = "md:ml-10">
                            <h5 className = "text-xl font-medium ">Delivery Method:</h5>

                            <div className = "grid grid-cols-[100px_100px] items-center md:mt-4">
                                <input type = "radio" name = "deliveryMethod" value = "Standard" checked = {formData.deliveryMethod === "Standard"} onChange = {handleChange} required  /> 
                                <p>Standard</p>
                                <input type = "radio" name = "deliveryMethod" value = "Fast" checked = {formData.deliveryMethod === "Fast"} onChange = {handleChange} required  />
                                <p>Fast</p>
                            </div>
                        </div>

                        <div className = "md:m-10 flex gap-2">
                            <input type = "checkbox" name = "comfirmed" checked = {formData.comfirmed} onChange = {handleChange} required  /> 
                            <p>I Comfirm this Order.</p>
                        </div>

                        <div className = "flex justify-end items-center">
                            <button type = "button" disabled = {!formData.comfirmed} className = "w-[40%] h-10 disabled:bg-gray-500 disabled:cursor-not-allowed bg-[#E09F75] hover:cursor-pointer rounded-lg font-bold text-xl" onClick = {() => {
                                handleNext()
                            }}>Continue to Payment</button>
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
                    <OrderPageCart getTotal = {getTotal} />
                </div>


                <div>
                    <button onClick = {() => navigate('/cart')} className = "hover:cursor-pointer"><p className = "underline font-bold ">Edit Cart</p></button>
                </div>

                <hr className = "w-full border-4 rounded-lg border-white" />


                <div className = "space-y-4 md:mt-10">
                    <div>
                        <h2 className = "font-mono text-2xl text-center">Order Summary</h2>
                    </div>
                    <div className = "grid grid-cols-2 gap-10 md:mt-10 font-bold">
                        <p>Sub-Total: </p>
                        <p>{total}</p>
                        <p>Shipping Cost: </p>
                        <p>120</p>
                        <p>Taxes: </p>
                        <p>0</p>
                        <p>Total: </p>
                        <p>{total + 120 + 0}</p>

                    </div>
                </div>
                <hr className = "w-full border-4 rounded-lg border-white" />
            </div>
        </div>
    )
}

export default Order