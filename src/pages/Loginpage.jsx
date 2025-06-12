import React, { useContext, useState } from 'react'
import { BrowserRouter as Router,Route, Link, Routes, useNavigate } from 'react-router-dom'
import logo from '../assets/images/company/logo.svg'
import Authcontext from '../components/Authcontext'

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
        if(loggedInUser.role==='jobseeker')
          {
            navigate('/')
          }
        else{
          navigate('/employer')
        }
      },1500)
    }
    catch(err){
      console.error(err.message||"Error Login")
    }
  }

  return (
    <>
    <div className='flex justify-center items-center min-h-[calc(100vh-6rem)]'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md'>
        <img src={logo} alt="" className='h-[100px] w-[250px] flex justify-center mx-auto'/>
          <h2 className="text-3xl font-bold text-black text-center mb-6">Login</h2>
          {error &&<p className='text-red-500 text-center text-sm italic mt-4'>*{error}*</p>}
          <form onSubmit={handleSubmit} className='space-y-6'>
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
          <div className='flex justify-center items-center mx-auto'>
          <button className='px-10 py-2 text-xl font-bold text-white bg-indigo-700'>
            Login
          </button>
          </div>
          </form>
          <p className='text-center mt-8'>Not Registered Yet?
          <Link className='hover:underline hover:text-red-400' to={'/register'}> Sign Up </Link>
          </p>
      </div>
      
    </div>
    </>
  )
}

export default Loginpage
