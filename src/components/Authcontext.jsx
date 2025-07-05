import { updateDoc } from "firebase/firestore/lite";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Applicationcontext from "./Applicationcontext";

const Authcontext=createContext()


const hashmockPassword =(password)=>{
    return btoa(password)
}

export const Authprovider=({children})=>{
    console.count('Authprovider Renders')
    const[currentuser,setCurrentuser]=useState('')
    const[loading,setloading]=useState(true)
    const {addApplicationrecord}=useContext(Applicationcontext)
    

    useEffect(()=>{
        const storedUsers=localStorage.getItem('currentuser')

        if(storedUsers){
            try{
            const parsedUser=JSON.parse(storedUsers)
            if(!parsedUser.savedjobs) parsedUser.savedjobs=[]
            if(!parsedUser.appliedjobs) parsedUser.appliedjobs=[]
            setCurrentuser(parsedUser)
            }
            catch(error){
                console.error("Error parsing stored user data from localStorage:",error)
            }
        }
        setloading(false)
    },[])

    useEffect(()=>{
        const ADMIN_EMAIL='admin@gmail.com'
        const ADMIN_PASS='admin1234'

        const users=JSON.parse(localStorage.getItem('users'))||[]
        const adminfound=users.find(user=>user.email===ADMIN_EMAIL && user.password===ADMIN_PASS)
        if(!adminfound){
            console.log("Admin user not found. looking default admin user.");
            const hashedmockPassword=hashmockPassword(ADMIN_PASS)
            const new_admin={
                id:'admin_'+Date.now(),
                username:'admin12',
                password:hashedmockPassword,
                fullname:'Administrator',
                role:'admin',
                email:ADMIN_EMAIL
            }
            users.push(new_admin)
            localStorage.setItem('users',JSON.stringify(users))
        }
        setloading(false)
    },[])

    const register=useCallback((username,password,email,role='jobseeker',companyname='',fullname)=>{
        console.log("Register: Attempting to get 'users' from localStorage.");
        let users=JSON.parse(localStorage.getItem('users'))||[]
        if(users.some(user=>user.email===email)){
            throw new Error("User with email already exists")
        }
        const newuser={
            username,
            email,
            password:hashmockPassword(password),
            id:Date.now().toString(),
            savedjobs:[],
            appliedjobs:[],
            role:role,
            companyname: role === 'employer' ? companyname : '',
            fullname,
            experience:[],
            education:[],
            lastReadTimeStamps:{}
        }
        users.push(newuser)
        localStorage.setItem('users',JSON.stringify(users))
        setCurrentuser(newuser)
        localStorage.setItem('currentuser',JSON.stringify(newuser))
        return newuser
    },[setCurrentuser])
    const login=useCallback((email,password)=>{
        let users=JSON.parse(localStorage.getItem('users'))||[]
        const enteredHashPass=hashmockPassword(password)
        const founduser=users.find(user=>
            user.email===email && user.password===enteredHashPass)
        console.log(founduser);
            

        if(founduser){
            setCurrentuser(founduser)
            localStorage.setItem('currentuser',JSON.stringify(founduser))
            return founduser
        }else{
            throw new Error("Invalid Username Or Password")
        }
    },[setCurrentuser])

    const logout=useCallback(()=>{
        setCurrentuser('')
        localStorage.removeItem('currentuser')
    },[setCurrentuser])

    const savejob=useCallback((jobTosave)=>{
        if(!currentuser){
            throw new Error("You must logged into saveJobs");
        }
        const users=JSON.parse(localStorage.getItem('users'))

        const userIndex=users.findIndex(user=>user.id===currentuser.id)
    

        const isJobsaved=users[userIndex].savedjobs.some(j=>j.id===jobTosave.id)
        
        

        if(isJobsaved){
            throw new Error("Job Already saved")
        }

        users[userIndex].savedjobs.push(jobTosave)
        

        localStorage.setItem('users',JSON.stringify(users))

        const updatedCurrentuser={...currentuser,savedjobs:[...currentuser.savedjobs,jobTosave]}
        setCurrentuser(updatedCurrentuser)
        localStorage.setItem('currentuser',JSON.stringify(updatedCurrentuser))
        
        return updatedCurrentuser.savedjobs

    },[currentuser,setCurrentuser])
    const unsave=useCallback((jobidTounsave)=>{
         if(!currentuser){
            throw new Error("You must logged into saveJobs");
        }
        const users=JSON.parse(localStorage.getItem('users'))

        const userIndex=users.findIndex(user=>user.id===currentuser.id)
    

        const updatedsavedjobs=users[userIndex].savedjobs.filter(j=>j.id!==jobidTounsave)
        
        


        users[userIndex].savedjobs=updatedsavedjobs
        localStorage.setItem('users',JSON.stringify(users))

        const updatedCurrentuser={...currentuser,savedjobs:updatedsavedjobs}
        setCurrentuser(updatedCurrentuser)
        localStorage.setItem('currentuser',JSON.stringify(updatedCurrentuser))
        
        return updatedCurrentuser.savedjobs


    },[currentuser,setCurrentuser])

    const applyJob=useCallback((jobApplicationform)=>{
         if(!currentuser){
            throw new Error("You must logged into saveJobs");
        }
        console.log("--- applyJob Check ---");
        
        const isApplied=currentuser.appliedjobs.some((appliedjob)=>{String(appliedjob.id)===String(jobApplicationform.id)
            
        })

        if(isApplied){
            
            throw new Error("You have already applied for this job.");
        }
        const newApplicationrecord=addApplicationrecord(
            {
                jobid:jobApplicationform.jobId,
                jobtitle:jobApplicationform.jobtitle,
                company: jobApplicationform.company,
                employerId: jobApplicationform.employerId, // Link application to the employer who posted the job
                applicantId: currentuser.id, // ID of the job seeker who applied
                applicantName:jobApplicationform.applicantName || currentuser.username,
                applicantEmail:jobApplicationform.applicantEmail || currentuser.email,
                resumeLink: jobApplicationform.resumeLink,
                
            }
        )
        console.log("Appliction:",newApplicationrecord);
        
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.id === currentuser.id);

        if (userIndex === -1) {
            throw new Error("Current user not found in user database during job application.");
        }
        if (!users[userIndex].appliedjobs) users[userIndex].appliedjobs = [];

        const jobSeekerAppliedJobEntry = {
            jobid: jobApplicationform.jobId, 
            jobtitle: jobApplicationform.jobtitle,
            company: jobApplicationform.company,
            applicationRecordId: newApplicationrecord.id,
            appliedDate: newApplicationrecord.applicationDate 
        };

        users[userIndex].appliedjobs.push(jobSeekerAppliedJobEntry); 
        localStorage.setItem('users', JSON.stringify(users)); 

        const updatedCurrentUser = { ...currentuser, appliedjobs: [...currentuser.appliedjobs, jobSeekerAppliedJobEntry] };
        setCurrentuser(updatedCurrentUser);
        localStorage.setItem('currentuser', JSON.stringify(updatedCurrentUser));
        console.log(`User ${currentuser.id} applied to job ${jobApplicationform.jobId}.`);

        return newApplicationrecord;
    

    },[currentuser,setCurrentuser,addApplicationrecord])

    const updatedProfileData=useCallback((updatedData)=>{
        if (!currentuser) {
            console.warn("Attempted to update profile data for a non-existent user.");
            return;
        }

        const updatedCurrentuser={...currentuser,...updatedData}
        setCurrentuser(updatedCurrentuser)
        localStorage.setItem('currentuser',JSON.stringify(updatedCurrentuser))

        let users = JSON.parse(localStorage.getItem('users'))|| [];
        const userIndex = users.findIndex(user => user.id === currentuser.id);
        if(userIndex!==-1){
            users[userIndex]=updatedCurrentuser
            localStorage.setItem('users',JSON.stringify(users))
            console.log("Profile data updated in localStorage for all users.");
        }else{
            console.log("Not current user")
        }
        return updatedCurrentuser
    },[currentuser,setCurrentuser])


    const updateLastReadTimeStamp=(userId, conversationKey, timestamp)=>{
        const storedUsers=JSON.parse(localStorage.getItem('users')||[])
        const userIndex=storedUsers.findIndex(user=>String(user.id)===String(userId))

        if(userIndex!==-1){
            const userToupdate=storedUsers[userIndex]
            if(!userToupdate.lastReadTimeStamps){
                userToupdate.lastReadTimeStamps={}
            }
            userToupdate.lastReadTimeStamps[conversationKey]=timestamp
            localStorage.setItem('users',JSON.stringify(storedUsers))

            const currentUserData = localStorage.getItem('currentuser');
            const storedCurrentUser = currentUserData ? JSON.parse(currentUserData) : null;
            if (storedCurrentUser && String(storedCurrentUser.id) === String(userId)) {
                if (!storedCurrentUser.lastReadTimestamps) {
                    storedCurrentUser.lastReadTimestamps = {};
                }
                storedCurrentUser.lastReadTimestamps[conversationKey] = timestamp;
                localStorage.setItem('currentuser', JSON.stringify(storedCurrentUser));
        }
    }
}

    const authValue=useMemo(()=>({
        currentuser,
        loading,
        register,
        login,
        logout,
        savejob,
        applyJob,
        unsave,
        updatedProfileData,
        updateLastReadTimeStamp

    }),[currentuser,loading, register,login,logout,savejob,applyJob,unsave])

    return(
        <Authcontext.Provider value={authValue}>
            {!loading && children}
        </Authcontext.Provider>
    )

}
export default Authcontext