import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Oval } from 'react-loader-spinner'
import axios from 'axios';
import { serverURL } from '../main';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';


function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      let res = await axios.post(`${serverURL}/api/auth/signup`, {
            name,
            email,
            password,
        }, {withCredentials: true})
     
      
      if (res.success) {
        localStorage.setItem('token', res.token)
        dispatch(setUserData(res.data))
        navigate('/')
      } else {
        setError(res.data.message)
      }
    } catch (err) {
        console.log(err);
        
      setError('Failed to signup. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    {loading && <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-40"><Oval
      height={80}
      width={80}
      color="blue"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    /></div>}
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Sign up</h1>
          <p className='text-gray-500 text-sm'>Create your account to get started</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className='space-y-4'>
          {/* Name Input */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>Name</label>
            <div className='relative'>
              <FiUser className='absolute left-3 top-3 text-gray-400' />
              <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your name'
                className='w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition'
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>Email</label>
            <div className='relative'>
              <FiMail className='absolute left-3 top-3 text-gray-400' />
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition'
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>Password</label>
            <div className='relative'>
              <FiLock className='absolute left-3 top-3 text-gray-400' />
              <input
                type={`${showPassword ? "text" : "password"}`}
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition'
                required
              />
              <span className='absolute right-3.5 top-3 cursor-pointer text-gray-500' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOffSharp size={20} />  : <MdRemoveRedEye size={20} />}
              </span>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300 disabled:opacity-50 cursor-pointer'
          >Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className='text-center text-gray-600 text-sm mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 hover:text-blue-700 font-semibold'>
            Log In
          </Link>
        </p>

        {/* Divider */}
        <div className='flex items-center my-6'>
          <div className='flex-1 border-t border-gray-300'></div>
          <span className='px-3 text-gray-500 text-sm'>or</span>
          <div className='flex-1 border-t border-gray-300'></div>
        </div>

        {/* Google Sign Up */}
        <button
          type='button'
          className='w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition'
        >
          <FcGoogle size={22} />
          Sign up with Google
        </button>
      </div>
    </div>
    </>
  )
}

export default Signup
