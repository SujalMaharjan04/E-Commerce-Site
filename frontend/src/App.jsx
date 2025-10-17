import UserLayout from "./layout/UserLayout"
import AdminLogin from './page/admin/AdminLogin'
import {Routes, Route, useNavigate} from "react-router-dom"
import { useContext, useState } from "react"
import loginService from './services/login'
import AdminLayout from './layout/AdminLayout'
import DashBoard from "./components/DashBoard"
import AdminProducts from './page/admin/AdminProducts'
import AdminOrders from "./page/admin/AdminOrders"
import AdminUsers from "./page/admin/AdminUsers"
import { UserContext} from "./context/adminContext"
import { NotificationContext } from "./context/NotificationContext"

const App = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, dispatchUser] = useContext(UserContext)
  const [notification, dispatch] = useContext(NotificationContext)

   const baseStyle = "fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white font-medium transition-opacity duration-500";
    const typeStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
    };

  const setUser = (user) => {
    dispatchUser({
      type: 'SET_USER',
      payload: user
    })
  }

  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
    if (!username || !password) {
        console.log('Username and Password Required')
    }
    const user = await loginService.login({username, password})
    window.localStorage.setItem(
        'loggedAppAdmin', JSON.stringify(user)
    )
    setUser(user)
    setUsername("")
    setPassword("")

    if (user.token && user.role === 'Admin') {
      navigate('/admin/dashboard')
    } else {
      alert('Invalid Credentials')
    }
    }
    catch {

    }
  }


  return (
    <div>
      {notification && (
        <div className = {`${baseStyle} ${typeStyles[notification.type]}`}>
            {notification.text}
        </div>)
      }
      <Routes>
        <Route path = "/" element = {
          <UserLayout /> 
        } />

        <Route path = "/admin" element = {
          <AdminLogin username = {username} password = {password} handleUserChange = {handleUserChange} handlePasswordChange = {handlePasswordChange} handleLogin = {handleLogin}/>
        } />
      
        <Route path = "/admin" element = {
          <AdminLayout />
        }>
          <Route path = "dashboard" element = {<DashBoard />} />
          <Route path = "products" element = {<AdminProducts />}/>
          <Route path = "orders" element = {<AdminOrders />} />
          <Route path = "users" element = {<AdminUsers />} />
        </Route>
      </Routes>


    </div>
  )
}

export default App