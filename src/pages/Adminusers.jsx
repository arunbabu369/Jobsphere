import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../components/Authcontext";

const Adminusers=()=>{
    const {currentuser,loading}=useContext(Authcontext)

    const[users,setUsers]=useState([])
    const [loadingData, setLoadingData] = useState(true);
    const[filterRole,setFilterrole]=useState('all')

    useEffect(()=>{
        const storedUsers=JSON.parse(localStorage.getItem('users'))
        setUsers(storedUsers)
        setLoadingData(false)

    },[currentuser,loading])

     if (!currentuser || currentuser.role !== 'admin') {
        return null; 
    }

    const jobseekers=users.filter(user=>user.role==='jobseeker' )
    const employer=users.filter(user=>user.role==='employer')



    const filtereduser=users.filter(user=>{
        if(filterRole==='all'){
            return true
        }
        return user.role===filterRole
    })

    const handleDelete=(uid)=>{
        if(!window.confirm("Are You Sure You want to delete the user,It cant be undone")){
            return
        }
        const updateduser=users.filter(user=>user.id!==uid)

        localStorage.setItem('users',JSON.stringify(updateduser))
        setUsers(updateduser)
        alert("deleted Successfully")
    }

    const Usertable=({title,userdata})=>(
        <section className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-3xl text-blue-600 p-4">{title} ({userdata.length})</h2>
            {userdata.length > 0 ?(
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">ID</th>
                                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Username</th>
                                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">email</th>
                                {title.includes('Job Seeker') && (
                                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Fullname</th>
                                )}
                                {title.includes('Employer') &&(
                                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Company Name</th>
                                )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {userdata.map((user)=>(
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                {title.includes('Employer') && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.companyname || 'N/A'}</td>
                                    )}
                                {title.includes('Job Seeker') && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullname}</td>
                                )}   
                                <td><button className="bg-red-400 rounded-2xl p-2" onClick={()=>handleDelete(user.id)}>Delete</button></td> 
                            
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ):(<div>No Users found for the category</div>)} 
        </section>
    )

    return(
        <div className="mx-auto px-4 py-6">
            <h1 className="text-center text-black font-semibold">Admin Dashboard</h1>
            
            <div className="mb-6 flex items-center space-x-4 pl-6 -mt-8">
               <label htmlFor="" className="text-lg">Filter users</label> 
               <select name="selectroles" id="selectroles" value={filterRole} onChange={(e)=>setFilterrole(e.target.value)}>
                    <option value="all">All</option>
                    <option value="jobseeker">Job Seeker</option>
                    <option value="employer">Employer</option>
               </select>
            </div>
            <Usertable title="Job Seeker Details" userdata={jobseekers}/>
            <Usertable title="Employer Details" userdata={employer}/>
        </div>
    )
}
export default Adminusers