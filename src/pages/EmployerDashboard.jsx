import React from 'react'
import employimage from '../assets/images/company/employer.png'
function EmployerDashboard() {
  return (
    <div>
      <h1 className='text-4xl text-gray-700 text-center mt-20'>Hire Talent with Jobsphere!!!</h1>
      <p className='text-center mt-10 text-2xl mx-200 text-gray-400'>Find, Engage and hire talent based on your requirements through India's Leading Recruiters</p>
      <img src={employimage} alt="" className='w-full px-20 pb-20'/>
    </div>
  )
}

export default EmployerDashboard
