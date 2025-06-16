import React, { useContext } from "react";
import Authcontext from "../components/Authcontext";
import { Link } from 'react-router-dom'
import Jobcontext from "../components/Jobcontext";

function Appliedjobs(){
    const {currentuser} =useContext(Authcontext)
    const {jobs}= useContext(Jobcontext)

    const appliedjobs=currentuser?currentuser.appliedjobs:[]
    return(
        <div className="flex-1 mx-auto px-8 py-4">
            <h1 className="text-center text-2xl sm:text-4xl font-semibold text-indigo-700 my-10">Applied Jobs</h1>
            {appliedjobs.length==0?(
            <div className='text-sm sm:text-base text-center '>
                <p className="text-red-400">OOPSS...</p>
                <p>You don't have any saved Jobs yet</p>
                <Link to={'/jobs'}><p className="hover:underline">Browse jobs</p></Link>
            </div>):(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appliedjobs.map(appliedJobEntry=>{
                    console.log("applied job entry:",appliedJobEntry);
                    
                    const fulljobdetails=jobs.find(job => String(job.id) === String(appliedJobEntry.jobid))
                    return(
                <div key={fulljobdetails.id} className='bg-white rounded-lg p-3 sm:p-6 shadow-lg border border-gray-100'>
                    <h2 className='text-base sm:text-xl font-semibold'>{fulljobdetails.title}</h2>
                    <p className="text-gray-600 text-sm mb-1">
                  <strong>{fulljobdetails.company}</strong> - {fulljobdetails.location} ({fulljobdetails.type})
                </p>
                <p className="text-xs text-gray-500 mb-4">Applied On: {appliedJobEntry.appliedDate}</p>
                </div>
                )}
            )}
            
            </div>)}
        </div>
    )
}
export default Appliedjobs