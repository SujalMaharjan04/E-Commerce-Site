import {Link} from 'react-router-dom'
import Logo from '../../assets/image/SMwhite.png'
import { useState, useEffect } from 'react'
import Togglable from '../common/Togglable'
import AuthPage from './AuthPage'
import UserCard from '../common/UserCard'
import useAuthStore from '../../store/auth.store'
import { Search } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { User } from 'lucide-react'

const Navbar = () => {
    const [active, setActive] = useState(false)
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)


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
            {/* PC View NavBar */}
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
                    <input type = "text" className = "bg-white h-12 rounded-lg w-full pl-10 placeholder:text-black text-black" placeholder = "Search Here" />
                </div>

                <div className = "flex justify-between items-center gap-6 px-2 lg:px-8">
                    <Link to = "/cart"><ShoppingCart className='hidden lg:block text-slate-100 lg:h-8 lg:w-8' /></Link>
                    {isAuthenticated
                    ? <div className = "group">
                            <button><User className = "hidden lg:block text-slate-100 w-8 h-8" /></button>
                            <UserCard />
                    </div> 
                    : <Togglable trigger = {<User className = "text-slate-100 lg:h-8 lg:w-8 hidden lg:block hover:cursor-pointer" />}>
                            <AuthPage />
                        </Togglable>}
                    
                    <button className = "md:hidden flex flex-col  gap-1.5 p-2" onClick = {() => setActive(!active)}>
                        <span className='w-6 h-0.5 bg-[#F8FAFC]'></span>
                        <span className='w-6 h-0.5 bg-[#F8FAFC]'></span>
                        <span className='w-6 h-0.5 bg-[#F8FAFC]'></span>
                    </button>
                </div>
                
                {/* Mobile View Section burger menu  */}
                <div className = {`fixed right-0 top-18 bg-[#1E293B] h-full max-w-50 shadow-lg transform transition-transform duration-300 ease-in-out ${active ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className = "md:hidden flex flex-col justify-evenly items-center gap-8 p-4">
                        <Link to = "/">Home</Link>
                        <Link to = "/best">Best Seller</Link>
                        <Link to = "/categories">Categories</Link>
                        <Link to = "/contact-us">Contact Us</Link>

                        <div>
                            <Link to = "/cart">
                                <div className = "flex justify-center items-center gap-2">
                                    <ShoppingCart className = "text-slate-100 h-4 w-4"/>My Cart
                                </div>
                            </Link>

                            {isAuthenticated
                                ? <Link to = "/profile">
                                    <div className = "flex justify-center items-center gap-2 px-6 py-2 my-6">
                                        <User className = "text-slate-100 w-4 h-4" />View Profile
                                    </div>
                                </Link>
                                :  <div className = "flex justify-center items-center">
                                        <Togglable trigger = {<button type = "button" className = "bg-green-600 rounded-lg w-full px-4 py-2 mt-6 shadow hover:bg-green-700 hover:cursor-pointer">Log In</button>}>
                                            <AuthPage />
                                        </Togglable>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar