import React,{useState,useEffect, useContext} from 'react'
import Jobcard from '../components/jobcard'
import Pagination from '../components/Pagination'
import Jobcontext from '../components/Jobcontext'



function Searchjobpage() {
  const {jobs}=useContext(Jobcontext)||[]
 
  const[searchterm,setSearchterm]=useState('')
  const[locationfilter,setLocationfilter]=useState('')
  const[salaryFilter,setSalaryfilter]=useState('')
  const[typefilter,setTypefilter]=useState('')
  const[experiencefilter,setexperienceFilter]=useState('')
  const[remoteHybridFilter,setRemoteHybridFilter]=useState('')
  const[filteredjobs,setFilteredjobs]=useState([])
  const[jobsperpage]=useState(6)
  const[currentpage,setCurrentpage]=useState(1)

  const[showMobileFilters,setShowMobileFilters]=useState(false)

   useEffect(() => {
    if (jobs && jobs.length > 0) {
      setFilteredjobs(jobs);
      setCurrentpage(1); 
    } else if (jobs) { 
        setFilteredjobs([]);
        setCurrentpage(1);
    }
  }, [jobs]);

  useEffect(()=>{
    const applyfilters=()=>{
      let tempjobs=jobs;

      if(searchterm){
        tempjobs=tempjobs.filter((job)=>
          job.title.toLowerCase().includes(searchterm.toLowerCase())||
          job.company.toLowerCase().includes(searchterm.toLowerCase())||
          job.description.toLowerCase().includes(searchterm.toLowerCase())
         )}

      if(locationfilter){
        tempjobs=tempjobs.filter((job=>
          job.location.toLowerCase().includes(locationfilter.toLowerCase())
        ))
      }   

      if(salaryFilter){
        tempjobs=tempjobs.filter((job)=>job.salary.includes(salaryFilter))
        console.log(tempjobs)
      }   

      if(typefilter && typefilter!=='any'){
        tempjobs=tempjobs.filter((job)=>job.type===typefilter)
      }
      if(experiencefilter && experiencefilter!=='All'){
        tempjobs=tempjobs.filter((job)=>job.experience===experiencefilter)
      }
      if(remoteHybridFilter && remoteHybridFilter!=='All'){
        tempjobs=tempjobs.filter((job)=>job.remoteHybrid===remoteHybridFilter)
      }
      setFilteredjobs(tempjobs)
    }
    const handler=setTimeout(() => {
      applyfilters()
    }, 500);

    return ()=>clearTimeout(handler)
      
  },[searchterm,locationfilter,salaryFilter,typefilter,experiencefilter,remoteHybridFilter])

  const indexOfLastjob=currentpage * jobsperpage
  const indexoffirstjob= indexOfLastjob - jobsperpage
  const currentjobs= filteredjobs.slice(indexoffirstjob,indexOfLastjob)

  const paginate = (pageNumber) => setCurrentpage(pageNumber);

  const mockSuggestion=searchterm?
  jobs.filter((j)=>j.title.toLowerCase().includes(searchterm.toLowerCase()))
  .map(j=>j.title)
  :[] 
    
  return (
    <>
    <h1 className='text-center text-3xl sm:text-5xl font-semibold text-indigo-700 my-4 sm:my-6 '>Discover Your Dream Job</h1>
   
    <div className='relative flex flex-col md:flex-row mx-auto'>
      



      <div className={`p-6 sm:p-6 rounded-md shadow-md hidden md:block  md:w-1/4 top-6 self-start ${showMobileFilters ?'block':'hidden'}  md:sticky md:top-6`}>
        <h2 className='font-inter text-sm sm:text-xl text-center'>Filters</h2>
        
        <div className='mb-6'>
          <label htmlFor="type" className='text-xs sm:text-md font-inter text-gray-700'>Job Type:</label>
          <select name="" id="salary"
           className="w-full p-0 sm:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           value={typefilter}
           onChange={(e)=>setTypefilter(e.target.value)}>
             <option className='text-xs sm:text-base' value="any">any</option>
             <option className='text-xs sm:text-base' value="Full-time">Full-time</option>
             <option className='text-xs sm:text-base' value="Part-time">Part-time</option>
             <option className='text-xs sm:text-base' value="Internship">Internship</option>
             <option className='text-xs sm:text-base' value="Contract">Contract</option>
           </select>
        </div>
        <div className="mb-6">
            <label htmlFor="experience" className="block text-gray-700 text-lg font-medium mb-2">Experience Level</label>
            <select
              id="experience"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={experiencefilter}
              onChange={(e) => setexperienceFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="remoteHybrid" className="block text-gray-700 text-lg font-medium mb-2">Work Arrangement</label>
            <select
              id="remoteHybrid"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={remoteHybridFilter}
              onChange={(e) => setRemoteHybridFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
      </div>

      
    
      <div className='w-full md:w-3/4 p-2 sm:p-6'>
       <div className='bg-white p-6 rounded-lg shadow-md mb-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-4'>
      <div className='relative flex-grow'>
        <input type="text" 
          placeholder='Search by keyword,title,company..'
          className="w-full text-sm sm:text-base p-1 sm:p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchterm}
          onChange={(e)=>setSearchterm(e.target.value)}/>
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>  
        {searchterm && mockSuggestion.length>0 &&(
          <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg'>
            {mockSuggestion.map((suggestion,index)=>(
               <li key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                  onClick={() => setSearchterm(suggestion)}>
                    {suggestion}
                  </li>
            ))}
          </ul>
        )}
      </div>
      <div className='relative flex-grow'>
        <input type="text"
        placeholder='Search by location' 
        className="w-full text-sm  p-1 sm:p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={locationfilter}
        onChange={(e)=>setLocationfilter(e.target.value)}
        />
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      </div>
    </div>
    <div className="md:hidden p-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="bg-blue-400 text-white px-2 py-1 rounded-md shadow"
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
       {showMobileFilters && (
        <div className=" bg-white border shadow-lg p-4 md:hidden">
          {/* your filter form fields here */}
          <div className="mb-4">
            <label className="block font-medium">Job Type</label>
            <select name="" id="salary"
           className="w-full p-0 sm:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           value={typefilter}
           onChange={(e)=>setTypefilter(e.target.value)}>
             <option className='text-xs sm:text-base' value="any">any</option>
             <option className='text-xs sm:text-base' value="Full-time">Full-time</option>
             <option className='text-xs sm:text-base' value="Part-time">Part-time</option>
             <option className='text-xs sm:text-base' value="Internship">Internship</option>
             <option className='text-xs sm:text-base' value="Contract">Contract</option>
           </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium">Experience</label>
            <select
              id="experience"
              className="w-full p-0 sm:p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={experiencefilter}
              onChange={(e) => setexperienceFilter(e.target.value)}
            >
              <option className='text-xs sm:text-base' value="All">All</option>
              <option className='text-xs sm:text-base' value="Less than 1 year">Less than 1 year</option>
              <option className='text-xs sm:text-base' value="1-3 years">1-3 years</option>
              <option className='text-xs sm:text-base' value="3-5 years">3-5 years</option>
              <option className='text-xs sm:text-base' value="5+ years">5+ years</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium">Work Arrangement</label>
            <select
              id="remoteHybrid"
              className="w-full p-0 sm:p-2border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={remoteHybridFilter}
              onChange={(e) => setRemoteHybridFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        </div>
      )}
       {currentjobs.length>0?(
        <div className="grid grid-cols-2 gap-2 p-4  ">
        {currentjobs.map(job=>(
            <Jobcard key={job.id} job={job} />
        ))}
        </div>):(<p>No Search result Found</p>)}
      </div>
      </div>
      <Pagination
       jobperpage={jobsperpage}
       totaljobs={filteredjobs.length}
       paginate={paginate}
       currentpage={currentpage}

       />
    </>
  )
}

export default Searchjobpage
