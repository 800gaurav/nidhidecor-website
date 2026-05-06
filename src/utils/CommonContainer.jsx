// components/Layout.js
import React from "react";

const Layout = ({ children, fullWidth = false, className = "" }) => {
  const containerClass = fullWidth
    ? `w-full ${className}`
    : `max-w-screen-xl mx-auto ${className}`;

  return <div className={containerClass}>{children}</div>;
};

export default Layout;
