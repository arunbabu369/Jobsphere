import React, { useContext, useState } from 'react'
import { BrowserRouter as Router,Route, Link, Routes, useNavigate } from 'react-router-dom'
import logo from '../assets/images/company/logo.svg'
import Authcontext from '../components/Authcontext'
import bgimage from '../assets/images/company/handshake.webp'

function Loginpage() {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[error,setError]=useState('')

  const {login}=useContext(Authcontext)
  const navigate=useNavigate()
  
  const handleSubmit=async(e)=>{
    setError('')
    e.preventDefault()
    if(!email||!password){
      setError("Fill all Login Credentials")
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)){ 
      setError('Enter valid email ');
      return;
    }
    try{
      const loggedInUser=await login(email,password)
      alert("Login Successful")
      setTimeout(()=>{
        if(loggedInUser.role==='admin'){
          navigate('/admin')
        }
        else if(loggedInUser.role==='jobseeker')
          {
            navigate('/')
          }
        else{
          navigate('/employer')
        }
      },1500)
    }
    catch(err){
      setError("Invalid credentials")
      console.error(err.message||"Error Login")
    }
  }

  return (
    <div className='relative w-screen min-h-screen bg-no-repeat  bg-cover' style={{ backgroundImage: `url(${bgimage})` }}>
    <Link className='text-black mx-2' to={'/'}> Back to home</Link>
    <div className='flex justify-center items-center mx-20 my-40 md:mt-2 md:min-h-[calc(100vh-6rem)]'>
      
      <div className='bg-white p-8 rounded-lg sm:shadow-xl w-full max-w-md'>
        <img src={logo} alt="" className='w-[150px] md:h-[100px] md:w-[250px] flex justify-center mx-auto'/>
          <h2 className="text-3xl mt-4 md:mt-0 font-bold text-black text-center mb-6">Login</h2>
          {error &&<p className='text-red-500 text-center text-sm italic mt-4'>*{error}*</p>}
          <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-6'>
            <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>
          <div className='flex justify-center mt-2 sm:mt-0 items-center mx-auto'>
          <button className='px-2 py-1 sm:px-10 sm:py-2 text-sm sm:text-xl font-bold text-white bg-indigo-700'>
            Login
          </button>
          </div>
          </form>
          <p className='text-center text-sm sm:text-base mt-4 sm:mt-8'>Not Registered Yet?
          <Link className='hover:underline hover:text-red-400' to={'/register'}> Sign Up </Link>
          </p>
      </div>
      
    </div>
    </div>
  )
}

export default Loginpage
