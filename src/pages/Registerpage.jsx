import React, { useContext, useState } from 'react'
import Authcontext from '../components/Authcontext'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router,Route, Link, Routes } from 'react-router-dom'
import logo from '../assets/images/company/logo.svg'

function Registerpage() {
  const[username,setUsername]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[confirmpass,setconfirmpass]=useState('')
  const[error,setError]=useState('')
  const[success,setSuccess]=useState('')
  const[role,setRole]=useState('jobseeker')
  const[companyname,setcompanyname]=useState('')
  
  const { register }=useContext(Authcontext)
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    
    e.preventDefault()
    setError('')
    setSuccess('')
    if(role==='jobseeker'){
      if(!username || !email || !password || !confirmpass){
        setError("All Fields Required")
        return
      }
    }
    else{
      if(!companyname || !email || !password || !confirmpass){
        setError("All Fields Required")
        return
    }  
    }

    if(password.length<8){
      setError("Password must be at least 6 characters long")
      return
    }
    if(password!==confirmpass){
      setError("Password Mismatched")
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)){ 
      setError('Invalid email format.');
      return;
    }

    const hasletter=/[a-zA-Z]/.test(password)
    const hasnumber=/[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if(!hasletter){
      setError("Password must contain at least one Letter")
      return
    }

    if(!hasnumber)
    {
      setError("Password must contain at least one Number")
    }
    if(!hasSpecialChar){
      setError("Password must contain atleast 1 Special character")
    }

    try{
      await register(username,password,email,role,companyname)
      setSuccess("Registration Successful")
      setTimeout(() => {
        navigate('/login')
      }, 1500);
    }
    catch(err){
      setError(err.message||'Registartion failed ,Try again')
    }

  }
  

  return (
    <>
    <div className='flex justify-center'>
    <img src={logo} className='h-[100px] w-[250px]' alt="" />
    </div>
    <div className='flex justify-center items-center '>
      
      <div className='bg-white p-8 rounded-lg sm:shadow-xl w-full max-w-md'>
        <h1 className='text-center text-3xl font-bold'>Register Here</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
            {error &&<p className='text-red-500 text-center text-sm italic mt-4'>*{error}*</p>}
            {success &&<p className='text-green-500 text-center text-sm'>{success}</p>}
            <label className='text-xl text-blue-600'>Register as:</label>
            <select id="role" className='p-2 rounded-xl ml-4'
              value={role}
              onChange={(e)=>setRole(e.target.value)}>
              <option value="jobseeker">Jobseeker</option>
              <option value="employer">employer</option>
            </select><br></br>
            
             {role === 'employer' && (
                  <div className='form-group'>
                      <label className='text-xl text-blue-600' htmlFor="companyName">Company Name:</label><br />
                      <input
                        type="text"
                        className='w-full border p-2'
                        placeholder='Enter Company Name'
                        value={companyname}
                        onChange={(e) => setcompanyname(e.target.value)}
                      />
                  </div>
                )}

            {role === 'jobseeker' &&(
            <div className='form-group'>
            <label className='text-xl text-blue-600' htmlFor="username">Username</label><br></br>
            <input type="text" 
            className='w-full border p-2'
                   placeholder='Enter Username'
                   value={username}
                   onChange={(e)=>setUsername(e.target.value)}
                  
            />
            </div>)}
            <label className='text-xl text-blue-600' htmlFor="email">Email</label><br></br>
            <input type="text" 
            className='w-full border p-2'
                   placeholder='Enter Your Email'
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   
            />
            <label className='text-xl text-blue-600' htmlFor="password">Password:</label><br></br>
            <input type="text" 
            className='w-full border p-2'
                   placeholder='Enter New Password'
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   
            />
            <label className='text-xl text-blue-600' htmlFor="confirmpass">Confirm Password</label><br></br>
            <input type="text" 
            className='w-full border p-2'
                   placeholder='Re-Enter Password'
                   value={confirmpass}
                   onChange={(e)=>setconfirmpass(e.target.value)}

            />
            <button className='flex items-center justify-center mt-10 mx-auto px-4 py-2 bg-black text-white text-center'>Sign Up</button>
            <div className='mt-18 text-center'>
            <Link className='text-red-700 text-center' to={'/login'}>Already a user ? Login</Link>
            </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Registerpage
