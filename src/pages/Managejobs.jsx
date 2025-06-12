import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Authcontext from '../components/Authcontext'
import { useNavigate } from 'react-router-dom'
import Jobcontext from '../components/Jobcontext'

function Managejobs() {
    const {currentuser}=useAuth()
    const {jobs,loadingjobs,deletejob}=useContext(Jobcontext)
    const navigate=useNavigate()
    const[employerjobs,setEmployerjobs]=useState([])
    const[deletesuccess,setDeletesuccess]=useState('')
    const[deleteerror,setDeleteerror]=useState('')

    useEffect(()=>{
        if(!loadingjobs && jobs.length>0 &&currentuser){
            const filtered=jobs.filter(j=>j.employerid===currentuser.id)
            setEmployerjobs(filtered)
        }else if(!loadingjobs && !currentuser){
            navigate('/login')
            console.error("no user found")
        }else{
            setEmployerjobs([])
        }
    },[currentuser,loadingjobs,jobs])

    const handleDelete=(jobid)=>{
      if((window.confirm("Are you sure you want to delete this job?"))){   
        setDeletesuccess('')
        setDeleteerror('')
        const Success=deletejob(jobid)
        if(Success){
            setDeletesuccess("Job Deleted Succesfully")
        }else{
            setDeleteerror("Failed Deleting Job")
        }
        
    }
}

 const handleEdit=(jobid)=>{
    navigate(`edit-job/${jobid}`)
 }

 const handleApplicants=(jobid)=>{
    navigate(`view-applicants/${jobid}`)
 }
 

return (
    <div className='bg-white rounded-xl p-8 mx-auto max-w-4xl my-8'>
      <h1 className='text-3xl font-inter text-center mb-6'>Manage Your Posted Jobs</h1>
      {deletesuccess && <p className="text-green-600 text-center mb-4">{deletesuccess}</p>}
      {deleteerror && <p className="text-red-600 text-center mb-4">{deleteerror}</p>}
      {employerjobs.length===0?(
        <p className="text-center text-gray-600">You have not posted any jobs yet.</p>
      ):
      (<div className='space-y-4'>
        {employerjobs.map(job=>(
            <div key={job.id} className='border p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center'>
                <div className='text-lg font-semibold mb-2 md:mb-0'>
                    {job.title} at {job.company}
                    <p className='ext-gray-600 text-sm'>{job.location}-{job.type}</p>
                </div>
                <div className='flex space-x-2'>
                    <button className='bg-indigo-700 rounded-md p-2 text-white hover:bg-indigo-600' onClick={()=>handleApplicants(job.id)}>View Applicants
                        </button>
                    <button className='bg-blue-700 rounded-md p-2 text-white' onClick={()=>handleDelete(job.id)}>Delete</button>
               
                    <button className='bg-green-700 rounded-md px-4 py-2 text-white' onClick={()=>handleEdit(job.id)}>Edit</button>
                </div>
            </div>
        ))} 
      </div>)}
    </div>
  )
}

export default Managejobs
