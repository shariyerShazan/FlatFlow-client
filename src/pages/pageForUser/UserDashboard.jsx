import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import SidebarForUser from "../../components/SideBarForUser";
import { Menu } from "lucide-react";
import { RiMenuFoldFill } from "react-icons/ri";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    document.title = "Dashboard | FlatFlow";
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-full">
      {/* Mobile Sidebar Toggle Button */}
      <div className="sm:hidden p-4 flex justify-end">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        >
          {sidebarOpen ? <RiMenuFoldFill size={20} /> : <Menu size={20} />}
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
          <SidebarForUser />
        </div>

        {/* Main Content */}
        <div className="sm:col-span-20 p-4">
          <div className="max-w-xl mx-auto mb-12 bg-white shadow-lg rounded-xl p-6 flex items-center gap-6 border border-gray-200">
            <img
              src={user?.profilePicture}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-myPrimary"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{user?.fullName}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-600">Role: {user?.role}</p>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
