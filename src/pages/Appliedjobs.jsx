import React, { useContext, useState } from "react";
import Authcontext from "../components/Authcontext";
import { Link } from 'react-router-dom'
import Jobcontext from "../components/Jobcontext";
import ChatPage from "../components/ChatPage";
import Applicationcontext from "../components/Applicationcontext";

function Appliedjobs(){
    const {currentuser} =useContext(Authcontext)
    const {jobs}= useContext(Jobcontext)

    const {applicationData}=useContext(Applicationcontext)
    const [showchats,setShowchats]=useState(false)
    const [chatemployerId,setChatemployerId]=useState('')
    const [chatemployerName,setchatEmployerName]=useState('')

    const appliedjobs=currentuser?currentuser.appliedjobs:[]

     const jobseekerId = currentuser
        ? (currentuser.id ? String(currentuser.id) : (currentuser._id ? String(currentuser._id) : null))
        : null;

    const handleChatopen=(employerId,company)=>{
        setChatemployerId(employerId)
        setchatEmployerName(company)
        setShowchats(true)
        console.log(`Chat opened  ${chatemployerId} with company ${chatemployerName}  `);
        console.log("Jobseeker ID being passed:", jobseekerId);
        
    }

    const handleCloseChat=()=>{
        console.log("Closed")
        setShowchats(false)
        setChatemployerId('')
        setchatEmployerName('')
    }
    return(
        <div className="flex-1 mx-auto px-8 py-4">
            <h1 className="text-center text-2xl sm:text-4xl font-semibold text-indigo-700 my-10">Applied Jobs</h1>
            {appliedjobs.length==0?(
            <div className='text-sm sm:text-base text-center '>
                <p className="text-red-400">OOPSS...</p>
                <p>You don't have any saved Jobs yet</p>
                <Link to={'/jobs'}><p className="hover:underline">Browse jobs</p></Link>
            </div>):(
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {appliedjobs.map(appliedJobEntry=>{
                    console.log("applied job entry:",appliedJobEntry);
                    
                    const fulljobdetails=jobs.find(job => String(job.id) === String(appliedJobEntry.jobid))
                    
                    const applicationRecord=applicationData.find(app=>String(app.id)===String(appliedJobEntry.applicationRecordId))
                    
                    return(
                <div key={fulljobdetails.id} className='bg-white rounded-lg p-3 sm:p-6 shadow-lg border border-gray-100 '>
                    <h2 className='text-base sm:text-xl font-semibold'>{fulljobdetails.title}</h2>
                    <p className="text-gray-600 text-sm mb-1">
                  <strong>{fulljobdetails.company}</strong> - {fulljobdetails.location} ({fulljobdetails.type})
                </p>
                <p className="text-xs text-gray-500 mb-4">Applied On: {appliedJobEntry.appliedDate}</p>
                <p className='text-gray-700 text-sm mb-4 font-semibold'>
                         Status:{' '}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                     ${applicationRecord.newStatus === 'Pending' ? 'bg-yellow-200 text-yellow-800' : ''}
                                     ${applicationRecord.newStatus === 'Reviewed' ? 'bg-blue-200 text-blue-800' : ''}
                                     ${applicationRecord.newStatus === 'Interview Scheduled' ? 'bg-purple-200 text-purple-800' : ''}
                                     ${applicationRecord.newStatus === 'Accepted' ? 'bg-green-200 text-green-800' : ''}
                                     ${applicationRecord.newStatus === 'Rejected' ? 'bg-red-200 text-red-800' : ''}
                                        `}
                                    >
                                        {applicationRecord.newStatus || 'Pending'} 
                                    </span>
                                </p>
                <div className="flex justify-center items-center">
                    <button className="px-2 py-1 sm:px-6 sm:py-2 bg-blue-700 rounded-3xl text-white font-semibold"
                    onClick={()=>handleChatopen(fulljobdetails.employerId,fulljobdetails.company)}>Chat</button>
                </div>

                </div>
                
                )}
            )}
            
            </div>)}

            {showchats && currentuser && chatemployerId &&(
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-70% sm:w-full max-w-lg h-3/4 flex flex-col">
                        <ChatPage
                            jobseekerId={jobseekerId}
                            employerId={chatemployerId}
                            companyName={chatemployerName}
                            onClose={handleCloseChat}
                            isEmployerChat={false}
                        />
                    </div>
                </div>
    
            )}
        </div>
    )
}
export default Appliedjobs