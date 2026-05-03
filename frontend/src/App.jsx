import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
    </Routes>
    
  )
}

export default App
