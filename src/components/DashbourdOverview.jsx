import React, { useContext } from 'react'
import Authcontext from './Authcontext'
import { Link} from 'react-router-dom'

function DashbourdOverview() {
    const {currentuser}=useContext(Authcontext)

    const countSavedjobs=currentuser?.savedjobs?.length||0
    const countAppliedjobs=currentuser?.appliedjobs?.length||0
  return (
    <div className="container mx-auto pt-8 px-4"> 
      <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-gray-800">Welcome, {currentuser.username}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4">Saved Jobs</h2>
          <p className="text-4xl font-bold">{countSavedjobs}</p>
          <p className="text-gray-600 mt-2">jobs you've saved for later.</p>
          <Link to="save-jobs" className="text-blue-500 hover:underline mt-4 block text-sm">View all saved jobs &rarr;</Link>
        </div>

       
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-green-600 mb-4">Your Applications</h2>
          <p className="text-4xl font-bold">{countAppliedjobs}</p>
          <p className="text-gray-600 mt-2">jobs you've applied to.</p>
          <Link to="applied-jobs" className="text-green-500 hover:underline mt-4 block text-sm">View all applications &rarr;</Link>
        </div>

       
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-600 mb-4">Profile Completion</h2>
          <p className="text-4xl font-bold">75%</p> 
          <p className="text-gray-600 mt-2">Complete your profile for better matches.</p>
          <Link to="/dashboard/profile" className="text-purple-500 hover:underline mt-4 block text-sm">Update Profile &rarr;</Link>
        </div>
      </div>

      
      
    </div>
  )
}

export default DashbourdOverview
