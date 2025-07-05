import React, { Children, createContext, useEffect, useMemo, useState } from "react";

const Announcementcontext=createContext()


export const AnnoncementProvider =({Children})=>{
    const [announcements,setAnnouncements]=useState([])
    const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

    useEffect(()=>{
        setLoadingAnnouncements(true)
        try{
            const storedAnnuncements=JSON.parse(localStorage.getItem('announcements'))
            setAnnouncements(storedAnnuncements)
        }catch(err){
            console.error("Error loading announcements from localStorage:", err);
            setAnnouncements([]);
        } finally {
            setLoadingAnnouncements(false);
        }
    },[])

    const addAnnouncement=(announcementText,adminId)=>{
        const newAnnouncement={
            id:`announcement${Date.now()}`,
            text:announcementText,
            postedby:adminId,
            postedDate: new Date().toISOString().split('T')[0], 
            isActive: true,
        }
        setAnnouncements(prevAnnouncements=>{
            const updatedAnnouncements=[...prevAnnouncements,newAnnouncement]
            localStorage.setItem('announcements',JSON.stringify(updatedAnnouncements))
            return updatedAnnouncements
        })
        return newAnnouncement
    }

    const AnnouncementcontextValue=useMemo(()=>(
        {
            announcements,
            loadingAnnouncements,
            addAnnouncement,

        }
    ))


    return (
        <Announcementcontext.Provider value={AnnouncementcontextValue}>
            {Children}
        </Announcementcontext.Provider>
    )
}
export default Announcementcontext