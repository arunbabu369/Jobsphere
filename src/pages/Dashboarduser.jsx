import React, { useContext } from 'react'
import Authcontext from '../components/Authcontext'
import { NavLink, Outlet } from 'react-router-dom'

function Dashboarduser() {
  const {currentuser}=useContext(Authcontext)
  return (
    <div className='flex bg-gray-100'>
      <aside className='w-40 sm:w-64 bg-gray-800 text-white p-2 sm:p-6 flex flex-col'>
        <nav className='flex-grow'>
          <ul>
            <li className='text-sm sm:text-base'>
              <NavLink to={'save-jobs'} >
                  Saved Jobs
              </NavLink>
            </li>
            <li className='text-sm sm:text-base'>
              <NavLink to={'applied-jobs'}>
                  Applied Jobs
              </NavLink>
            </li>
            <li className='text-sm sm:text-base'>
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
    </div>
  )
}

export default Dashboarduser
