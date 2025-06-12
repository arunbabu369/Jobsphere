import React,{ useState } from 'react'
import { BrowserRouter as Router,Route, Link, Routes, useLocation } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Searchjobpage from './pages/Searchjobpage'
import Jobdetails from './pages/Jobdetails'
import Loginpage from './pages/Loginpage'
import Header from './pages/Header'
import { JobProvider } from './components/Jobcontext'
import Registerpage from './pages/Registerpage'
import Dashboarduser from './pages/Dashboarduser'
import DashbourdOverview from './components/DashbourdOverview'
import Footer from './pages/Footer'
import { Authprovider } from './components/Authcontext'
import Savejobs from './pages/Savejobs'
import Appliedjobs from './pages/Appliedjobs'
import PrivateRoute from './components/PrivateRoute'
import EmployerDashboard from './pages/EmployerDashboard'
import Employerheader from './pages/Employerheader'
import PostnewJob from './pages/PostnewJob'
import Managejobs from './pages/Managejobs'
import Editjob from './pages/Editjob'
import { ApplicantProvider } from './components/Applicationcontext'
import ViewApplicants from './pages/ViewApplicants'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
 
  return(
    <Router>
       <Appcontent/>
    </Router>
  )
}
function Appcontent(){
  const location=useLocation()

  const isRegisterpage=location.pathname==='/register'
  const isLoginpage=location.pathname==='/login'
  const isEmployerheader=location.pathname.startsWith('/employer')

  const mainPaddingClass=(isRegisterpage || isLoginpage)?'pt-4':(isEmployerheader)?'pt-24':'pt-24'



  return (
    <>
    <div className="flex flex-col min-h-screen"> 
    <ApplicantProvider>
    <Authprovider>
     {!isRegisterpage&&!isLoginpage && !isEmployerheader&&<Header/>}
     {isEmployerheader &&<Employerheader/>}
     <JobProvider>
      <main className={`${mainPaddingClass} flex-grow`}>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/job' element={<Searchjobpage/>}></Route>
        <Route path='/job/:id' element={<Jobdetails/>}></Route>
        <Route path='/aboutus' element={<About></About>}></Route>
        <Route path='/Contactus' element={<Contact/>}></Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/register' element={<Registerpage/>}></Route>
        <Route path='/dashboard' element={<Dashboarduser/>}></Route>
        <Route element={<PrivateRoute allowedroles={['jobseeker']}/>}>
          <Route path='/dashboard' element={<Dashboarduser/>}>
            <Route index element={<DashbourdOverview/>}></Route>
            <Route path='save-jobs' element={<Savejobs/>}/>
            <Route path='applied-jobs' element={<Appliedjobs/>}></Route>
          </Route>  
        </Route>  
        <Route element={<PrivateRoute allowedroles={['employer']}/>}>
            <Route path='/employer' element={<EmployerDashboard  />}></Route>
            <Route path='/employer/add-job' element={<PostnewJob/>}></Route>
            <Route path='/employer/Manage-Jobs' element={<Managejobs/>}></Route>
            <Route path='/employer/Manage-Jobs/edit-job/:jobId' element={<Editjob/>}></Route>
            <Route path='/employer/Manage-Jobs/view-applicants/:jobId' element={<ViewApplicants/>}></Route>
            
        </Route>
      </Routes>

      </main>
      </JobProvider>
      </Authprovider> 
      </ApplicantProvider>
      {!isLoginpage && <Footer/>}
       </div>
    </>
  )
}

export default App
