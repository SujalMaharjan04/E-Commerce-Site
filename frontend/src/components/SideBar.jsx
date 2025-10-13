import Logo from "../assets/image/SMwhite.png"
import Home from '../assets/icons/Home.svg'
import Icon from '../assets/icons/Icon.svg'
import User from '../assets/icons/User.svg'
import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <div className = "group bg-white flex flex-col lg:w-12 min-h-screen text-[#090F13] font-bold space-y-4 items-center lg:hover:w-48 transition-all duration-500 ease-in-out rounded-full ml-4">
            <img src = {Logo} alt = "Logo" className = "h-16 w-auto"/>
            <Link to = "/admin/dashboard" className="relative flex items-center">
                <img src ={Home} alt = "home" className = "h-8 w-auto"/>
                <span className = "absolute top-2 left-6 opacity-0 group-hover:opacity-100 mx-2 transition-all duration-500 ease-in-out">Home</span> 
            </Link>
            <Link to = "/admin/products" className="relative flex items-center">
                <img src ={Icon} alt = "icon" className = "h-8 w-auto"/>
                <span className = "absolute top-2 left-6 opacity-0 group-hover:opacity-100 mx-2 transition-all duration-500 ease-in-out">Products</span> 
            </Link>
            <Link to = "/admin/orders" className="relative flex items-center">
                <img src ={Icon} alt = "icon" className = "h-8 w-auto"/>
                <span className = "absolute top-2 left-6 opacity-0 group-hover:opacity-100 mx-2 transition-all duration-500 ease-in-out">Orders</span> 
            </Link>
            <Link to = "/admin/users" className="relative flex items-center">
                <img src = {User} alt = "user" className = "h-8 w-auto" />
                <span className = "absolute top-2 left-6 opacity-0 group-hover:opacity-100 mx-2 transition-all duration-500 ease-in-out">Users</span> 
            </Link>

        </div>
    )
}

export default SideBar