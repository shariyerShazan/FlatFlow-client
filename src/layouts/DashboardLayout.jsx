import React from 'react'
import Navbar from '../components/Navbar'
import SidebarForAdmin from '../components/SidebarForDashboard'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <div className='w-[90%] mx-auto'>
      <Navbar />
      <div className='grid grid-cols-24'>
         <div className='col-span-4'>
         <SidebarForAdmin />
         </div>
         <div className='col-span-20'>
            <Outlet />
         </div>
      </div>
    </div>
  )
}

export default DashboardLayout
