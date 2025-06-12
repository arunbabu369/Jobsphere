import React, { useContext } from 'react'
import Authcontext from '../components/Authcontext'
import { NavLink, Outlet } from 'react-router-dom'

function Dashboarduser() {
  const {currentuser}=useContext(Authcontext)
  return (
    <div className='flex h-screen bg-gray-100'>
      <aside className='w-64 bg-gray-800 text-white p-6 flex flex-col'>
        <nav className='flex-grow'>
          <ul>
            <li>
              <NavLink to={'save-jobs'}>
                  Saved Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to={'applied-jobs'}>
                  Applied Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to={'/Profile'}>
                  Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Dashboarduser
