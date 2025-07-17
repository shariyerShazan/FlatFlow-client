import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SidebarForAdmin from '../components/SidebarForDashboard'
import { Outlet } from 'react-router'
import FooterSection from '../components/FooterSection'
import { Menu } from 'lucide-react' 
import { RiMenuFoldFill } from "react-icons/ri";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="w-[90%] mx-auto">
      <Navbar />

      {/* Mobile Sidebar Toggle Button */}
      <div className="sm:hidden p-4 flex justify-end">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        >
         {sidebarOpen?  <RiMenuFoldFill size={20} /> : <Menu size={20} />}
          Menu
        </button>
      </div>

      <div className="grid sm:grid-cols-24 grid-cols-1 relative">
        {/* Sidebar */}
        <div
          className={`
            sm:col-span-4 bg-white
            sm:static sm:translate-x-0
            fixed top-0 left-0 h-full z-50 w-64 transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            sm:block
          `}
        >
          <SidebarForAdmin />
        </div>

        {/* Main Content */}
        <div className="sm:col-span-20 p-4">
          <Outlet />
        </div>
      </div>

      <FooterSection />
    </div>
  )
}

export default DashboardLayout
