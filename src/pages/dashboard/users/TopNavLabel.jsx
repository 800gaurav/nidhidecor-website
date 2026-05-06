import React from "react";
import { useLocation } from "react-router-dom";
import { colors } from "../../../constants/colors";
import { navItems } from "../../../routers/routes.sidebar";

const TopNavLabel = () => {
  const location = useLocation();

  // Recursive function to find the label from navItems
  const findRouteLabel = (items, pathname) => {
    for (const item of items) {
      if (item.path === pathname) return item.label;
      if (item.children) {
        const childMatch = item.children.find(child => pathname === child.path);
        if (childMatch) return `${item.label} / ${childMatch.label}`;
      }
    }
    return "Dashboard"; // default label
  };

  const currentLabel = findRouteLabel(navItems, location.pathname);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: colors.theme1,
        color: "#fff",
        fontWeight: 600,
        fontSize: 16,
        padding: "12px 20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: 50,
      }}
    >
      {currentLabel}
    </div>
  );
};

export default TopNavLabel;
