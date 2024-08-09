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
import CalendarPage from './pages/CalendarPage/CalendarPage.jsx'
import Background from './components/Background/Background.jsx'
import LoadingProvider from './providers/LoadingProvider.jsx'
import Loading from './components/Loading/Loading.jsx'
import Profile from './pages/Profile/Profile.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
  <ChakraProvider>
  <LoadingProvider>
     <React.StrictMode>
        <BrowserRouter basename='/'>
        <Header/>
        <Background>
          <Loading/>
           <Routes> 
           <Route path='/' element={<App />} />
           <Route path='/Home' element={<Home/>} />
            <Route path='/Register' element={<Register/>} />
            <Route path='/Login' element={<Login/>} />
            <Route path='/Principal' element={<Principal/>} />
            <Route path='/Calendar' element={<CalendarPage/>} />
            <Route path='/Profile' element={<Profile/>}/>
          </Routes>
         </Background>
       </BrowserRouter>
     </React.StrictMode>
  </LoadingProvider>
  </ChakraProvider>
</AuthProvider>
)
