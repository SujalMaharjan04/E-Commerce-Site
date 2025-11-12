import UserLayout from "./layout/UserLayout"
import AdminLayout from './layout/AdminLayout'
import AdminLogin from './page/admin/AdminLogin'
import {Routes, Route, useNavigate, Navigate} from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import loginService from './services/login'
import DashBoard from "./components/admin/DashBoard"
import AdminProducts from './page/admin/AdminProducts'
import AdminOrders from "./page/admin/AdminOrders"
import AdminUsers from "./page/admin/AdminUsers"
import { UserContext} from "./context/adminContext"
import { NotificationContext } from "./context/NotificationContext"
import Home from "./page/user/Home"
import Product from "./services/product"

const App = () => {
  const [user, dispatchUser] = useContext(UserContext)
  const [notification, dispatch] = useContext(NotificationContext)

  useEffect(() => {
    const loggedAppAdmin = window.localStorage.getItem('loggedApp')
    if (loggedAppAdmin) {
      const user = JSON.parse(loggedAppAdmin)
      dispatchUser({type: 'SET_USER', payload: user})
    }
  }, [dispatchUser])

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
        }>
          <Route path = "/" element = {
            <Home />
          } />
          <Route path = "/product" element = {
            <Product />
          } />
        </Route>

        <Route path = "/admin" element = {
          <AdminLogin />
        } />
      
        <Route path = "/admin" element = {
          <AdminLayout />
        }>
          {user && user.role === 'Admin'
          ? <>
            <Route path = "dashboard" element = {<DashBoard />} />
            <Route path = "products" element = {<AdminProducts />}/>
            <Route path = "orders" element = {<AdminOrders />} />
            <Route path = "users" element = {<AdminUsers />} />
          </>
          : <Route to = "*" element = {<Navigate to = "/invalid" replace/>} />}
        </Route>

        <Route path = "/invalid" element = {<h1>Hello</h1>} />
      </Routes>


    </div>
  )
}

export default App