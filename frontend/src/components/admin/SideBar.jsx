import Logo from "../../assets/image/SMwhite.png"
import Home from '../../assets/icons/Home.svg'
import Icon from '../../assets/icons/Icon.svg'
import User from '../../assets/icons/User.svg'
import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <div className = " bg-white flex flex-col lg:w-12 min-h-screen text-[#090F13] font-bold space-y-4 items-center rounded-full ml-4">
            <img src = {Logo} alt = "Logo" className = "h-16 w-auto"/>
            <Link to = "/admin/dashboard" className="relative flex items-center">
                <img src ={Home} alt = "home" className = "h-8 w-auto"/>
                
            </Link>
            <Link to = "/admin/products" className="relative flex items-center">
                <img src ={Icon} alt = "icon" className = "h-8 w-auto"/>
            
            </Link>
            <Link to = "/admin/orders" className="relative flex items-center">
                <img src ={Icon} alt = "icon" className = "h-8 w-auto"/>
                
            </Link>
            <Link to = "/admin/users" className="relative flex items-center">
                <img src = {User} alt = "user" className = "h-8 w-auto" />
                
            </Link>

        </div>
    )
}

export default SideBar