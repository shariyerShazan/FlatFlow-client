import React from 'react'
import Navbar from '../components/Navbar'
import SidebarForMember from '../components/SidebarForMember'
import { Outlet } from 'react-router'
import FooterSection from '../components/FooterSection'

const MemberDashboardLayout = () => {
  return (
    <div className='w-[90%] mx-auto'>
    <Navbar />
    <div className='grid grid-cols-24'>
       <div className='col-span-4'>
       <SidebarForMember />
       </div>
       <div className='col-span-20'>
          <Outlet />
       </div>
    </div>
    <FooterSection />
  </div>
  )
}

export default MemberDashboardLayout
