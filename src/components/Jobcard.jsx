import React, { useContext } from 'react'
import { BrowserRouter as Router,Route, Link, Routes } from 'react-router-dom'
import Authcontext from './Authcontext'
function Jobcard({job}) {
   const {currentuser,savejob,applyJob}=useContext(Authcontext)
   
   const handleSavejob=async(job)=>{
      if(!currentuser){
        alert("Please Login To save")
      }
      try{
        await savejob(job)
        alert(`${job.title} saved successfully`)
      }
      catch(error){
        console.error(error.message||'Not saved')
      }

   }
   const isJobsaved=(jobid)=>{
    return currentuser?.savedjobs?.some(savedJob => savedJob.id === jobid);
   }

   
  return (
    <>
    <div className='border p-4 mb-10 shadow-md hover:shadow-xl'>
      <Link to={`/job/${job.id}`}>
      <div className=' '>
        <div>
            {console.log("jobs")}
             <h1 className='font-semibold text-2xl text-center'>{job.title}</h1>
            <p className='text-gray-700 text-center'><strong >{job.company} </strong>- {job.location} ({job.type})</p>
        </div>
        <div className='flex justify-center gap-6 text-gray-500'>
            <span>Salary:{job.salary} </span>
            <span>Experience:{job.experience} </span>
            <span>{job.remoteHybrid} </span>
        </div>
        </div>
        </Link>
        
         
        
        <div className='flex justify-center gap-8 my-4'>
          <Link to={`/job/${job.id}`}><button className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 text-sm`}>
            
            View Details
          </button>
          </Link>
          <button onClick={()=>handleSavejob(job)} className={`px-4 py-2 rounded-md hover:bg-gray-500 transition-colors duration-200 text-sm
          ${currentuser && isJobsaved(job.id) ?'bg-gray-400 text-white':'bg-blue-400 text-white'}`
          }>
           {currentuser && isJobsaved(job.id)?'Saved':'Save'}
          </button>
        </div>
        
      </div>
    </>
  )
}

export default Jobcard
