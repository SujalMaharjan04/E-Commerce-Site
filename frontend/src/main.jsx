import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserContextProvider, BrandContextProvider } from './context/adminContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <BrandContextProvider>
        <QueryClientProvider client = {queryClient}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </BrandContextProvider>
    </UserContextProvider>
  </StrictMode>,
)
