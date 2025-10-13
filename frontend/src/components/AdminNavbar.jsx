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
        <div className = "bg-gray flex justify-end items-center text-[#090F13] min-h-14">
            <div className='flex flex-row items-center'>
                <img src = {Calendar} alt = "calendar" className = "h-8 w-auto" />
                <span>{currentDate}</span>
            </div>
            <div className = "grid grid-cols-[auto_auto_auto] justify-center items-center mx-4 text-xs">
                <img src = {User} alt = "user" className = "border border-solid border-2 rounded-full h-8 w-auto row-span-2"/>
                <h2>Name</h2>
                <button className = "row-span-2 border border-solid border-2 rounded-full h-6 w-6 flex justify-center items-center">&darr;</button>
                <h2>Position</h2>
            </div>
        </div>
    )
}

export default AdminNavBar