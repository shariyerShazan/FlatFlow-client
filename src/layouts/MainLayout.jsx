import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className='w-[90%] mx-auto'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout
