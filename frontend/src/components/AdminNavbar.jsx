import Calendar from '../assets/icons/Calendar.svg'
import { useEffect, useState } from 'react'
import User from '../assets/icons/User.svg'


const AdminNavBar = () => {
     const [currentDate, setCurrenDate] = useState('')

    useEffect(() => {
        const now = new Date()
        const options = {weekday: 'long', day: 'numeric'}
        setCurrenDate(now.toLocaleDateString('en-IN', options))
    }, [])

    return (
        <div className = "bg-gray flex justify-between items-center text-[#090F13] min-h-14">
            <input type = "name" placeholder = "search" className = "p-4 font-bold  h-8 w-80 bg-white rounded-full ml-4" />
            <div className='flex flex-row justify-end items-center'>
                <img src = {Calendar} alt = "calendar" className = "h-8 w-auto" />
                <span>{currentDate}</span>
                <div className = "flex justify-center items-center mx-4 text-xs">
                    <button><img src = {User} alt = "user" className = "border border-solid border-2 rounded-full h-8 w-auto" /></button>
                </div>
            </div>
            
        </div>
    )
}

export default AdminNavBar