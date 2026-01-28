import {Link} from 'react-router-dom'
import Logo from '../../assets/image/SMwhite.png'
import Cart from '../../assets/icons/Shopping cart.svg'
import Search from '../../assets/icons/Search.svg'
import User from '../../assets/icons/User.svg'
import { useState, useContext, useEffect } from 'react'
import Togglable from '../common/Togglable'
import { UserContext } from '../../context/adminContext'
import AuthPage from './AuthPage'
import UserCard from '../common/UserCard'

const Navbar = () => {
    const [active, setActive] = useState(false)
    const [view, setView] = useState(false)
    const [user, dispatchUser] = useContext(UserContext) 
    const toggleSearchBar = () => {
        setView(!view)
    }

    useEffect(() => {
        if (active) {  
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }

        return () => {
            document.body.classList.remove("overflow-hidden")
        }
    }, [active])

    return (
        <>
            <div className = "sticky top-0 left-0 z-98 flex flex-row justify-between items-center md:flex md:flex-row md:justify-between md:items-center bg-[#EFEBCE]">
                <div>
                    <Link to = "/"><img src = {Logo} alt = "Logo" className ="h-24 w-auto"/></Link>
                </div>
                <div className = "hidden lg:flex lg:flex-row lg:gap-6 text-[#090F13] lg:text-2xl font-bold">
                    <Link to = "/">Home</Link>
                    <Link to = "/bestSeller">Best Seller</Link>
                    <Link to = "/products">Products</Link>
                    <Link to = "/contact">Contact</Link>
                </div>

                <div className='gap-2 flex flex-row lg:gap-4 lg:mx-4'>
                    {view ? <input type = "text" name = "search" placeholder = "Search" className = "absolute right-32 z-10 bg-white lg:h-8 lg:w-64 lg:rounded-lg lg:px-4 placeholder-[#090F13] placeholder:font-bold text-[#090F13] lg:2xl" /> : ""}
                    <button onClick={toggleSearchBar}><img src = {Search} alt = "search" className = "h-6 w-auto" /> </button>
                    <Link to = "/cart"><img src = {Cart} alt = "cart" className = "h-6 w-auto" /> </Link>
                    {user 
                        ? <div className = "group">
                            <button><img src = {User} alt = "user" className = "hidden md:block md:h-6 md:w-auto" /></button>
                            <UserCard />
                        </div>
                            
                        : <Togglable trigger = {<img src = {User} alt = "user" className = "hidden md:block md:h-6 md:w-auto md:hover:cursor-pointer" />}>
                            <AuthPage />
                        </Togglable>}

                    <button className = "md:hidden flex flex-col gap-1.5 p-2" onClick = {() => setActive(!active)}>
                        <span className = "w-6 h-0.5 bg-black"></span>
                        <span className = "w-6 h-0.5 bg-black"></span>
                        <span className = "w-6 h-0.5 bg-black"></span>
                    </button>
                </div>

                
                <div className={`fixed bg-[#EFEBCE] right-0 top-24 z-99 h-full min-w-50 shadow-lg transform transition-transform duration-300 ease-in-out ${active ? "translate-x-0" : "translate-x-full"}`}>
                    <div className = "text-[#090F13] text-md font-bold flex flex-col justify-evenly items-center gap-10 md:hidden">
                        <Link to = "/">Home</Link>
                        <Link to = "/bestSeller">Best Seller</Link>
                        <Link to = "/products">Products</Link>
                        <Link to = "/contact">Contact</Link>
                    </div>
                </div>

                
            </div>

            {active &&
            <div className = "fixed inset-0 bg-black/50 z-97">

            </div>}
        </>

        
    )
}

export default Navbar