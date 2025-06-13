import React from 'react'

function About() {
  return (
    <div className='mx-2 sm:mx-40 px-2 sm:px-8 py-2 sm:py-10 '>
        <h1 className='text-center text-indigo-700 text-4xl font-semibold'>About Us</h1>
         <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-sm sm:text-lg text-gray-500 mb-4">
          Welcome to <strong>JOBSPHERE</strong>, your premier destination for connecting talented individuals with leading companies.
          Our mission is to simplify the job search and hiring process, making it efficient, transparent, and rewarding for everyone involved.
        </p>
        <p className="text-sm sm:text-lg text-gray-500 mb-4">
          Founded in 2020, we envisioned a platform where job seekers could easily find opportunities that match their skills and aspirations,
          while employers could effortlessly discover the perfect candidates to drive their businesses forward. We believe in the power of the right match.
        </p>
        <p className="text-sm sm:text-lg text-gray-500">
          Our team is dedicated to providing an intuitive, user-friendly experience, backed by robust technology and a commitment to data privacy.
          We are constantly striving to innovate and enhance our services to meet the evolving needs of the job market.
          Thank you for choosing Jobsphere to be a part of your career journey or hiring success.
        </p>
      </div>
      
    </div>
  )
}

export default About
