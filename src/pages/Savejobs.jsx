import React, { useContext } from 'react'
import Authcontext from '../components/Authcontext'
import { Link } from 'react-router-dom'

function Savejobs() {
    const{currentuser,unsave}=useContext(Authcontext)

    const savejobs=currentuser.savedjobs||[]

    if(!currentuser){
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-700">Please log in to view your saved jobs.</p>
      </div>
    );
  }
  
 const handleUnsave=async(unsaveid,jobtitle)=>{
    try{
        await unsave(unsaveid)
        alert(`job Unsaved :${jobtitle}`)
    }
    catch(err){
        console.error(err.message||"Not able to unsave")
    }
 }

  return (
    <div className='mx-auto px-8 py-4'>
        <h1 className='text-center text-4xl font-semibold text-indigo-700 my-10'>Saved Jobs</h1>
        {savejobs.length==0?(
            <div className='text-3xl p-6 text-center '>
                <p>You don't have any saved Jobs yet!</p>
                <Link to={'/job'}><p className='text-blue-400 underline'>Browse jobs</p></Link>
            </div>
        ):
        (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">{savejobs.map(job=>(
            <div key={job.id} className='bg-white rounded-lg p-6 shadow-lg border border-gray-100'>
                <Link to={`/job/${job.id}`}>
                    <h2 className='text-xl font-semibold'>{job.title}</h2>
                    <p className="text-gray-600 text-sm mb-1">
                  <strong>{job.company}</strong> - {job.location} ({job.type})
                </p>
                <p className="text-xs text-gray-500 mb-4">Salary: {job.salary}</p>
                </Link>
                <button onClick={()=>handleUnsave(job.id,job.title)} className='bg-blue-700 text-white font-semibold text-center mx-20 px-4 py-1 rounded-2xl'>Unsave</button>
            </div>
            
        ))}
        </div>)}
      
    </div>
  )
}

export default Savejobs
