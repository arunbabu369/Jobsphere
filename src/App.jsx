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
import Scrolltotop from './components/Scrolltotop'
import Profile from './pages/Profile'
import AddQualificationForm from './components/AddQualificationForm'
import AddEducationForm from './components/AddEducationForm'
import Admindashboard from './pages/Admindashboard'
import Adminheader from './pages/Adminheader'
import Adminusers from './pages/Adminusers'
import Adminjobs from './pages/Adminjobs'
import EmployerChatDashboard from './pages/EmployerChatDashboard'
import EmployerAnalyticsPage from './components/EmployerAnalyticsPage'
import AnnouncementsPage from './pages/Announcementpage'
//import { AnnoncementProvider } from './components/Announcementcontext'

function App() {
 
  return(
    <Router>
      <Scrolltotop/>
       <Appcontent/>
    </Router>
  )
}
function Appcontent(){
  const location=useLocation()

  const isRegisterpage=location.pathname==='/register'
  const isLoginpage=location.pathname==='/login'
  const isEmployerheader=location.pathname.startsWith('/employer')
  const isAdminheader=location.pathname.startsWith('/admin')
  const isjobseekerdash=location.pathname.startsWith('/dashboard')


   const mainPaddingClass = (isRegisterpage || isLoginpage) ? 'pt-0' :
                           (isEmployerheader) ? 'pt-[72px] sm:pt-[96px]' : // Adjusted based on common header sizes
                           'pt-[80px] sm:pt-[96px]';

   
  const footeredit= (isjobseekerdash)?'mt-1 bg-white':'mt-6'


  return (
    <>
    <div className="flex flex-col min-h-screen"> 
    <ApplicantProvider>
    <Authprovider>
      <JobProvider>
     
    
     {!isRegisterpage&&!isLoginpage && !isEmployerheader&&<Header/>}
     {isEmployerheader &&<Employerheader/>}
     {isAdminheader &&<Adminheader/>}
     
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
        <Route element={<PrivateRoute allowedroles={['admin']}/>}>
          <Route path='/admin' element={<Admindashboard/>}></Route>
          <Route path='/admin/users' element={<Adminusers/>}></Route>
          <Route path='/admin/jobs' element={<Adminjobs/>}></Route>
          
        </Route>
        <Route element={<PrivateRoute allowedroles={['jobseeker']}/>}>
          <Route path='/dashboard' element={<Dashboarduser/>}>
            <Route index element={<DashbourdOverview/>}></Route>
            <Route path='save-jobs' element={<Savejobs/>}/>
            <Route path='applied-jobs' element={<Appliedjobs/>}></Route>
            <Route path='profile' element={<Profile/>}></Route>
            <Route path='add-qualification' element={<AddQualificationForm/>}></Route>
            <Route path='add-education' element={<AddEducationForm/>}></Route>
          </Route>  
        </Route>  
        <Route element={<PrivateRoute allowedroles={['employer']}/>}>
            <Route path='/employer' element={<EmployerDashboard  />}></Route>
            <Route path='/employer/add-job' element={<PostnewJob/>}></Route>
            <Route path='/employer/Manage-Jobs' element={<Managejobs/>}></Route>
            <Route path='/employer/Manage-Jobs/edit-job/:jobId' element={<Editjob/>}></Route>
            <Route path='/employer/Manage-Jobs/view-applicants/:jobId' element={<ViewApplicants/>}></Route>
            <Route path='/employer/chats' element={<EmployerChatDashboard/>}></Route>
            <Route path='/employer/analytics' element={<EmployerAnalyticsPage/>}></Route>
            
        </Route>
      </Routes>

      </main>
      
      </JobProvider>
      
      </Authprovider> 
      </ApplicantProvider>
      {!isLoginpage && <Footer className={footeredit}/>}
       </div>
    </>
  )
}

export default App
