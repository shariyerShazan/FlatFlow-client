import React from "react";
import { MdDownloadDone } from "react-icons/md";

import { NavLink } from "react-router"; 
// import { TiMessages } from "react-icons/ti";
// import { RiFileList3Line } from "react-icons/ri";
// import { MdAddToPhotos } from "react-icons/md";
import { BiSolidNotification } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

function SidebarForUser() {
  const role = "user";

  const adminLinks = [
    // { name: "My Apartment", to: "my-apartment", logo: <MdAddToPhotos size={20} /> },
    // { name: "Payment", to: "payment", logo: <RiFileList3Line size={20} /> },
    { name: "Profile", to: "/dashboard-user", logo: <CgProfile size={20} /> },
    { name: "Announcements", to: "all-announcement", logo: <BiSolidNotification size={20} /> },
    // { name: "Chat with Applicants", to: "chats", logo: <TiMessages size={20} /> },
  ];

  

  const getAllLinks = (role) => {
    if (role === "user") {
      return adminLinks;
    } else {
      return [];
    }
  };

  const allLinks = getAllLinks(role);

  return (
    <div className="p-5 bg-white min-h-[80vh] space-y-2 shadow-xl">
      {allLinks.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg px-4 py-4 rounded-md transition-all ${
              isActive
                ? "bg-favone hover:bg-favone/80 text-white shadow font-semibold"
                : "hover:bg-favone/30  text-gray-800"
            }`
          }
        >
          {link.logo}
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}

export default SidebarForUser;
