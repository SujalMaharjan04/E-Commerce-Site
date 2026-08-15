import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReviewContextProvider } from './context/reviewContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
          <ReviewContextProvider>
                      <QueryClientProvider client = {queryClient}>
                        <Router>
                          <App />
                        </Router>
                      </QueryClientProvider>
          </ReviewContextProvider>
  </StrictMode>,
)
