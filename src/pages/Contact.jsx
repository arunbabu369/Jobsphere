import React, { useState } from 'react'

function Contact() {
    const[formData,setFormData]=useState({
        name:'',
        email:'',
        message:'',
    })
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData(prev=>({...prev,[name]:value}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        alert("Thank you for your response,We will get back to you soon...")
        setFormData({name:'',email:'',message:''})

    }
  return (
    <div className='mx-auto px-8 py-10 max-w-4xl'>
        <h1 className='text-center text-gray-700 text-3xl font-semibold'>Contact Us</h1>
        <div>
            <p className="text-md text-gray-700 italic mb-6 text-center">
             Have questions or feedback? Feel free to reach out to us!
           </p>
            <form onClick={handleSubmit}>
            <div className='mt-10'>
            <label htmlFor="name" className="block text-xl   text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className=''>
            <label htmlFor="email" className="block text-xl font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className=''>
            <label htmlFor="message" className="block text-xl text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-10 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Message
          </button>
        </form>
    
        </div>
      
    </div>
  )
}

export default Contact
