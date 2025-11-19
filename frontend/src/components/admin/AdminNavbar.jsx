import Calendar from '../../assets/icons/Calendar.svg'
import { useContext, useEffect, useState } from 'react'
import User from '../../assets/icons/User.svg'
import UserCard from '../common/UserCard'
import { UserContext } from '../../context/adminContext'
import { NotificationContext } from '../../context/NotificationContext'
import { useNavigate } from 'react-router-dom'


const AdminNavBar = () => {
     const [currentDate, setCurrenDate] = useState('')
     const [user, dispatchUser] = useContext(UserContext)
     const [notification, dispatch] = useContext(NotificationContext)
     const navigate = useNavigate()

    useEffect(() => {
        const now = new Date()
        const options = {weekday: 'long', day: 'numeric'}
        setCurrenDate(now.toLocaleDateString('en-IN', options))
    }, [])

    

    return (
        <div className = "bg-gray flex justify-between items-center text-[#090F13] min-h-14">
            <input type = "name" placeholder = "search" className = "p-4 font-bold  h-8 w-80 bg-white rounded-full ml-4" />
            <div className='relative flex flex-row justify-end items-center mr-8'>
                <img src = {Calendar} alt = "calendar" className = "h-8 w-auto" />
                <span>{currentDate}</span>
                <div className = "group">
                    <button><img src = {User} alt = "user" className = "  border-solid border-2 rounded-full h-8 w-auto m-4" /></button>
                    <UserCard/>
                </div>
            </div>
            
        </div>
    )
}

export default AdminNavBar