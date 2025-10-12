import UserLayout from "./layout/UserLayout"
import AdminLogin from './page/AdminLogin'
import {Routes, Route, useNavigate} from "react-router-dom"
import { useState } from "react"
import loginService from './services/login'

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

    if (user.token) {
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

        <Route path = "/admin/dashboard" element = {
          <h1>Hello</h1>
        } />
      </Routes>


    </div>
  )
}

export default App