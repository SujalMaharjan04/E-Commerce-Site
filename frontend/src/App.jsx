import UserLayout from "./layout/UserLayout"
import AdminLayout from './layout/AdminLayout'
import AdminLogin from './page/admin/AdminLogin'
import {Routes, Route, useNavigate, Navigate, useMatch} from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import DashBoard from "./components/admin/DashBoard"
import AdminProducts from './page/admin/AdminProducts'
import AdminOrders from "./page/admin/AdminOrders"
import AdminUsers from "./page/admin/AdminUsers"
import { ProductContext, UserContext} from "./context/adminContext"
import Home from "./page/user/Home"
import ProductById from "./page/user/ProductById"
import Cart from "./page/user/Cart"
import Order from './page/user/Order'
import Payment from "./page/user/Payment"
import Product from "./page/user/Product"
import useNotificationStore from "./store/notification.store"


const App = () => {
  const [user, dispatchUser] = useContext(UserContext)
  const notification = useNotificationStore(state => state.notification)

  useEffect(() => {
    const loggedAppAdmin = window.localStorage.getItem('loggedApp')
    if (loggedAppAdmin) {
      const user = JSON.parse(loggedAppAdmin)
      dispatchUser({type: 'SET_USER', payload: user})
    }
  }, [dispatchUser])

  const baseStyle = "fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white font-medium transition-opacity duration-500 z-99";
    const typeStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
    };

  // const setUser = (user) => {
  //   dispatchUser({
  //     type: 'SET_USER',
  //     payload: user
  //   })
  // }

  
 

  return (
    <div>
      {notification && (
        <div className = {`${baseStyle} ${typeStyles[notification.type]}`}>
            {notification.message}
        </div>)
      }
      <Routes>
        <Route path = "/" element = {
          <UserLayout /> 
        }>
          
          <Route path = "/" element = {
            <Home />
          } />
          <Route path = "/products" element = {
            <Product />
          } />
          <Route path = "/products/:id" element = {
            <ProductById />
          } />

          <Route path = "/cart" element = {
            <Cart />
          } />

          {user 
          ? <>
              <Route path = "/order" element = {
                <Order />
              } />

              <Route path = "/payment" element = {
                <Payment />
              } />

              <Route path = "/success" element = {
                <h2>Success</h2>
              } />

              <Route path = "/failed" element = {
                <h2>Failed</h2>
              } />
            </>
          : <Route to = "*" element = {<Navigate to = "/invalid" replace/>} />}
          
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