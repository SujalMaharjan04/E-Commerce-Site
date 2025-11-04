import { Link } from "react-router-dom"
import Esewa from "../../assets/icons/image 1.svg"
import Khalti from "../../assets/icons/image 2.svg"
import Facebook from "../../assets/icons/Facebook.svg"
import Instagram from "../../assets/icons/Instagram.svg"

const Footer = () => {
    return (
        <div className = "bg-[#090F13] text-[#EADEDA] text-xs font-bold">
            <div className = "lg:flex lg:flex-row lg:justify-center lg:items-center lg:m-2">
                <div className = "flex flex-col justify-center items-center lg:max-w-64 lg:mx-24">
                        <h2 className = "lg:p-2">Contact</h2>
                        <ul className = "list-style-none lg:p-2 lg:flex lg:flex-col lg:gap-6 ">
                            <li>Company Name</li>
                            <li>Location</li>
                            <li>Phone</li>
                            <li>Email</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium omnis deleniti. Mollitia porro voluptate </li>
                        </ul>
                </div>

                <div className = "flex flex-col justify-center items-center lg:max-w-64 lg:mx-24" >
                        <h2 className = "lg:p-2 lg:-mt-8">Shop</h2>
                        <ul className = "list-style-none lg:p-4 lg:flex lg:flex-col lg:gap-2">
                            <li><Link to = "/laptop">Laptop</Link></li>
                            <li><Link to = "/computer">Computer</Link></li>
                            <li><Link to = "/mobile">Mobile</Link></li>
                            <li><Link to = "/speakers">Speakers</Link></li>
                            <li><Link to = "/headphones">Headphones</Link></li>
                            <li><Link to = "/camera">Camera</Link></li>
                            <li><Link to = "/accessories">Accessories</Link></li>
                        </ul>
                </div>

                <div className = "flex flex-col justify-center items-center lg:max-w-64 lg:mx-24">
                        <h2 className = "lg:p-2 lg:-mt-28">Account</h2>
                        <ul className = "list-style-none lg:p-4 lg:flex lg:flex-col lg:gap-4">
                            <li><Link to = "/login">Login</Link></li>
                            <li><Link to = "/signup">Sign Up</Link></li>
                            <li><Link to = "ordertracking">Order Tracking</Link></li>
                        </ul>
                </div>

                <div className = "lg:flex lg:flex-col lg:justify-center lg:items-center lg:mx-24">
                        <div className = "lg:mb-10 lg:-mt-18 lg:w-full">
                            <h2 className = "lg:my-4">Follow Us</h2>
                            <div className = "lg:flex lg:flex-row lg:gap-4">
                                <a href = "#"><img src = {Facebook} alt = "Facebook" className = "lg:h-8 lg:w-auto"/></a>
                                <a href = "#"><img src = {Instagram} alt = "Instagram" className = "lg:h-8 lg:w-auto"/></a>
                            </div>
                        </div>

                        <div className = "">
                            <h2 className = "lg:my-4">Payment Method</h2>
                            <div className = "lg:flex lg:flex-row lg:gap-4">
                                <a href = "#"><img src = {Esewa} alt = "Esewa" className = "lg:h-8 lg:w-auto"/></a>
                                <a href = "#"><img src = {Khalti} alt = "Khalt" className = "lg:h-8 lg:w-auto"/></a>
                            </div>
                        </div>
                        
                </div>

            </div>

            <div className = "lg:flex lg:flex-row lg:gap-6 lg:justify-center lg:items-center lg:m-2">
                <Link to = "/privacy">Privacy Policy</Link>
                <Link to = "/terms">Terms & Condition</Link>
                <Link to = "/policy">Return Policy</Link>
            </div>
        </div>
    )
}

export default Footer