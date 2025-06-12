import React, { useContext, useEffect, useState } from 'react'
import Authcontext from '../components/Authcontext'
import Jobcontext from '../components/Jobcontext'
import Applicationcontext from '../components/Applicationcontext'
import { useParams } from 'react-router-dom'

function ViewApplicants() {
    const {jobId}=useParams()
    const{currentuser}=useContext(Authcontext)
    const{applicationData}=useContext(Applicationcontext)
    const{jobs}=useContext(Jobcontext)

    const[applicants,setApplicants]=useState([])
    const[jobdetails,setJobdetails]=useState('')

    useEffect(()=>{
        const foundjob=jobs.find(j=>String(j.id)===String(jobId))
        console.log("founded job" ,foundjob)
        if(!foundjob || foundjob.employerid !== currentuser.id){
            console.log('Job not found or you are not authorized to view applicants for this job.')
            setJobdetails('');
            setApplicants([]);
            return;
        }
        setJobdetails(foundjob)

        const applieddata=applicationData[0]
        console.log("Application:",applieddata)
        console.log("Sample App Job ID (app.jobid)",applieddata.jobid)
        console.log("Jobid:",jobId)
        console.log("Sample App Employer ID (app.jobid)",applieddata.employerId)
        console.log("user id:",currentuser.id)


        const filteredapplicants=applicationData.filter(app=>
            String(app.jobid)===String(jobId) && String(app.employerId)===String(currentuser.id))
            console.log("filtered applicant:",filteredapplicants)    
        setApplicants(filteredapplicants) 
          
    },[jobId,currentuser,applicationData,jobs])


  return (
    <div className='mx-auto px-8 py-4 max-w-4xl'>
        <h1 className='text-center text-3xl font-semibold text-indigo-700 my-6'>Applicants for {jobdetails.title}</h1>
        {applicants.length===0 ? (
            <p className='text-center text-gray-600 text-lg my-8'>No Applicants for this job</p>
        ):(
            <div className='space-y-4'>
                {applicants.map(applicant=>{
                    return(<div key={applicant.applicantId} className='bg-white rounded-lg p-6 shadow-md border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center'>
                         <div className="mb-4 md:mb-0">
                            <h2 className='text-xl font-semibold text-gray-800'>Name:{applicant.applicantName}</h2>
                            <p className='text-gray-600 text-sm'>Email:{applicant.applicantEmail}</p>
                            <p className='text-gray-600 text-sm'>Appled Date:{applicant.applicationDate}</p>
                        </div>
                
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                                {applicant.resumeLink && (
                                    <a
                                        href={applicant.resumeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm text-center">
                                        View Resume
                                    </a>)}
                        </div>
                    </div>
                )})}
            </div>
        )
    }
    </div>
  )
}

export default ViewApplicants
