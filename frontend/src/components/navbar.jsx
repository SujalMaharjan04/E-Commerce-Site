import {Link} from 'react-router-dom'
import Logo from '../assets/image/SMwhite.png'
import Cart from '../assets/icons/Shopping cart.svg'
import Search from '../assets/icons/Search.svg'
import User from '../assets/icons/User.svg'
import { useState } from 'react'

const Navbar = () => {
    const [view, setView] = useState(false)
    const toggleSearchBar = () => {
        setView(!view)
    }
    return (
        <div className = "relative flex flex-row justify-between items-center bg-[#EFEBCE]">
            <div>
                <Link to = "/"><img src = {Logo} alt = "Logo" className ="h-24 w-auto"/></Link>
            </div>
            <div className = "lg:flex lg:flex-row lg:gap-6 text-[#090F13] lg:text-2xl font-bold">
                <Link to = "/">Home</Link>
                <Link to = "/bestSeller">Best Seller</Link>
                <Link to = "/product">Products</Link>
                <Link to = "/contact">Contact</Link>
            </div>
            <div className='lg:flex lg:flex-row lg:gap-4 lg:mx-4'>
                {view ? <input type = "text" name = "search" placeholder = "Search" className = "absolute right-32 z-10 bg-white lg:h-8 lg:w-64 lg:rounded-lg lg:px-4 placeholder-[#090F13] placeholder:font-bold text-[#090F13] lg:2xl" /> : ""}
                <button onClick={toggleSearchBar}><img src = {Search} alt = "search" className = "h-6 w-auto" /> </button>
                <Link to = "/cart"><img src = {Cart} alt = "cart" className = "h-6 w-auto" /> </Link>
                <Link to = "/user"><img src = {User} alt = "user" className = "h-6 w-auto" /> </Link>
            </div>
        </div>
    )
}

export default Navbar