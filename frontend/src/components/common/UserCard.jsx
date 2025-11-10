import User from '../../assets/icons/User.svg'
import { useLogout } from '../../hooks/useLogout'

const UserCard = () => {
  const {handleLogout} = useLogout()
  return (
    <div className="fixed top-12 right-8 z-30 border border-solid border-2 flex flex-col items-center justify-between h-48 w-48 bg-white hidden group-hover:flex rounded-xl shadow-lg">
      <div className="grid grid-cols-2 gap-2 p-4 text-center">
        <div className="border border-solid border-2 rounded-full row-span-2 p-4 flex justify-center items-center">
          <img src={User} alt="user" className="w-10 h-10" />
        </div>
        <p className="font-semibold">Name</p>
        <p className="text-gray-600 text-sm">Position</p>
      </div>

      <button onClick={handleLogout} className="w-32 py-1 mb-3 border border-solid border-2 border-black bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
        Log Out
      </button>
    </div>
  )
}

export default UserCard
