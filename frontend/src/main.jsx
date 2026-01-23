import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserContextProvider, BrandContextProvider, CategoryContextProvider, ProductContextProvider, UsersContext, UsersContextProvider } from './context/adminContext.jsx'
import {NotificationContextProvider } from './context/NotificationContext.jsx'
import {CartContextProvider} from './context/cartContext.jsx'
import { OrderContextProvider } from './context/orderContext.jsx'
import { ReviewContextProvider } from './context/reviewContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationContextProvider>
      <UsersContextProvider>      
        <UserContextProvider>
          <ReviewContextProvider>
            <ProductContextProvider>
              <BrandContextProvider>
                <CategoryContextProvider>
                  <CartContextProvider>
                    <OrderContextProvider>
                      <QueryClientProvider client = {queryClient}>
                        <Router>
                          <App />
                        </Router>
                      </QueryClientProvider>
                    </OrderContextProvider>
                  </CartContextProvider>
                </CategoryContextProvider>
              </BrandContextProvider>
            </ProductContextProvider>
          </ReviewContextProvider>
        </UserContextProvider>
      </UsersContextProvider>
    </NotificationContextProvider>
  </StrictMode>,
)
