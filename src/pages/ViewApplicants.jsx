import React, { useContext, useEffect, useState } from 'react'
import Authcontext from '../components/Authcontext'
import Jobcontext from '../components/Jobcontext'
import Applicationcontext from '../components/Applicationcontext'
import { useParams } from 'react-router-dom'

function ViewApplicants() {
    const {jobId}=useParams()
    const{currentuser}=useContext(Authcontext)
    const{applicationData,updateApplicationStatus}=useContext(Applicationcontext)
    const{jobs}=useContext(Jobcontext)

    const[applicants,setApplicants]=useState([])
    const[jobdetails,setJobdetails]=useState('')
    const APPLICATION_STATUSES = ['Pending', 'Reviewed', 'Interview Scheduled', 'Accepted', 'Rejected'];

    useEffect(()=>{
        const foundjob=jobs.find(j=>String(j.id)===String(jobId))
        console.log("founded job" ,foundjob)
        if(!foundjob || foundjob.employerId !== currentuser.id){
            console.log('Job not found or you are not authorized to view applicants for this job.')
            setJobdetails('');
            setApplicants([]);
            return;
        }
        setJobdetails(foundjob)

        


        const filteredapplicants=applicationData.filter(app=>
            String(app.jobid)===String(jobId) && String(app.employerId)===String(currentuser.id))
            console.log("filtered applicant:",filteredapplicants)    
        setApplicants(filteredapplicants) 
          
    },[jobId,currentuser,applicationData,jobs])

    const handleStatusChange=async(applicantId,newStatus)=>{
        try{
            await updateApplicationStatus(applicantId,newStatus)
            setApplicants(prevapplicants=>
                prevapplicants.map(app=>
                    app.id===applicantId? { ...app, status: newStatus } : app
                ))
                alert(`Status for ${applicantId} updated to ${newStatus}`);
            }
            catch(err){
                console.error('Error updating application status:', err);
                alert('Failed to update status. Please try again.')
            }
        
    }


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
                            <p className='text-gray-700 text-sm mt-2'>
                                Status:{' '}
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium 
                                    ${applicant.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : ''}
                                    ${applicant.status === 'Reviewed' ? 'bg-blue-200 text-blue-800' : ''}
                                    ${applicant.status === 'Interview Scheduled' ? 'bg-purple-200 text-purple-800' : ''}
                                    ${applicant.status === 'Accepted' ? 'bg-green-200 text-green-800' : ''}
                                    ${applicant.status === 'Rejected' ? 'bg-red-200 text-red-800' : ''}
                                    `}
                                >
                                {applicant.newStatus || 'N/A'}
                            </span>
                        </p>
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
                                    <select value={applicant.status||'pending'}
                                    onChange={(e)=>handleStatusChange(applicant.id,e.target.value)}
                                    className='border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                                    >
                                        {APPLICATION_STATUSES.map(currentstatus=>(
                                            <option key={currentstatus} value={currentstatus}>{currentstatus}</option>
                                        ))}
                                        

                                    </select>

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
