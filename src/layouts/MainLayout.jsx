import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import FooterSection from '../components/FooterSection'

const MainLayout = () => {
  return (
    <div className='w-[90%] mx-auto'>
      <Navbar />
      <Outlet />
      <FooterSection />
    </div>
  )
}

export default MainLayout
