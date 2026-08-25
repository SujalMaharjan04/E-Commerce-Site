import Logo from "../../assets/image/SMwhite.png"
// import Home from '../../assets/icons/Home.svg'
import { Home } from "lucide-react"
// import Icon from '../../assets/icons/Icon.svg'
import { Icon } from "lucide-react"
import { User } from "lucide-react"
// import User from '../../assets/icons/User.svg'
import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <div className = " bg-white flex flex-col lg:w-12 min-h-screen text-[#090F13] font-bold space-y-4 items-center rounded-full ml-4">
            <img src = {Logo} alt = "Logo" className = "h-16 w-auto"/>
            <Link to = "/admin/dashboard" className="relative flex items-center">
                <Home className = "text-slate-100 w-auto h-8" />                
            </Link>
            <Link to = "/admin/products" className="relative flex items-center">
                <Icon className = "text-slate-100 w-auto h-8" />            
            </Link>
            <Link to = "/admin/orders" className="relative flex items-center">
                <Icon className = "text-slate-100 w-auto h-8" />                
            </Link>
            <Link to = "/admin/users" className="relative flex items-center">
                <User className="text-slate-100 w-auto h-8" />                
            </Link>

        </div>
    )
}

export default SideBar