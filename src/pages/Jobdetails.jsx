import React, { useContext, useEffect, useState } from 'react'
import Jobcontext from '../components/Jobcontext'
import techinnovation from '../assets/images/company/companylogo1.Avif'
import { useNavigate, useParams } from 'react-router-dom'
import Authcontext from '../components/Authcontext'

function Jobdetails() {
  const {jobs}=useContext(Jobcontext)
  const {id}=useParams()
  const[job,setJob]=useState([])
  const[applyModal,setApplyModal]=useState(false)

  const {currentuser,applyJob}=useContext(Authcontext)
  const navigate=useNavigate()

useEffect(() => {
        // console.log('Jobdetails useEffect: jobs from context:', jobs); 
        // console.log('Jobdetails useEffect: ID from URL:', id);      

        if (Array.isArray(jobs) && jobs.length > 0) {
            const foundJob = jobs.find((j) => String(j.id) === String(id)); // <--- Ensure string comparison
            setJob(foundJob);
            
            // console.log('Jobdetails useEffect: Found job:', foundJob); // Debugging: Check if job is found
        } else {
            setJob(null); 
        }
    }, [id, jobs]); 
  
  const handleApplyjob=async(e)=>{
     e.preventDefault()
      if (!currentuser) { 
            alert("Please Login To apply for jobs.");
            setApplyModal(false); 
            return;
        }
      
      const applicantName=e.target.elements.name.value
      const applicantEmail = e.target.elements.email.value;
      const resumeLink = e.target.elements.resume.value;

      const applicationTOsend={
        jobId:job.id,
        jobtitle:job.title,
        company:job.company,
        employerId:job.employerId,
        applicantName:applicantName,
        applicantEmail:applicantEmail,
        resumeLink:resumeLink,
        status:'pending'
      }
      
      try {
        console.log("hello applied");
        
        await applyJob(applicationTOsend)
        alert(`${job.title} applied successfully`)
      } catch (error) {
        console.error(error.message||'not applied')
      }
     setApplyModal(false) 
   }
   const isApplied=(jobid)=>{
    return currentuser?.appliedjobs?.some(appliedjob=>appliedjob.jobid===jobid)
   }

   console.log('Jobdetails rendering. Current "job" state:', job);
   console.log("appliedjobs:",currentuser.appliedjobs)

  return (
    <div>
      <div className='h-[300px] bg-gray-100 flex items-center pl-2 sm:pl-20 gap-10'>
        <img className='h-20 w-20 sm:h-40 sm:w-40 rounded-3xl' src={techinnovation} alt="" />
        <h1 className='text-2xl font-inter'>{job.title}</h1>
      </div>
      <div className='flex'>
        <div className='w-2/3 px-2 my-6 sm:px-20 sm:my-20'>
            <h1 className='text-xl font-semibold'>Job Description</h1>
            <p className='mt-8 text-sm sm:text-base'>{job.description}</p>
            <p className='mt-8 font-semibold text-sm sm:text-base'>Company Name : {job.company}</p>
            <p className='mt-8 text-sm sm:text-base'><strong className='font-semibold'>Location : </strong>{job.location}</p>
            <p className='mt-8 text-sm sm:text-base '><strong className='font-semibold'>Job-Type : </strong>{job.type}</p>
            <p className='mt-8 text-sm sm:text-base'><strong className='font-semibold'>Position : </strong>{job.title}</p>
        </div>
        
        <div className='w-1/3 pr-2 sm:pr-20 my-6 sm:my-20'>
            {currentuser?
            (<button className='w-full px-2 py-2 sm:px-8 sm:py-4 bg-blue-800 text-white text-lg sm:text-2xl'
              onClick={()=>{
                if(!isApplied(job.id))  //if applied- button becomes disable ,else setApplymodel to true 
                  {setApplyModal(true)}}}
                  disabled={isApplied(job.id)}>
              {currentuser && isApplied(job.id) ?'Applied':'Apply Now' }
            </button>):(<button className='w-full px-2 py-2 sm:px-8 sm:py-4 bg-blue-800 text-white text-lg sm:text-2xl'
              onClick={()=>alert("Sign in to Apply")}>
              Apply Now 
            </button>)}


            <div className='bg-gray-100 mt-6 sm:mt-10'>
              <div className='bg-gray-200'>
              <h1 className='text-center p-2 sm:p-6 text-base sm:text-xl'>Job Summary</h1>
              </div>
              <div className='mt-2 p-2 sm:p-8 '>
                <div className='flex'>
               <svg xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 "
              fill="currentColor"
               viewBox="0 0 24 24">
             <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
               </svg>
               <div className='ml-2 sm:ml-6'>
               <p className='text-semibold text-sm sm:text-lg'>Location</p>
               <p className='text-sm sm:text-lg'>{job.location}</p>
               </div>
               </div>
                <div className='flex mt-4'>
               <svg xmlns="http://www.w3.org/2000/svg"
                 class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                 fill="currentColor"
                 viewBox="0 0 24 24">
                 <path d="M10 2h4a2 2 0 012 2v2h2a2 2 0 012 2v2H4V8a2 2 0 012-2h2V4a2 2 0 012-2zm0 4h4V4h-4v2zM4 12h16v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z"/>
              </svg>
               <div className='ml-2 sm:ml-6 text-sm sm:text-lg'>
               <p className='text-semibold text-md sm:text-lg'>Job-Type</p>
               <p className=''>{job.type}</p>
               </div>
               </div>

               <div className='flex mt-4'>
                <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-6 w-6 sm:w-8 sm:h-8  text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 1a1 1 0 011 1v1.05c2.28.25 4 1.64 4 3.45 0 1.82-1.67 3.2-4.25 3.45V14c1.75.2 3 1.15 3 2.5 0 1.41-1.37 2.5-3.25 2.5S9.5 17.91 9.5 16.5H8c0 2.14 1.95 3.84 4.5 3.96V22a1 1 0 01-2 0v-1.05c-2.28-.25-4-1.64-4-3.45 0-1.82 1.67-3.2 4.25-3.45V10c-1.75-.2-3-1.15-3-2.5 0-1.41 1.37-2.5 3.25-2.5S14.5 6.59 14.5 8h1.5c0-2.14-1.95-3.84-4.5-3.96V2a1 1 0 011-1z"/>
                </svg>
               <div className='ml-2 sm:ml-6'>
               <p className='text-semibold text-sm sm:text-lg'>Salary</p>
               <p className='text-sm sm:text-lg'>{job.salary}</p>
               </div>
               </div>

               <div className='flex mt-4'>
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 sm:w-8 sm:h-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M7 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H8V3a1 1 0 00-1-1zm13 6v2H4V8h16zm0 4v8H4v-8h16z"/>
                </svg>
               <div className='ml-2 sm:ml-6'>
               <p className='text-semibold text-sm sm:text-lg'>Posted On</p>
               <p className='text-sm sm:text-lg'>{job.date}</p>
               </div>
               </div>
               </div>
            </div>
        </div>
      </div>
     {applyModal && (
      <div className='fixed inset-0 bg-gray-600 flex justify-center items-center'>
        <div className='bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative'>
          <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
           onClick={()=>setApplyModal(false)}>
            &times;
          </button>
          <h2 className='text-lg sm:text-2xl mb-4'>Apply For {job.title}</h2>
          <form className='space-y-4' onSubmit={handleApplyjob}>
              <div>
                <label htmlFor="name" className="block text-md sm:text-base text-gray-700 font-semibold mb-1">
                   Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="text-md sm:text-base w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter name"
                  />
              </div>
              <div>
               <label htmlFor="email" className="block text-md sm:text-base text-gray-700 font-semibold mb-1">
                  Email Address
               </label>
               <input
                  type="email"
                  id="email"
                  className="w-full p-2 text-md sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Email address"
                  defaultValue={currentuser?.email||''}
                />
              </div>
              <div>
              <label htmlFor="resume" className="block text-gray-700 font-semibold mb-1">
                  Resume (Upload Link/Drive Link)
              </label>
              <input
                  type="url"
                  id="resume"
                  className="w-full text-md sm:text-base p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="upload Resume"
                />
               </div>
               <button type='submit' className='bg-indigo-700 px-8 py-4 text-white font-semibold w-full' 
               >Submit</button>
          </form>
        </div>
      </div>
     )}
    </div>
  )
}

export default Jobdetails
