import React, { isValidElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import herobanner from '../assets/images/herobanner.jpg'
import techinnovation from '../assets/images/company/companylogo1.Avif'
import Global from '../assets/images/company/companylogo2.jpg'
import Creativemind from '../assets/images/company/companylogo3.jpg'
import Jobcontext from '../components/Jobcontext'

function Homepage() {

  const {jobs}=useContext(Jobcontext)
    const featuredcompaies=[
    { id: 1, name: 'Tech Innovations Inc.', logo: techinnovation, description: 'Leading the future of AI.' },
    { id: 2, name: 'Global Solutions Ltd.', logo: Global, description: 'Solving complex problems globally.' },
    { id: 3, name: 'Creative Minds Studio', logo: Creativemind, description: 'Innovating design and digital art.' },
  ];
    

   const testimonials = [
    { id: 1, name: 'Jane Doe', title: 'Software Engineer', quote: 'JobSphere helped me land my dream job within weeks! The interface is so intuitive.' },
    { id: 2, name: 'John Smith', title: 'HR Manager', quote: 'Finding top talent has never been easier. JobSphere\'s employer dashboard is a game-changer.' },
    { id: 3, name: 'Emily White', title: 'Marketing Specialist', quote: 'The personalized job recommendations were spot on. Highly recommend JobSphere!' },
  ];

  const onhandleSubmit=(e)=>{
    e.preventDefault()
    const email=e.target.elements.email.value
    alert(`You have subscribed with ${email}`)
    e.target.reset()

  }
  return (
    <div className='mt-50'>
      <section className='relative bg-no-repeat min-h-[400px] bg-[#E7F9FD] rounded-2xl ' style={{backgroundImage: `url('${herobanner}')`, backgroundPosition:'right' }}>
            <div className='absolute p-20'>
                <h1 className='text-6xl font-bold text-blue '>Find Your Dream..!</h1>
                <p className='font-inter italic'>One click away For the next step</p>
            </div>
      </section>
       <section className=' py-20 px-6'>
        <h1 className='text-center font-bold text-3xl text-blue-700'>Featured Jobs</h1>
        <div className='flex justify-between my-20'>
            {jobs.slice(0,4).map(jobs=>(
              <Link to={`/job/${jobs.id}`}>
                <div key={jobs.id}>
                   <h1 className='text-center text-2xl'>{jobs.title}</h1> 
                    <p><strong>{jobs.company}</strong>-{jobs.location} ({jobs.type})</p>
                </div>
                </Link>
            ))}
        </div>
        <div className='text-center'>
            <div className='bg-black inline-block px-6 py-3 rounded-lg text-white font-semibold hover:bg-gray-800 transition-colors duration-300'>
                <Link to={'/job'}>View All Jobs</Link>
            </div> 
        </div>
      </section>
      
      <section className='p-20 bg-gradient-to-b from-[#E7F9FD]  to-white'>
        <h1 className='text-4xl font-inter mb-20 text-center font-bold'>What Our Users Say...</h1>
        <div className='text-center'>
            {testimonials.map(testimony=>(
                <div key={testimony.id} className='m-6'>
                    <h1 className='font-inter italic'>"{testimony.quote}"</h1>
                    <p><strong>{testimony.name} || {testimony.title}</strong></p>
                </div>
            ))}
        </div>
      </section>
      <section className=''>
        <h1 className='text-center text-3xl  text-blue-700 font-bold mt-20'>Featured Companies</h1>
        <div className='flex justify-evenly my-20'>
        {featuredcompaies.map(company=>(
            <div className='flex' key={company.id}>
                <img className='h-10 w-10 rounded-3xl m-4' src={company.logo} alt="" />
                <div>
                <h1 className='text-2xl'>{company.name}</h1>
                <p className='text-inter italic'>{company.description}</p>
                <div className='text-blue-800 ml-4'>
                <Link to={`/companies/${company.id}`}>Learn More..</Link>
                </div>
                </div>
            </div>
        ))}
        </div>
      </section>
      <section>
        <form onSubmit={onhandleSubmit}>
            <h1 className='text-2xl text-center font-semibold'>Find Your Next Great Opportunity</h1>
            <p className='text-lg text-center'>Connecting talented professionals with leading companies worldwide.</p>
            <div className='flex justify-center items-center mt-10'>
             <div className='flex justify-between items-center   border rounded-2xl w-[400px]'>
            <input type="email" name="email" id="" placeholder='Enter your email address'/>
            <button className='bg-black text-white px-6 py-4 rounded-2xl'>Subscribe</button>
            </div>
            </div>
        </form>
      </section>
    </div>
  )
}

export default Homepage
