import {Link} from 'react-router-dom'
import Logo from '../../assets/image/SMwhite.png'
import Cart from '../../assets/icons/Shopping cart.svg'
// import Search from '../../assets/icons/Search.svg'
// import User from '../../assets/icons/User.svg'
import { useState, useEffect } from 'react'
import Togglable from '../common/Togglable'
import AuthPage from './AuthPage'
import UserCard from '../common/UserCard'
import { useLogout } from '../../hooks/useLogout'
import useAuthStore from '../../store/auth.store'
import { Search } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { User } from 'lucide-react'

const Navbar = () => {
    const [active, setActive] = useState(false)
    const [view, setView] = useState(false)
    const user = useAuthStore(state => state.user)
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const {handleLogout} = useLogout()


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
        // <>
        //     <div className = "sticky top-0 left-0 z-98 flex flex-row justify-between items-center md:flex md:flex-row md:justify-between md:items-center bg-[#0F172A]">
        //         <div>
        //             <Link to = "/"><img src = {Logo} alt = "Logo" className ="h-24 w-auto"/></Link>
        //         </div>
        //         <div className = "hidden lg:flex lg:flex-row lg:gap-6 lg:text-2xl font-bold">
        //             <Link to = "/">Home</Link>
        //             <Link to = "/bestSeller">Best Seller</Link>
        //             <Link to = "/products">Products</Link>
        //             <Link to = "/contact">Contact</Link>
        //         </div>

        //         <div className='gap-2 flex flex-row lg:gap-4 lg:mx-4'>
        //             <input type = "text" className = "bg-white lg:w-full lg:h-8" />
        //             <Link to = "/cart"><img src = {Cart} alt = "cart" className = "h-6 w-auto" /> </Link>
        //             {isAuthenticated
        //                 ? <div className = "group">
        //                     <button><img src = {User} alt = "user" className = "hidden md:block md:h-6 md:w-auto" /></button>
        //                     <UserCard />
        //                 </div>
                            
        //                 : <Togglable trigger = {<img src = {User} alt = "user" className = "hidden md:block md:h-6 md:w-auto md:hover:cursor-pointer" />}>
        //                     <AuthPage />
        //                 </Togglable>}

        //             <button className = "md:hidden flex flex-col gap-1.5 p-2" onClick = {() => setActive(!active)}>
        //                 <span className = "w-6 h-0.5 bg-black"></span>
        //                 <span className = "w-6 h-0.5 bg-black"></span>
        //                 <span className = "w-6 h-0.5 bg-black"></span>
        //             </button>
        //         </div>

                
        //         <div className={`fixed bg-[#0F172A] right-0 top-24 z-99 h-full min-w-50 shadow-lg transform transition-transform duration-300 ease-in-out ${active ? "translate-x-0" : "translate-x-full"}`}>
        //             <div className = "text-[#090F13] text-md font-bold flex flex-col justify-evenly items-center gap-10 md:hidden">
        //                 <Link to = "/">Home</Link>
        //                 <Link to = "/bestSeller">Best Seller</Link>
        //                 <Link to = "/products">Products</Link>
        //                 <Link to = "/contact">Contact</Link>
        //                 {isAuthenticated
        //                 ? <div>
        //                         <p>{user.username} logged in</p>
        //                         <button type = "button" onClick = {handleLogout} className = "border-solid border-2 bg-red-500 text-[#090F13] rounded-xl w-32 mt-4 ">Log Out</button>
        //                     </div>
        //                 : <Togglable trigger = {<img src = {User} alt = "user" className = "h-4 w-auto md:h-6 md:w-auto md:hover:cursor-pointer" />} triggerLabel = "Log In">
        //                     <AuthPage />
        //                 </Togglable>
        //                 }
        //             </div>
        //         </div>

                
        //     </div>

        //     {active &&
        //     <div className = "fixed inset-0 bg-black/50 z-97">

        //     </div>}
        // </>
        <>
        <div className = "sticky z-50 top-0 left-0 bg-[#0F172A] flex items-center justify-between">
            <div className='px-4 lg:px-8'>
                <Link to = "/"><img src = {Logo} className='w-20 lg:w-24 h-auto' /></Link>
            </div>

            <div className = "hidden lg:flex lg:justify-center lg:items-center lg:gap-12 lg:p-4 text-xl">
                <Link to = "/">Home</Link>
                <Link to = "/best">Best Seller</Link>
                <Link to = "/categories">Categories</Link>
                <Link to = "/contact-us">Contact Us</Link>
            </div>

            <div className='relative flex-1 w-full lg:flex-none lg:w-[20%]'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-950' />
                <input type = "text" className = "bg-white h-12 rounded-lg w-full pl-10 placeholder:text-black" placeholder = "Search Here" />
            </div>

            <div className = "flex justify-between items-center gap-6 px-2 lg:px-8">
                <Link to = "/cart"><ShoppingCart className='hidden lg:block text-slate-100 lg:h-8 lg:w-8' /></Link>
                {isAuthenticated
                ? <Link to = "/profile"><User className = "hidden text-slate-100 lg:h-8 lg:w-8" /></Link>
                : <Togglable trigger = {<User className = "text-slate-100 lg:h-8 w-8 hidden md:block md:h-6 md:w-auto md:hover:cursor-pointer" />}>
                        <AuthPage />
                    </Togglable>}
                
                <button className = "md:hidden flex flex-col  gap-1.5 p-2" onClick = {() => setActive(!active)}>
                    <span className='w-6 h-0.5 bg-[#F8FAFC]'></span>
                    <span className='w-6 h-0.5 bg-[#F8FAFC]'></span>
                    <span className='w-6 h-0.5 bg-[#F8FAFC]'></span>
                </button>
            </div>
        </div>
        </>

        
    )
}

export default Navbar