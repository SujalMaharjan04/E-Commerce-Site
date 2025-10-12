import SideBar from '../components/SideBar'
import Calendar from '../assets/icons/Calendar.svg'
import { useEffect, useState } from 'react'

const DashBoard = () => {
    const [currentDate, setCurrenDate] = useState('')

    useEffect(() => {
        const now = new Date()
        const options = {weekday: 'long', day: 'numeric'}
        setCurrenDate(now.toLocaleDateString('en-IN', options))
    }, [])

    return (
        <div className = "flex flex-row">
            <SideBar />
            <div className = "flex-1">
                <div className = "bg-[#EFEBCE] flex justify-end items-center text-[#090F13]">
                    <div className='flex flex-row items-center'>
                        <img src = {Calendar} alt = "calendar" className = "h-8 w-auto" />
                        <span className = "">{currentDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DashBoard