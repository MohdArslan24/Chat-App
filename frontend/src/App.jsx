import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import useGetCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { Navigate } from 'react-router-dom'
import Loading from './components/Loading'

function App() {
  useGetCurrentUser()
  const {userData, isLoading} = useSelector(state => state.user)
  
  if (isLoading) {
    return <Loading />
  }
  
  return (
    <Routes>
      <Route path='/' element={ userData ? <Home /> : <Navigate to='/login' />} />
      <Route path='/profile' element={userData ?  <Profile /> : <Navigate to='/login' />} />
      <Route path='/signup' element={!userData ? <Signup /> : <Navigate to='/' />} />
      <Route path='/login' element={!userData ? <Login /> : <Navigate to='/' />} />
    </Routes>
    
  )
}

export default App
