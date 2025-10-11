import {Link} from 'react-router-dom'
import Logo from '../assets/image/SMwhite.png'
import Cart from '../assets/icons/Shopping cart.svg'
import Search from '../assets/icons/Search.svg'
import User from '../assets/icons/User.svg'

const Navbar = () => {
    return (
        <div className = "flex flex-row justify-between items-center bg-[#EFEBCE]">
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
                <Link to = "/cart"><img src = {Search} alt = "search" className = "h-6 w-auto" /> </Link>
                <Link to = "/cart"><img src = {Cart} alt = "cart" className = "h-6 w-auto" /> </Link>
                <Link to = "/cart"><img src = {User} alt = "user" className = "h-6 w-auto" /> </Link>
            </div>
        </div>
    )
}

export default Navbar