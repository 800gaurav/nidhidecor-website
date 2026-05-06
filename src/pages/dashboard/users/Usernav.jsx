import React, { useState, useEffect } from "react";
import { Drawer, Button, Tooltip } from "antd";
import {
  Menu,
  User,
  Copy,
  Check,
  LogOut,
  Award,
  Crown,
  Gift,
  ChevronLeft,
  ChevronRight,
  Home,
  Key,
  BookX,
  User2,
  X
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { colors, defaultStylesSidebar } from "../../../constants/colors";
import projectDetails from "../../../constants/strings";
import { navItems } from "../../../routers/routes.sidebar";
import "antd/dist/reset.css";
import "./UserSidebar.css";

import CutomButton from '../../../component/wrapper/Button'
import Swal from "sweetalert2";

const UserSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const location = useLocation();
  const { logout, currentUser } = useAuth();

  const referralLink = `${window.location.origin}/signup?referalID=${currentUser?.referralCode}&username=${encodeURIComponent(currentUser?.name || '')}`;

  const copyReferralLink = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isItemActive = (item) =>
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path);

  const isChildActive = (children) =>
    children?.some((child) => location.pathname === child.path);

  function getIconComponent(Icon) {
    return Icon || Home;
  }

  const sidebarContent = (
    <div
      className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
      style={{
        background: defaultStylesSidebar.background || undefined
      }}
    >
      {/* Header - Close button included */}
      <div className="sidebar-header flex items-center justify-between w-full p-4" style={{
        background: defaultStylesSidebar.background || undefined
      }}>
        <div className="flex items-center gap-3 flex-1">
          {!isCollapsed ? (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.location.href = "/dashboard"}
            >
              <div className="logo-wrapper">
                 {/* <img
      src="/Images/logo."
      alt="Logo"
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    /> */}
                <div className="logo-glow"></div>
              </div>
              <div className="text-black">
                <h1 className="project-name text-white text-lg font-semibold ">{projectDetails.name}</h1>
         
              </div>
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => window.location.href = "/dashboard"}
            >
              <div className="logo-wrapper">
                <img src="/Images/logo.png" alt="Logo" className="w-8 h-8" />
                <div className="logo-glow"></div>
              </div>
            </div>
          )}
        </div>

        {/* Close Button - Only show on mobile */}
        {isMobile && (
          <Button
            type="text"
            onClick={() => setDrawerVisible(false)}
            className="mobile-close-btn flex-shrink-0 ml-2"
            style={{color: 'white'}}
          >
            <X size={20} color="white"/>
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-navigation text-white" style={{
        background: defaultStylesSidebar.background || undefined
      }}>
        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = getIconComponent(item.icon);
            const isActive = isItemActive(item);
            const hasChildren = item.children && item.children.length > 0;
            const isSubmenuOpen = openSubmenu === item.label;
            const isChildItemActive = hasChildren && isChildActive(item.children);

            return (
              <li key={item.path} className="nav-item">
                {hasChildren ? (
                  <>
                    <div
                      className={`nav-link ${isActive || isChildItemActive ? "nav-active" : ""} ${isSubmenuOpen ? "nav-open" : ""}`}
                      onClick={() => toggleSubmenu(item.label)}
                    >
                      <div className="nav-icon-wrapper">
                        <Icon size={18} className="nav-icon" />
                        {isActive && <div className="active-indicator"></div>}
                      </div>
                      {!isCollapsed && (
                        <>
                          <span className="nav-label">{item.label}</span>
                          <ChevronRight size={16} className={`submenu-chevron ${isSubmenuOpen ? "rotated" : ""}`} />
                        </>
                      )}
                    </div>

                    {!isCollapsed && (
                      <div className={`submenu-container ${isSubmenuOpen ? "submenu-open" : "submenu-closed"} !text-white`}>
                        <ul className="submenu-list !text-white">
                          {item.children.map((child, index) => {
                            const ChildIcon = child.icon ? getIconComponent(child.icon) : null;
                            return (
                              <li key={child.path} style={{ animationDelay: `${index * 0.1}s` }}>
                                <NavLink
                                  to={child.path}
                                  className={({ isActive }) => `submenu-link ${isActive ? "submenu-active" : ""} text-white`}
                                  onClick={() => isMobile && setDrawerVisible(false)}
                                >
                                  {ChildIcon && <ChildIcon size={14} className="submenu-icon mr-2" />}
                                  <span style={{ color: defaultStylesSidebar.text }}>{child.label}</span>
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Tooltip title={isCollapsed ? item.label : null} placement="right" color="#2563eb">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}
                      onClick={() => isMobile && setDrawerVisible(false)}
                    >
                      <div className="nav-icon-wrapper">
                        <Icon size={18} className="nav-icon" />
                        {isActive && <div className="active-indicator"></div>}
                      </div>
                      {!isCollapsed && <span className="nav-label">{item.label}</span>}
                    </NavLink>
                  </Tooltip>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="footer-actions">
          <CutomButton
            title={!isCollapsed ? "Logout" : ""}
            leftIcon={<LogOut size={14} className="text-white" />}
            onClick={() => {
              Swal.fire({
                title: "Confirm Logout?",
                text: "Are you sure, You want to logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: defaultStylesSidebar.cardbg,
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout",
                cancelButtonText: "Cancel",
              }).then((result) => {
                if (result.isConfirmed) {
                  logout();
                  Swal.fire({
                    title: "Logged out!",
                    text: "You have been logged out successfully.",
                    icon: "success",
                    confirmButtonColor: defaultStylesSidebar.cardbg,
                    confirmButtonText: "OK",
                  });
                }
              });
            }}
          />

          <button onClick={toggleSidebar} className="toggle-btn">
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      {!isMobile && <div className={`desktop-sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>{sidebarContent}</div>}

      {/* Mobile */}
      {isMobile && (
        <>
          <Button type="primary" onClick={() => setDrawerVisible(true)} className="mobile-menu-btn " shape="circle">
            <Menu />
          </Button>
          <Drawer
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            bodyStyle={{ padding: 0 }}
            width={280}
          >
            {sidebarContent}
          </Drawer>
        </>
      )}
    </>
  );
};

export default UserSidebar;