import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaHome } from "react-icons/fa";
import { MdLogout, MdDashboard } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import { USER_API_END_POINT } from '../utlis/apiEndPoints';
import { PiBuildingApartmentBold } from "react-icons/pi";
import { BiSelectMultiple } from "react-icons/bi";
import { setUser } from '../redux/user.slice';
import { FcAbout } from "react-icons/fc";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const links = [{ name: "Home", icon: <FaHome size={20} />, to: "/" }];

  links.push({ name: "Apartments", icon: <PiBuildingApartmentBold size={20} />, to: "/apartments" });
  links.push({ name: "About FlatFlow", icon: <FcAbout size={20} />, to: "/about" });

  if (user) {
    if (user.role === "admin") {
      links.push(
        {
          name: "Dashboard",
          icon: <MdDashboard size={20} />,
          to: `/dashboard`
        }
      );
    } else if (user.role === "member") {
      links.push(
        {
          name: "My Booking",
          icon: <BiSelectMultiple size={20} />,
          to: "/my-booking"
        },
        {
          name: "Dashboard",
          icon: <MdDashboard size={20} />,
          to: `/dashboard-member`
        }
      );
    } else {
      links.push(
        {
          name: "My Booking",
          icon: <PiBuildingApartmentBold size={20} />,
          to: "/my-booking"
        },
        {
          name: "Dashboard",
          icon: <MdDashboard size={20} />,
          to: `/dashboard-user`
        }
      );
    }
  }

  return (
    <nav className="bg-white shadow-md px-4 py-3 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
       <div className='flex gap-4 justify-center items-center'>
       <img className='w-10 h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9sDRMhKjY5DdRig9K4uX933q5O2d5WwbrRuXgcHKblALRQe9kmbWYSQZT9cX1A1wi26U&usqp=CAU" alt="" />
       <h1 className="text-2xl font-bold">Flat<span className="text-[#9381ff]">Flow</span></h1>
       </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 items-center">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) => `flex items-center gap-2 hover:font-bold px-4 py-2 ${isActive ? " border-b-2 border-favone rounded-md " : ""}`}
            >
              {link.icon}
              <span className='font-semibold hover:font-bold'>{link.name}</span>
            </NavLink>
          ))}

          {/* Profile picture and dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user?.profilePicture || "https://via.placeholder.com/150"}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-favone"
                onClick={() => setProfileDropdownOpen(prev => !prev)}
              />
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border-2 border-favone rounded-md shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-favone text-gray-900 font-semibold select-none cursor-default">
                    {user.fullName || "User Name"}
                  </div>
                  <NavLink
                    to={user.role === "admin" ? "/dashboard" : user.role === "member" ? "/dashboard-member": user.role === "user" ? "/dashboard-user" : "/"}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-favone/20 transition-colors duration-200"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <MdDashboard size={20} />
                    <span>Dashboard</span>
                  </NavLink>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-favone/20 transition-colors duration-200"
                  >
                    <RiLogoutBoxRLine size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="flex items-center gap-2">
              <RiLoginBoxLine />
              <span className='font-semibold hover:font-bold'>Login</span>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-xl">
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="flex w-42 flex-col md:hidden mt-3 gap-3">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-2 hover:font-bold px-4 py-2 ${isActive ? " border-b-2 border-favone rounded-md " : ""}`}
            >
              {link.icon}
              <span className='font-semibold hover:font-bold'>{link.name}</span>
            </NavLink>
          ))}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-favone rounded-md"
              >
                <img
                  src={user?.profilePicture || "https://via.placeholder.com/150"}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{user.fullName || "User Name"}</span>
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border-2 border-favone rounded-md shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-favone text-gray-900 font-semibold select-none cursor-default">
                    {user.fullName || "User Name"}
                  </div>
                  <NavLink
                    to={user.role === "admin" ? "/dashboard" : user.role === "member" ? "/dashboard-member" : user.role === "user" ? "/dashboard-user" : "/"}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-favone/20 transition-colors duration-200"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    <MdDashboard size={20} />
                    <span>Dashboard</span>
                  </NavLink>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-favone/20 transition-colors duration-200"
                  >
                    <RiLogoutBoxRLine size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" onClick={() => setIsOpen(false)} className="ml-1 flex justify-center items-center gap-2">
              <RiLoginBoxLine size={20} />
              <span className='font-semibold hover:font-bold'>Login</span>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
