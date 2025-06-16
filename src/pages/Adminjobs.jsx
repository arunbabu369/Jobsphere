import React, { useContext } from "react";
import Jobcontext from "../components/Jobcontext";

const Adminjobs=()=>{
    const {jobs,deletejob}=useContext(Jobcontext)
    
    const handleDelete=(jobid)=>{
        if(!window.confirm("Are You Sure You want to delete the job")){
            return
        }
        const success=deletejob(jobid)
        if(success){
            alert("Successfully deleted")
        }
        
    }
    return(
        <div className="mx-auto px-4 py-6 bg-white">
            
            {jobs.length>0 ?(
                <div>
                    <table>
                        <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Deadline</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                 {jobs.map((job) => (
                                     <tr key={job.id}>
                                        <td className="px-6 py-4  text-sm font-medium text-gray-900">{job.id.substring(0, 8)}...</td>
                                         <td className="px-6 py-4  text-sm text-gray-900">{job.title}</td>
                                         <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{job.company}</td>
                                         <td className="px-6 py-4  text-sm text-gray-900">{job.location}</td>
                                         <td className="px-6 py-4  text-sm text-gray-500">{job.employerId || 'N/A'}</td>
                                         <td className="px-6 py-4  text-sm text-gray-900">{job.applicationDeadline||'N/A'}</td>
                                         <td> <button className="bg-red-400 p-2 text-white rounded-2xl" onClick={()=>handleDelete(job.id)}>Delete</button></td>
                                     </tr>
                                 ))}
                            </tbody>
                    </table>
                </div>
            ):(<div>
                <p>No Jobs Posted</p>
            </div>

            )}
        </div>
    )
}
export default Adminjobs