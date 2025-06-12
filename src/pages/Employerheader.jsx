import React from 'react'
import { BrowserRouter as Router,Route, Link, Routes, NavLink } from 'react-router-dom'
import logo from '../assets/images/company/logo.svg'
import { useAuth } from '../hooks/useAuth'
function Employerheader() {
    const{logout}=useAuth()
  return (
    <div>
      <nav className='p-[10px] mb-[20px] flex justify-between bg-white fixed w-full z-50 top-0 left-0 shadow-xl'>
              
              <div className='mx-15 px-8'>
                <Link to='/employer'><img className='h-[80px] w-[200px]' src={logo} alt="" /></Link>
              </div>
              <div className='flex justify-between gap-6 items-center text-2xl text-blue-700'>
                <NavLink to={'/employer/add-job'} className={({isActive})=>
                isActive ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'hover:text-gray-300'}>Add Job</NavLink>

                <NavLink to={'/employer/Manage-Jobs'} className={({isActive})=>
                isActive ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'hover:text-gray-300'}>Manage Job</NavLink>

                
              </div>
              <div className='mx-8 my-auto'>
                  <Link onClick={logout} className='text-xl text-gray-700 hover:text-blue-700' to='/login'>Logout</Link>
              </div>
           
      </nav>        
    </div>
  )
}

export default Employerheader
