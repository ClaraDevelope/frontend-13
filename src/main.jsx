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

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <ChakraProvider>
     <React.StrictMode>
        <BrowserRouter basename='/'>
        <Header/>
           <Routes> 
           <Route path='/' element={<App />} />
            <Route path='/Register' element={<Register/>} />
            <Route path='/Login' element={<Login/>} />
           {/* <Route index element={<Home />} />
            <Route path='/form-search-project' element={<SearchFormPage />} />
            <Route
              path='/projects'
              element={<AllProjects projects={PROJECTS} />}
            />
            <Route
              path='/projects/search/:searchValue'
              element={<AllProjects />}
            />
            <Route path='/project/:id' element={<Project />} />
            <Route path='*' element={<NotFound />} /> */}
          </Routes>
       </BrowserRouter>
     </React.StrictMode>
  </ChakraProvider>
  </AuthProvider>
)
