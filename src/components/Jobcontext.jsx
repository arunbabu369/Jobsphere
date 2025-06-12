import React, { createContext, useEffect, useState } from "react";

const Jobcontext=createContext()

const mockJobs=[  {
    id: 'job1',
    title: 'Senior React Developer',
    company: 'Tech Innovations Inc.',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    experience: '5+ years',
    remoteHybrid: 'Remote',
    description: 'We are seeking a highly skilled Senior React Developer to join our dynamic team. You will be responsible for developing and maintaining our cutting-edge web applications.',
    companyRating: '4.5',
    companySize: '500-1000',
    date:'12-06-2025'
  },
  {
    id: 'job2',
    title: 'Product Manager',
    company: 'Global Solutions Ltd.',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    experience: '3-5 years',
    remoteHybrid: 'Hybrid',
    description: 'Lead the product lifecycle from conception to launch, working closely with engineering, marketing, and sales teams to deliver innovative solutions.',
    companyRating: '4.2',
    companySize: '1000-5000',
    date:'12-05-2024'
  },
  {
    id: 'job3',
    title: 'UX/UI Designer',
    company: 'Creative Minds Studio',
    location: 'London, UK',
    type: 'Contract',
    salary: '$60 - $80/hour',
    experience: '2-4 years',
    remoteHybrid: 'On-site',
    description: 'Design intuitive and aesthetically pleasing user interfaces. Collaborate with stakeholders to translate concepts into wireframes and mockups.',
    companyRating: '4.8',
    companySize: '50-200',
    date:'12-06-2024'
  },
  {
      id: 'job4',
      title: 'Data Scientist',
      company: 'AnalyzeX Corp.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      experience: '3+ years',
      remoteHybrid: 'Hybrid',
      description: 'Utilize statistical analysis and machine learning to derive insights from complex datasets and build predictive models.',
      companyRating: '4.3',
      companySize: '200-500',
      companyLogo: 'https://via.placeholder.com/50x50?text=AX',
      date:'12-06-2025'
    },
    {
      id: 'job5',
      title: 'Marketing Specialist',
      company: 'BrandBoost Agency',
      location: 'Remote',
      type: 'Full-time',
      salary: '$60,000 - $80,000',
      experience: '1-3 years',
      remoteHybrid: 'Remote',
      description: 'Develop and execute marketing campaigns across various channels, analyze performance, and contribute to brand growth.',
      companyRating: '4.0',
      companySize: '10-50',
      companyLogo: 'https://via.placeholder.com/50x50?text=BB',
      date:'2-06-2025'
    },
    {
      id: 'job6',
      title: 'DevOps Engineer',
      company: 'CloudNative Solutions',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      experience: '4+ years',
      remoteHybrid: 'On-site',
      description: 'Build and maintain scalable and reliable infrastructure. Implement CI/CD pipelines and automate deployment processes.',
      companyRating: '4.6',
      companySize: '500-1000',
      companyLogo: 'https://via.placeholder.com/50x50?text=CN',
      date:'1-06-2025'
    },
    {
      id: 'job7',
      title: 'Customer Success Manager',
      company: 'ClientFirst Software',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$70,000 - $90,000',
      experience: '2+ years',
      remoteHybrid: 'Hybrid',
      description: 'Manage client relationships, ensure customer satisfaction, and drive product adoption. Act as a liaison between clients and internal teams.',
      companyRating: '4.1',
      companySize: '50-200',
      companyLogo: 'https://via.placeholder.com/50x50?text=CF',
      date:'12-04-2025'
    },
    {
      id: 'job8',
      title: 'Mobile App Developer',
      company: 'AppGenius Labs',
      location: 'Remote',
      type: 'Full-time',
      salary: '$115,000 - $145,000',
      experience: '3+ years',
      remoteHybrid: 'Remote',
      description: 'Develop and maintain high-performance mobile applications for iOS and Android platforms using React Native.',
      companyRating: '4.7',
      companySize: '200-500',
      companyLogo: 'https://via.placeholder.com/50x50?text=AG',
      date:'12-06-2025'
    },]

    export const JobProvider=({children})=>{
    const[jobs,setJobs]=useState([])
    const[loadingjobs,setLoadingjob]=useState(true)

   
      const loadAllJobs=()=>{
        setLoadingjob(true)
        try{
        const postjobs=JSON.parse(localStorage.getItem('jobs'))||[]
        const allcombinedjobs=[...mockJobs,...postjobs]
        setJobs(allcombinedjobs)
        setLoadingjob(false)
      }catch(err){
        console.error(err.message||'Jobs not appended')
        setJobs(mockJobs)
      }finally{
        setLoadingjob(false)
      }
      
    }
     useEffect(() => {
        loadAllJobs();
    }, []);
  

    const deletejob=(jobid)=>{
      try{
        const currentJobs=JSON.parse(localStorage.getItem('jobs'))||[]
        const updatedjob=currentJobs.filter(j=>j.id!==jobid)
        setJobs(updatedjob)
        localStorage.setItem('jobs',JSON.stringify(updatedjob))
        return true
      }catch(error){
        console.error(error,"Error deleting job from localstorage")
      }
    }

    const updatedJob=(jobupdated)=>{
      try{
        const currentJobs=JSON.parse(localStorage.getItem('jobs'))||[]
        const jobindex=currentJobs.findIndex(j=>j.id===jobupdated.id)
        console.log("current index:",jobindex)
        if(jobindex>-1){
          currentJobs[jobindex]=jobupdated
          localStorage.setItem('jobs',JSON.stringify(currentJobs))
          console.log("successfully updated job:",currentJobs.jobindex)
          refreshjobs()
          return true
        } 
        else{
          console.warn(`job with ${jobupdated.id} not found`)
        }
      }catch(error){
        console.error(error,"Error updating job from localstorage")
      }
    }

    const refreshjobs=()=>{
      setLoadingjob(true)
      loadAllJobs()
    }



    const jobcontextvalue={
      jobs,loadingjobs,deletejob,updatedJob,refreshjobs
    }
      return(
        <>
            <Jobcontext.Provider value={jobcontextvalue}>
                {loadingjobs?<div>Loading jobs</div>:children}
            </Jobcontext.Provider>
        </>
      )
    }
  export default Jobcontext 