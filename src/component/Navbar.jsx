import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import AuthButtons from "../utils/AuthButtons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "PlANS", path: "/plans" },
    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT US", path: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed top-0 w-full z-50 bg-[#390ca3c4] backdrop-blur-md border-b border-[#00BFFF]/30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/Images/Home2.png" alt="Logo"   className="h-8 sm:h-10 w-8 sm:w-10 rounded-full object-cover border-2 border-white bg-amber-50"/>
          <motion.span
            className="hidden sm:block font-extrabold text-lg sm:text-xl bg-[#fff] bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Autonix
          </motion.span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 font-semibold text-sm tracking-wide">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `relative group text-sm xl:text-base transition duration-200 ${
                  isActive
                    ? "text-[#00E676] font-bold"
                    : "text-white hover:text-[#FF4D6D]"
                }`
              }
            >
              {name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#FF4D6D] to-[#00BFFF] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <AuthButtons />
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white p-2 rounded-lg focus:outline-none hover:bg-[#7B2CBF] transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-gradient-to-b from-[#3A0CA3] to-[#7B2CBF] backdrop-blur-md border-t border-[#00BFFF]/30 shadow-lg"
          >
            <div className="px-6 py-6 space-y-6">
              
              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-4">
                {navItems.map(({ name, path }) => (
                  <NavLink
                    key={name}
                    to={path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block text-center py-3 rounded-lg font-medium transition duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-[#FF4D6D] to-[#00BFFF] text-white font-bold"
                          : "text-white hover:bg-[#7B2CBF]"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div
                className="pt-4 border-t border-[#00BFFF]/30"
                onClick={closeMenu}
              >
                <AuthButtons isMobile={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}