import React from "react";
import { MdDownloadDone } from "react-icons/md";
// import { IoCreate } from "react-icons/io5";
// import { FaRegFileAlt } from "react-icons/fa";
import { NavLink } from "react-router"; 
// import { TiMessages } from "react-icons/ti";
import { RiFileList3Line } from "react-icons/ri";
import { MdAddToPhotos } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { BiSolidNotification } from "react-icons/bi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IoGitCommit } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function SidebarForAdmin() {
  const role = "admin";

  const adminLinks = [
    { name: "Profile", to: "", logo: <CgProfile size={20} /> },
    { name: "Add Apartment", to: "list-apartment", logo: <MdAddToPhotos size={20} /> },

    { name: "Agreements", to: "agreemented", logo: <IoGitCommit size={20} /> },
    { name: "Manage Members", to: "manage-members", logo: <IoGitCommit size={20} /> },
    { name: "Announce something", to: "make-announcement", logo: <GrAnnounce size={20} /> },
    { name: "Annoucements", to: "announcements", logo: <BiSolidNotification size={20} /> },
       { name: "All payment History", to: "payment-history", logo: <RiFileList3Line size={20} /> },
       { name: "Make cupons", to: "make-cupons", logo: <RiDiscountPercentFill size={20} /> },
  ];

  

  const getAllLinks = (role) => {
    if (role === "admin") {
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

export default SidebarForAdmin;
