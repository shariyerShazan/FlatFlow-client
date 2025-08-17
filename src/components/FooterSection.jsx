import React from "react";
import { motion } from "framer-motion";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router"; 

const socialLinks = [
  {
    icon: <Twitter className="w-6 h-6" />,
    href: "https://twitter.com/yourhandle",
    label: "Twitter",
  },
  {
    icon: <Facebook className="w-6 h-6" />,
    href: "https://facebook.com/yourpage",
    label: "Facebook",
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    href: "https://instagram.com/yourprofile",
    label: "Instagram",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    href: "https://linkedin.com/in/yourprofile",
    label: "LinkedIn",
  },
];

const FooterSection = () => {
  return (
    <footer className="bg-gray-700 text-white py-12 px-6 md:px-20">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left: Logo & Info */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Flat<span className="text-favone">Flow</span></h1>
          <p className="max-w-sm text-gray-200">
            Experience luxury living with modern amenities, eco-friendly design, and a vibrant community. Your dream home awaits.
          </p>
        </div>

        {/* Middle: Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6">
          <Link to="/about" className="hover:text-pink-300 transition-colors">
            About
          </Link>
          <Link to="/apartments" className="hover:text-pink-300 transition-colors">
            Apartments
          </Link>
          <a href="#coupons" className="hover:text-pink-300 transition-colors">
            Coupons
          </a>
          <a href="#contact" className="hover:text-pink-300 transition-colors">
            Contact
          </a>
        </nav>

        {/* Right: Social Links */}
        <div className="flex space-x-6">
          {socialLinks.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 bg-opacity-20 rounded-full hover:bg-opacity-40 transition hover:scale-115"
            >
              {icon}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-12 border-t border-white border-opacity-20 pt-6 text-center text-sm text-gray-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        &copy; {new Date().getFullYear()} YourBuilding. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default FooterSection;
