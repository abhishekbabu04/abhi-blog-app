import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
   
    <BrowserRouter>
    <Toaster/>
    <AuthProvider>
          <App />
    </AuthProvider>
    </BrowserRouter>
   
)
