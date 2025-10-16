import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserContextProvider, BrandContextProvider, CategoryContextProvider } from './context/adminContext.jsx'
import {NotificationContextProvider } from './context/NotificationContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationContextProvider>
      <UserContextProvider>
        <BrandContextProvider>
        <CategoryContextProvider>
            <QueryClientProvider client = {queryClient}>
              <Router>
                <App />
              </Router>
            </QueryClientProvider>
          </CategoryContextProvider>
        </BrandContextProvider>
      </UserContextProvider>
    </NotificationContextProvider>
  </StrictMode>,
)
