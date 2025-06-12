import React, { createContext, useState, useEffect, useMemo } from "react";

const Applicationcontext=createContext()

export const ApplicantProvider=(({children})=>{
    console.count('ApplicantProvider Renders')
    const[applicationData,setApplicationdata]=useState([])
    const[appLoading,setApploading]=useState(true)

    useEffect(()=>{
        setApploading(true)
        try{
            const storedApplications=JSON.parse(localStorage.getItem('allApplications'))
            setApplicationdata(storedApplications?storedApplications:[])
        }catch(err){
            console.error("Error loading all job applications from localStorage:", err);
            setApplicationdata([])
        }finally{
            setApploading(false)
        }
    },[])
    const addApplicationrecord=(applicationData)=>{
        const newApplication={
            ...applicationData,
            id:Date.now().toString(),
            applicationDate: new Date().toISOString().split('T')[0]
        }
        setApplicationdata((prevdata)=>{
            const updatedApplications=[...prevdata||[],newApplication]
            localStorage.setItem('allApplications',JSON.stringify(updatedApplications))
            return updatedApplications
        })
        return newApplication
    }
    const applicantContextValue= useMemo(()=>({
        applicationData,
        addApplicationrecord,
        appLoading
    }),[applicationData,appLoading])

    return(
        <Applicationcontext.Provider value={applicantContextValue}>
            {children}
        </Applicationcontext.Provider>
    )

})
export default Applicationcontext