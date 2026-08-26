import { User } from 'lucide-react'
import { useLogout } from '../../hooks/useLogout'
import { UserCog, ShoppingBag, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

const UserCard = () => {
  const {handleLogout} = useLogout()
  return (
      <div className = "bg-[#1E293B] absolute top-18 right-4 min-w-64 min-h-64 rounded-lg  hidden group-hover:flex flex-col justify-evenly items-center before:bg-[#1E293B] before:absolute before:w-10 before:h-10 before:-top-1 before:right-2 before:rotate-45">
        <div className = "relative m-4 after:absolute after:w-16 after:h-16 after:border-2 after:rounded-full after:inset-0 after:-translate-x-2 after:-translate-y-2">
          <User className = "text-slate-100 w-12 h-12 " />
        </div>

        <div className = "flex flex-col justify-center items-start gap-2">

          <Link to = "/profile">
            <div className = "flex justify-center items-center gap-4">
              <UserCog className = "text-slate-100 w-6 h-6" />
              <p>View Profile</p>
            </div>
          </Link> 

          <Link to = "/your-order">
            <div className = "flex justify-center items-center gap-4">
              <ShoppingBag className = "text-slate-100 w-6 h-6" />
              <p>View Your Order</p>
            </div>
          </Link>
        </div>

        <button type = "button" onClick={handleLogout} className = "bg-linear-to-br from-red-600 to-red-400 rounded-xl p-2 flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-linear-to-br hover:from-red-700 hover:to-red-500" >
          <LogOut className = "text-slate-100 w-4 h-4" />Log Out
          </button>
      </div>
  )
}

export default UserCard
