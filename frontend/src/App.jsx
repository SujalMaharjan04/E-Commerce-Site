import UserLayout from "./layout/UserLayout"
import AdminLogin from './page/admin/AdminLogin'
import {Routes, Route, useNavigate} from "react-router-dom"
import { useState } from "react"
import loginService from './services/login'
import AdminLayout from './layout/AdminLayout'
import DashBoard from "./components/DashBoard"
import AdminProducts from './page/admin/AdminProducts'
import AdminOrders from "./page/admin/AdminOrders"
import AdminUsers from "./page/admin/AdminUsers"

const App = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

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