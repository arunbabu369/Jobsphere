import React, { useContext,useState } from 'react'
import { BrowserRouter as Router,Route, Link, Routes } from 'react-router-dom'
import logo from '../assets/images/company/logo.svg'
import Authcontext from '../components/Authcontext'

function Header() {
  
  const {currentuser,logout}=useContext(Authcontext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
   
  return (
    <div className='fixed w-full top-0 left-0 z-50 bg-white shadow-md' >
      <nav className=' p-2 sm:p-4 flex justify-between '>
        <div className='flex-shrink-0 w-6 h-6 sm:hidden'></div>
        <div className='flex-shrink-0'>
          <Link to='/' onClick={closeMobileMenu}>
            <img className='h-[60px] w-[150px] sm:h-[80px] sm:w-[200px]' src={logo} alt='Company Logo' />
          </Link>
        </div>
      
        {currentuser ? (
          <div className='hidden sm:flex justify-center ml-2 items-center gap-2 sm:gap-8'>
            <Link className='text-xs sm:text-xl text-gray-700 hover:text-blue-700' to='/job'>
              Search job
            </Link>
            <Link className='text-xs sm:text-xl text-gray-700 hover:text-blue-700' to='/dashboard'>
              Dashboard
            </Link>
          </div>
        ) : (
          <div className='hidden sm:flex justify-start items-center gap-2 sm:gap-8 mx-4 md:mx-20'>
            <Link className='text-xs sm:text-xl text-gray-700 hover:text-blue-700' to='/job'>
              Search job
            </Link>
            <Link className='text-xs md:text-xl text-gray-700 hover:text-blue-700' to='/aboutus'>
              About Us
            </Link>
            <Link className='text-xs md:text-xl text-gray-700 hover:text-blue-700' to='/Contactus'>
              Contact Us
            </Link>
          </div>
        )}

       
        <div className='hidden sm:flex items-center'> 
          {currentuser ? (
            <>
              <span className='text-sm sm:text-xl text-yellow-600 font-semibold mr-4'>
                Hello {currentuser.username}
              </span>
              <Link onClick={logout} className='text-sm sm:text-xl text-gray-700 hover:text-blue-700' to='/login'>
                Logout
              </Link>
            </>
          ) : (
            <Link className='text-sm sm:text-xl text-gray-700 hover:text-blue-700' to='/login'>
              Sign In
            </Link>
          )}
        </div>

        <div className='sm:hidden flex items-center'>
          <button onClick={toggleMobileMenu} className='text-gray-700 focus:outline-none'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              {isMobileMenuOpen ? (
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
      </nav>

    
      {isMobileMenuOpen && (
        <div className='sm:hidden bg-white shadow-lg py-4'>
          <div className='flex flex-col items-center space-y-4'>
            {currentuser ? (
              <>
                <span className='text-base text-yellow-600 font-semibold'>Hello {currentuser.username}</span>
                <Link onClick={closeMobileMenu} className='text-base text-gray-700 hover:text-blue-700' to='/job'>
                  Search job
                </Link>
                <Link onClick={closeMobileMenu} className='text-base text-gray-700 hover:text-blue-700 hover:underline' to='/dashboard'>
                  Dashboard
                </Link>
                
                <Link onClick={() => { logout(); closeMobileMenu(); }} className='text-base text-gray-700 hover:text-blue-700' to='/login'>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link onClick={closeMobileMenu} className='text-base text-gray-700 hover:text-blue-700' to='/job'>
                  Search job
                </Link>
                <Link onClick={closeMobileMenu} className='text-base text-gray-700 hover:text-blue-700' to='/aboutus'>
                  About Us
                </Link>
                <Link onClick={closeMobileMenu} className='text-base text-gray-700 hover:text-blue-700' to='/Contactus'>
                  Contact Us
                </Link>
                <Link onClick={closeMobileMenu} className='text-base text-gray-700 hover:text-blue-700' to='/login'>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
        )}
        
      </div>
  )
}

export default Header
