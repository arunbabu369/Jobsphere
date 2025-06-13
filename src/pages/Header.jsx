import React, { useContext } from 'react'
import { BrowserRouter as Router,Route, Link, Routes } from 'react-router-dom'
import logo from '../assets/images/company/logo.svg'
import Authcontext from '../components/Authcontext'

function Header() {
  
  const {currentuser,logout}=useContext(Authcontext)
   
  return (
    <div className='fixed w-full top-0 left-0 z-50 bg-white shadow-md' >
      <nav className=' p-2 sm:p-4 flex justify-between '>
      
        <div className='flex-shrink-0'>
          <Link to='/'><img className='h-[40px] w-[100px] sm:h-[80px] sm:w-[200px]' src={logo} alt="" /></Link>
        </div>
        {currentuser?
           ( <div className='flex justify-center ml-2 items-center gap-2 sm:gap-8 '>
        <Link className='text-xs sm:text-xl text-gray-700 hover:text-blue-700' to='/job'>Search job</Link>
        <Link className='text-xs sm:text-xl text-gray-700 hover:text-blue-700' to='/dashboard'>Dashboard</Link>
          </div>) :(<div className='flex justify-start items-center gap-2 sm:gap-8 mx-4 md:mx-20 '>
            <Link className='text-xs sm:text-xl text-gray-700 hover:text-blue-700' to='/job'>Search job</Link>
            <Link className='text-xs md:text-xl text-gray-700 hover:text-blue-700' to='/aboutus'>About Us</Link>
            <Link className='text-xs md:text-xl text-gray-700 hover:text-blue-700' to='/Contactus'>Contact Us</Link>
        </div>)}
        
        {currentuser ? (
          <div className='mx:flex justify-end '>
            <span className=' text-sm sm:text-xl text-yellow-600 font-semibold'>Hello {currentuser.username}</span>
            <div className='mx-2 sm:mx-8 my-auto'>
              <Link onClick={logout} className='text-sm sm:text-xl text-gray-700 hover:text-blue-700' to='/login'>Logout</Link>
            </div>
          </div>
        ):(<div className='mx-0 sm:mx-8 sm:my-auto'>
          <Link className='text-sm sm:text-xl text-gray-700 hover:text-blue-700' to='/login'>Sign In</Link>
        </div>)}
       
        </nav>
      </div>
  )
}

export default Header
