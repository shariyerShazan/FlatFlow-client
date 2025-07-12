import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
// import { TiMessages } from "react-icons/ti";
// import { FiPlusSquare } from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RiLoginBoxLine } from "react-icons/ri";
// import { setUser } from '../redux/user.slice';
import { USER_API_END_POINT } from '../utlis/apiEndPoints';
import { PiBuildingApartmentBold } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { setUser } from '../redux/user.slice';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiSelectMultiple } from "react-icons/bi";

function Navbar() {
    const dispatch = useDispatch()
  const { user } = useSelector(store => store.user);
//   console.log(user)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(null))
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const links = [{ name: "Home", icon: <FaHome size={20} />, to: "/" }];

links.push({ name: "Apartments", icon: <PiBuildingApartmentBold size={20} />, to: "/apartments" });

if (user) {
  if (user.role === "admin") {
    links.push(
      {
        name: "Dashboard",
        icon: <MdDashboard size={20} />,
        to: `/dashboard`
      },
      {
        name: "Profile",
        icon: (
          <img
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            className="w-8 h-8 rounded-full object-cover"
            alt="profile"
          />
        ),
        to: `/profile/${user?._id}`
      }
    );
  } else if (user.role === "member") {
    // Member: My Booking, Dashboard, Profile
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
      },
      {
        name: "Profile",
        icon: (
          <img
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            className="w-8 h-8 rounded-full object-cover"
            alt="profile"
          />
        ),
        to: `/profile/${user?._id}`
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
        name: "Profile",
        icon: (
          <img
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            className="w-8 h-8 rounded-full object-cover"
            alt="profile"
          />
        ),
        to: `/profile/${user?._id}`
      }
    );
  }
} 



  

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Flat<span className="text-[#9381ff]">Flow</span></h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 items-center">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({isActive})=>`flex items-center gap-2 hover:font-bold px-4 py-2 ${isActive? " border-b-2 border-favone rounded-md " : "" }`}
            >
              {link.icon}
              <span className='font-semibold hover:font-bold'>{link.name}</span>
            </NavLink>
          ))}
          {user ? (
            <button onClick={handleLogout} className="cursor-pointer flex items-center gap-2">
              <MdLogout />
              <span className='font-semibold hover:font-bold'>Logout</span>
            </button>
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
              className={({isActive})=>`flex items-center gap-2 hover:font-bold px-4 py-2 ${isActive? " border-b-2 border-favone rounded-md " : "" }`}
            >
              {link.icon}
              <span className='font-semibold hover:font-bold'>{link.name}</span>
            </NavLink>
          ))}
          {user ? (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="ml-5 md:ml-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <RiLogoutBoxRLine size={20}/>
              <span className='font-semibold hover:font-bold'>Logout</span>
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setIsOpen(false)} className="ml-1 flex justify-center items-center gap-2">
              <RiLoginBoxLine size={20}/>
              <span className='font-semibold hover:font-bold'>Login</span>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
