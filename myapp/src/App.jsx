import {  } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Managejobs from './components/Managejobs'
import Homes from './components/Homes'
import Application from './components/Application'
import Usernavbar from './components/user/Usernavbar'
// import ProfileDropdown from './components/user/ProfileDropdown'
import BJobs from './components/user/BJobs.jsx'
import MyJobs from './components/user/MyJobs.jsx'
import UserHome from './components/user/UserHome.jsx'
import Signin from './components/loginandreg/Signin.jsx'
import Signup from './components/loginandreg/Signup.jsx'
import SaveJobs from './components/user/SaveJobs.jsx'


function App() {
  

  return (
    <>
     
    <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='/register' element={<Signup/>}/>


      {/* admin */}
      <Route path='/admin/*' element={<Navbar/>}>
      <Route path='homes' element={<Homes />}/>
      <Route path='managejobs' element={<Managejobs />}/>
      <Route path='viewapplication' element={<Application />}/>
      {/* Redirecting to 'homes' if /admin is visited */}
      <Route path='' element={<Homes />} />
      </Route>

      
        {/* user */}
        <Route path='/user/*' element={<Usernavbar/>}>
        <Route path='bjob' element={<BJobs/>}/>
        <Route path='myjobs' element={<MyJobs/>}/>
        <Route path='savejobs' element={<SaveJobs/>}/>
        {/* <Route path='profiledropdown' element={<ProfileDropdown/>}/> */}
        {/* <Route path='profile' element={<UProfile/>}/> */}
        <Route path='' element={<UserHome/>}/>
        </Route>
      
        
        
      
      
     
      
      </Routes>
      
    </>
  )
}

export default App
