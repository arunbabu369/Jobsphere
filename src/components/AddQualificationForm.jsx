import React, { useState } from 'react'

const AddQualificationForm=({onAdd})=>{
    const[title,setTitle]=useState('')
    const[institution,setInstitution]=useState('')
    const[year,setYear]=useState('')
    const[description,setDescription]=useState('')
    const[error,setError]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!title ||!institution||!year){
            setError("Title, Institution, and Year are required for experience.");
            return
        }
        onAdd({ title, institution, year, description });
        setTitle('')
        setInstition('')
        setDescription('')
        setError('')
        setYear('')
    }
  return (
    <form onSubmit={handleSubmit} className="border border-indigo-200 p-4 rounded-md mt-4 bg-indigo-50">
      <h4 className="text-lg font-semibold mb-3">Add New Experience</h4>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-1">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-1">Institution:</label>
        <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-1">Year:</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., 2023" />
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-bold mb-1">Description (Optional):</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="2" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Qualification
      </button>
    </form>
  )
}

export default AddQualificationForm

