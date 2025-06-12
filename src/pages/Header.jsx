import React, { useContext } from 'react'
import { BrowserRouter as Router,Route, Link, Routes } from 'react-router-dom'
import logo from '../assets/images/company/logo.svg'
import Authcontext from '../components/Authcontext'

function Header() {
  
  const {currentuser,logout}=useContext(Authcontext)
   
  return (
    <div >
      <nav className='p-[10px] mb-[20px] flex justify-between bg-white fixed w-full z-50 top-0 left-0'>
        <div className='flex'>
        <div className='mx-15 px-8'>
          <Link to='/'><img className='h-[80px] w-[200px]' src={logo} alt="" /></Link>
        </div>
        {currentuser?
           ( <div className='flex justify-start items-center gap-8 mx-20'>
        <Link className='text-xl text-gray-700 hover:text-blue-700' to='/job'>Search job</Link>
        <Link className='text-xl text-gray-700 hover:text-blue-700' to='/dashboard'>Dashboard</Link>
          </div>) :(<div className='flex justify-start items-center gap-8 mx-20'>
            <Link className='text-xl text-gray-700 hover:text-blue-700' to='/job'>Search job</Link>
            <Link className='text-xl text-gray-700 hover:text-blue-700' to='/aboutus'>About Us</Link>
            <Link className='text-xl text-gray-700 hover:text-blue-700' to='/Contactus'>Contact Us</Link>
        </div>)}
        </div>
        {currentuser ? (
          <div className='flex items-center'>
            <span className='text-yellow-600 font-semibold'>Hello {currentuser.username}</span>
            <div className='mx-8 my-auto'>
              <Link onClick={logout} className='text-xl text-gray-700 hover:text-blue-700' to='/login'>Logout</Link>
            </div>
          </div>
        ):(<div className='mx-8 my-auto'>
          <Link className='text-xl text-gray-700 hover:text-blue-700' to='/login'>Sign In</Link>
        </div>)}
       
        </nav>
      </div>
  )
}

export default Header
