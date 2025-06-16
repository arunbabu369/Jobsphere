import React from "react";
import logo from '../assets/images/company/logo.svg'
import facebook from '../assets/images/Footer/facebook.png'
import insta from '../assets/images/Footer/insta.png'
import twitter from '../assets/images/Footer/twitter.png'
function Footer(){
   return(
    <>
    <footer>
    <div className="flex justify-between bg-gray-100 mt-6 px-2 sm:px-10 py-6">
        <img className='h-auto w-[100px] sm:h-[100px] sm:w-[250px]' src={logo} alt="" />
        <div className="flex justify-center items-end">
            <p className="text-[8px] sm:text-base text-black">© 2024 JOBSPHERE. All Rights Reserved.</p>
        </div>
        <div className="flex gap-4 justify-end items-center cursor-pointer p-2">
            <img className="h-[10px] lg:h-[20px] hover:h-[21px] " src={facebook} alt=""/>
            <img className="h-[10px] lg:h-[20px] hover:h-[21px]" src={insta} alt=""/>
             <img className=" h-[10px] lg:h-[20px] hover:h-[21px]" src={twitter} alt=""></img>
        </div>
    </div>
    </footer>
    </>
   ) 
}

export default Footer