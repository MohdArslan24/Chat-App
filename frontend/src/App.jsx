import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import getCurrentUser from './customHooks/getCurrentUser'

function App() {
  getCurrentUser()
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    
  )
}

export default App
