import React from 'react'
import '../../App.css'
import { Outlet } from 'react-router-dom'
import Usernav from './users/Usernav'
import Dashboard from './users/Dashboard'



function UserDashboard() {
  return (
    <>
      <div className='bg-color-1'>
        {/* <Usernav /> */}
        <Dashboard />
  
       
        <Outlet />
      </div>
    </>
  )
}

export default UserDashboard