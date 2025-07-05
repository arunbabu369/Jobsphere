import React, { useContext, useState } from 'react'
import Authcontext from '../components/Authcontext'
import { NavLink, Outlet } from 'react-router-dom'

function Dashboarduser() {
  const {currentuser}=useContext(Authcontext)
   const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    <div className='flex min-h-screen bg-gray-100  sm:mt-2'>
      <div className='sm:hidden fixed top-[80px] left-0 z-40 p-2'> 
        <button onClick={toggleSidebar} className='text-gray-800 bg-white p-2 rounded-md shadow focus:outline-none'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              ></path> 
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path> 
            )}
          </svg>
        </button>
      </div>

      <aside 
        className={`fixed inset-y-0 left-0 top-[80px] sm:top-0 z-30 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:relative sm:translate-x-0 
        w-64 bg-gray-800 text-white p-2 sm:p-6 flex flex-col transition-transform duration-300 ease-in-out`}
      >
        <nav className='flex-grow mt-12 sm:mt-0'>
          <ul>
            <li className='text-sm sm:text-base py-2'>
              <NavLink to={'save-jobs'} >
                  Saved Jobs
              </NavLink>
            </li>
            <li className='text-sm sm:text-base py-2'>
              <NavLink to={'applied-jobs'}>
                  Applied Jobs
              </NavLink>
            </li>
            <li className='text-sm sm:text-base py-2'>
              <NavLink to={'Profile'}>
                  Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className='flex-1'>
        <Outlet/>
      </main>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  )
}

export default Dashboarduser
