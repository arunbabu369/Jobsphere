import React, { useContext, useEffect, useRef, useState } from 'react'
import Authcontext from '../components/Authcontext'
import AddEducationForm from '../components/AddEducationForm'
import AddQualificationForm from '../components/AddQualificationForm'
function Profile() {
    const {currentuser,updatedProfileData}=useContext(Authcontext)
    const[profilePage,setProfilePage]=useState('')
    const[loading,setLoading]=useState(true)
    const[resumeFile,setResumeFile]=useState(null)
    const[isDragging,setIsDragging]=useState(false)
    const dropZoneRef=useRef(null)

    const[isEditing,setIsEditing]=useState(false)
    const[experience,setExperience]=useState([])
    const[education,setEducation]=useState([])

    useEffect(()=>{
        if(currentuser){
            setProfilePage({
                username:currentuser.username,
                email:currentuser.email,
                role:currentuser.role,
                fullname:currentuser.fullname,
                experience:currentuser.experience,
                education:currentuser.education
            })
            setLoading(false)
        }else{
            console.log("User not logged in")
            setLoading(false)
        }

    },currentuser)

    const handleAddQualifiactions=(newQ)=>{
        setExperience((prev)=>[...prev,{...newQ,id: Date.now()}])
    }

    const handleRemoveExperince=(id)=>{
        setExperience(prev=>prev.filter(q=>q.id!==id))
    }

    const handleAddEducation=(newE)=>{
        setEducation((prev)=>[...prev,{...newE,id:Date.now()}])
    }

    const handleDeleteeducation=(id)=>{
        setEducation(prev=>prev.filter(e=>e.id!==id))
    }

    const handleSaveChanges=()=>{
        const updatedProfile={
            experience:experience,
            education:education
        }

        try{
            updatedProfileData(updatedProfile)
            alert("Updated Successfully")
            setIsEditing(false)

        }catch(err){
            console.error("Profile save error:", err);
        }
    }

    const handleCancelChange=()=>{
       if(currentuser){ 
        setExperience(currentuser.experience||[])
        setEducation(currentuser.education||[])
       }
       setIsEditing(false)
    }

    const handleDragEnter=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }
    const handleDragleave=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }
    const handleDragOver=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        e.dataTransfer.dropEffect = 'copy';
    }
    const handleDrop=(e)=>{
         e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        
        const files=e.dataTransfer.files
        if(files && files.length>0){
            const file=files[0]
            if(file.type==='application/pdf'||file.name.endsWith('.pdf')){
                setResumeFile(file)
                console.log("Dropped file:", file.name, file);
            }
            else{
                alert("Please drop a pdf file")
            }
        }
    }

    const handleFileInputChange=(e)=>{
        const files=e.dataTransfer.files
        if(files && files>0){
            const file=files[0]
            if(file==='application/pdf'||file.name.endsWith('.pdf')){
                setResumeFile(file)
                console.log("Dropped file:", file.name, file);
            }
            else{
                alert("Please drop a pdf file")
            }
        }
    }

    if(loading){
         return <div className="text-center py-10">Loading profile...</div>;
    }
     if (!profilePage) {
    return <div className="text-center py-10 text-gray-500">No profile data available.</div>;
  }
  return (
    <>
    {!isEditing ?(
    <div className='flex my-6'>
    <div className='mx-auto px-4 py-10 w-3/4'>
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">My Profile</h1>
        <div className='bg-white p-6 rounded-lg shadow-md mx-auto max-w-2xl'>
          <div className="mb-4">
          <p className="text-gray-900 font-semibold text-center capitalize text-3xl"> {profilePage.fullname}</p>
        </div>  
          <div className="mb-4">
            <label className="block text-gray-700  text-base text-center font-bold mb-2">Username:</label>
            <p className="text-gray-900 text-lg text-center">{profilePage.username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center">Email:</label>
            <p className="text-gray-900 text-lg text-center">{profilePage.email}</p>
          </div>
          
        </div>  
        <div className="bg-white p-6 rounded-lg shadow-md mx-auto max-w-2xl mt-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
            {experience.length>0?(
                <ul>
                    {experience.map(q=>(
                    <li key={q.id} className="mb-3 p-2 border-b border-gray-200 last:border-b-0">
                      <p className="font-semibold text-lg">{q.title}</p>
                      <p className="text-gray-700">{q.institution} ({q.year})</p>
                      {q.description && <p className="text-gray-600 text-sm mt-1">{q.description}</p>}
                  </li>
                    ))}
                </ul>
            ):(
                <p className="text-gray-500">No Experience added yet.</p>
            )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mx-auto max-w-2xl mt-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
            {education.length > 0 ? (
              <ul>
                {education.map(edu => (
                  <li key={edu.id} className="mb-3 p-2 border-b border-gray-200 last:border-b-0">
                    <p className="font-semibold text-lg">{edu.degree} ({edu.major})</p>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-gray-600 text-sm">{edu.startYear} - {edu.endYear}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No education added yet.</p>
            )}
          </div>
       
        
        <div className="text-center mt-6 py-6">
        <button onClick={()=>setIsEditing(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Edit Profile
        </button>
      </div>
      </div>
       <div className='bg-white p-6 rounded-lg w-1/4 shadow-md mx-auto h-full max-w-2xl mt-8'>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Resume</h2>
            <div 
            ref={dropZoneRef}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragleave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={()=>dropZoneRef.current.querySelector('input[type="file"]').click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
            ${isDragging}?'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'`}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInputChange}
                className="hidden" 
          />
           {resumeFile ?
           (<div>
              <div>
              <p className="text-lg font-semibold text-gray-800">File selected: {resumeFile.name}</p>
              <p className="text-sm text-gray-500 mt-2">Click to change or drag a new one.</p>
            </div>
           </div>):(
            <div>
              <p className="text-lg text-gray-700 mb-2">Drag &amp; drop your resume here, or <span className="text-indigo-600 font-semibold">click to select</span></p>
              <p className="text-sm text-gray-500">(PDF files only)</p>
            </div>
           )}
           
            </div>
            
        </div>
      </div>):
      ( 
      <div className="bg-white p-6 rounded-lg shadow-md mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-8">Edit Profile</h2>
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
            <p className="text-gray-600">Full Name: {profilePage.fullname}</p>
            <p className="text-gray-600">Username: {profilePage.username}</p>
            <p className="text-gray-600">Email: {profilePage.email}</p>
        </div>
        <div className="mb-8 border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Experience</h3>
            {experience.map(q => (
              <div key={q.id} className="border p-3 mb-2 rounded bg-gray-50 flex justify-between items-center">
                <span>{q.title} ({q.company}, {q.year})</span>
                <button
                  onClick={() => handleRemoveExperience(q.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <AddQualificationForm onAdd={handleAddQualifiactions} />
          </div>
          <div className="mb-8 border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="border p-3 mb-2 rounded bg-gray-50 flex justify-between items-center">
                <span>{edu.degree} from {edu.institution} ({edu.startYear}-{edu.endYear})</span>
                <button
                  onClick={() => handleDeleteeducation(edu.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <AddEducationForm onAdd={handleAddEducation} />
            </div>

          <div className="text-center mt-6 flex justify-center space-x-4">
            <button
              onClick={handleSaveChanges} 
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Changes
            </button>  
        <button onClick={handleCancelChange} className='px-4 py-2 bg-blue-600 text-white'>Cancel</button>
      </div>
      </div>)}
    </>
  )
}

export default Profile
