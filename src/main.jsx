import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login.jsx'
import Header from './components/Header/Header.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import Home from './pages/Home/Home.jsx'
import Principal from './pages/Principal/Principal.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <ChakraProvider>
     <React.StrictMode>
        <BrowserRouter basename='/'>
        <Header/>
           <Routes> 
           <Route path='/' element={<App />} />
           <Route index path='/Home' element={<Home/>} />
            <Route path='/Register' element={<Register/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/Principal' element={<Principal/>} />
          </Routes>
       </BrowserRouter>
     </React.StrictMode>
  </ChakraProvider>
  </AuthProvider>
)
