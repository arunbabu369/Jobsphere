import React, { useState } from 'react'; 
import { BrowserRouter as Router,Route, Link, Routes, NavLink } from 'react-router-dom';
import logo from '../assets/images/company/logo.svg';
import { useAuth } from '../hooks/useAuth';

function Employerheader() {
    const{logout}=useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className=''>
            <nav className='p-[10px] mb-[20px] flex justify-between bg-white fixed w-full z-50 top-0 left-0 shadow-xl'>
               <div className='flex-shrink-0 w-6 h-6 sm:hidden'></div>
                <div className='mx-2 sm:mx-15 px-2 sm:px-8 flex-shrink-0'>
                    <Link to='/employer'><img className='h-[60px] w-[150px] sm:h-[80px] sm:w-[200px]' src={logo} alt="" /></Link>
                </div>
                <div className='hidden sm:flex justify-between gap-3 sm:gap-6 items-center text-sm sm:text-2xl text-blue-700'>
                    <NavLink to={'/employer/add-job'} className={({isActive})=>
                    isActive ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'hover:text-gray-300'}>Add Job</NavLink>

                    <NavLink to={'/employer/Manage-Jobs'} className={({isActive})=>
                    isActive ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'hover:text-gray-300'}>Manage Job</NavLink>

                    <NavLink to={'employer/chats'}className={({isActive})=>
                    isActive ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'hover:text-gray-300'}>Chats</NavLink>

                    <NavLink to={'employer/analytics'}className={({isActive})=>
                    isActive ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'hover:text-gray-300'}>Analytics</NavLink>
                </div>
                <div className='hidden sm:block mx-4 sm:mx-8 my-auto'>
                    <Link onClick={logout} className='text-base sm:text-xl text-gray-700 hover:text-blue-700' to='/login'>Logout</Link>
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
                <div className='sm:hidden absolute top-[70px] text-center w-full bg-white shadow-lg py-4 z-40'>
                    <NavLink to={'/employer/add-job'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={closeMobileMenu}>Add Job</NavLink>
                    <NavLink to={'/employer/Manage-Jobs'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={closeMobileMenu}>Manage Job</NavLink>
                    <NavLink to={'employer/chats'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={closeMobileMenu}>Chats</NavLink>
                    <NavLink to={'employer/analytics'} className='block px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={closeMobileMenu}>Analytics</NavLink>
                    <Link onClick={() => { logout(); closeMobileMenu(); }} className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/login'>Logout</Link>
                </div>
            )} 
        </div>
    );
}

export default Employerheader;