import React, { useContext, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Jobcontext from '../components/Jobcontext'

function PostnewJob() {
    const {currentuser}=useAuth()
    const {refreshjobs}=useContext(Jobcontext)
    const[jobsdata,setjobsdata]=useState({
        title:'',
        company:'',
        location:'',
        type:'Full-time',
        salary:'',
        experience:'',
        remoteHybrid:'hybrid',
        description:'',
        applicationDeadline: '',
        requiredSkills: [], 
    })
    const[errors,setError]=useState({})
    const[successmsg,setSuccessmsg]=useState('')
    
    const handleChange=(e)=>{
        const { name,value }= e.target
        setjobsdata({...jobsdata,[name]:value})
        if(errors[name]){
            setError(prev=>({...prev,[name]:''}))
        }
    }
    const handleskilledChange=(e)=>{
        const inputskills=e.target.value
        const stringskills=inputskills.split(',').map(s=>s.trim()).filter(s=>s)
        setjobsdata({...jobsdata,requiredSkills:stringskills})
         if (errors.requiredSkills) {
            setError(prev => ({ ...prev, requiredSkills: '' }));
        }
    }
    const validateForm=()=>{
        const newErrors={}
        if(!jobsdata.title.trim()) newErrors.title="Job title is required."
        if(!jobsdata.company.trim()) newErrors.company="Company name is required."
        if(!jobsdata.location.trim()) newErrors.location="Job Location is required."
        if(!jobsdata.type.trim()) newErrors.type="Job type is required."
        if(!jobsdata.experience.trim()) newErrors.experience="Experience is required."
        if(!jobsdata.description.trim()) newErrors.description="Job title is required."

        setError(newErrors)
        return Object.keys(newErrors).length===0
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setError({})
        setSuccessmsg('')

        if (!currentuser || currentuser.role !== 'employer') {
            setError(prev => ({ ...prev, general: 'You must be logged in as an employer to post jobs.' }));
            return;
        }
        if(validateForm()){
            const newJob={
                ...jobsdata,
                id:Date.now().toString(),
                employerId:currentuser.id,
                date:new Date().toISOString().split('T')[0],
                applicants:[],
                views: 0,
                applicationsCount: 0,
            }
            try{
                const jobs=JSON.parse(localStorage.getItem('jobs'))||[]
                jobs.push(newJob)
                localStorage.setItem('jobs',JSON.stringify(jobs))
                setSuccessmsg("Successfully Added job")
                refreshjobs()
                setjobsdata({title:'',
                            company:'',
                            location:'',
                            type:'Full-time',
                            salary:'',
                            experience:'',
                            remoteHybrid:'hybrid',
                            description:'',
                            applicationDeadline: '',
                            requiredSkills: [], })
                
            }catch(error){
                console.error("Error saving job to localStorage:", error);
                setError(prev => ({ ...prev, general: 'Failed to post job. Please try again.' }));
            }
        }
    }
    
  return (
    <div className='bg-white rounded-xl p-8 mx-auto mt-10 sm:mt-6'>
      <h1 className='text-2xl font-inter font-semi-bold mb-4 text-center'>Post New Job</h1>
      {successmsg && <p className="text-green-600 text-center mb-4">{successmsg}</p>}
      {errors.general && <p className="text-red-600 text-center mb-4">{errors.general}</p>}

       <form onSubmit={handleSubmit} className="space-y-4">
                <div className="">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">Job Title:</label>
                    <input type="text" id="title" name="title" value={jobsdata.title} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className="">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">Company Name:</label>
                    <input type="text" id="company" name="company" value={jobsdata.company} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>
                <div className="">
                    <label htmlFor="location" className="block text-gray-700 font-semibold mb-1">Job Location:</label>
                    <input type="text" id="location" name="location" value={jobsdata.location} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
                <div className="">
                    <label htmlFor="type" className="block text-gray-700 font-semibold mb-1">Job Type:</label>
                    <select id="type" name="type" value={jobsdata.type} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                </div>
                <div className="">
                    <label htmlFor="Salary" className="block text-gray-700 font-semibold mb-1">Salary:</label>
                    <input type="text" id="salary" name="salary" value={jobsdata.salary} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
                </div>
                <div className="">
                    <label htmlFor="experience" className="block text-gray-700 font-semibold mb-1">Experience Required:</label>
                    <input type="text" id="experience" name="experience" value={jobsdata.experience} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>
                <div className="">
                    <label htmlFor="remoteHybrid" className="block text-gray-700 font-semibold mb-1">Working type:</label>
                    <select id="remoteHybrid" name="remoteHybrid" value={jobsdata.remoteHybrid} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                        <option value="Off-site">Off-site</option>
    
                    </select>
                    {errors.remoteHybrid && <p className="text-red-500 text-sm mt-1">{errors.remoteHybrid}</p>}
                </div>
                <div className="">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">Description:</label>
                    <textarea id="description" name="description" value={jobsdata.description} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="applicationDeadline" className="block text-gray-700 font-semibold mb-1">Application Deadline:</label>
                    <input type="date" id="applicationDeadline" name="applicationDeadline" value={jobsdata.applicationDeadline} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {errors.applicationDeadline && <p className="text-red-500 text-sm mt-1">{errors.applicationDeadline}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="requiredSkills" className="block text-gray-700 font-semibold mb-1">Required Skills (comma-separated):</label>
                    <input type="text" id="requiredSkills" name="requiredSkills" value={jobsdata.requiredSkills.join(', ')} 
                        placeholder="e.g., React, JavaScript, Node.js"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        onChange={handleskilledChange}/>
                </div>
                <button type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Post Job
                </button>
      </form>
    </div>
  )
}

export default PostnewJob
