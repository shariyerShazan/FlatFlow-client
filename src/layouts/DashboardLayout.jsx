import React from 'react'
import Navbar from '../components/Navbar'
import SidebarForAdmin from '../components/SidebarForDashboard'
import { Outlet } from 'react-router'
import FooterSection from '../components/FooterSection'

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
      <FooterSection />
    </div>
  )
}

export default DashboardLayout
