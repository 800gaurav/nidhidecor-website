import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { defaultStylesSidebar } from "../constants/colors";

// Compact Action Button Component
export const ActionButton = ({ icon, label, onClick, gradient, iconSize = 24 }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white rounded-lg p-2 h-18 w-35 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center`}
      style={{ background: gradient }}
    >
      <div className="text-sm mb-1">
        {React.cloneElement(icon, { size: iconSize })}
      </div>
      <span className="text-xs font-medium text-center leading-tight">{label}</span>
    </button>
  );
};




export const CustomButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  icon: Icon,
  disabled = false,
  textColor = "white",
  bgColor = defaultStylesSidebar.cardbg, // new prop
}) => {
  const baseClasses =
    "font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm";

  const variants = {
    primary: "",
    secondary: "",
    danger: "",
    outline: "border border-gray-300 hover:bg-gray-100 bg-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${
        fullWidth ? "w-full" : "px-6"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={{
        color: textColor,
        background: variant !== "outline" ? bgColor : undefined,
      }}
    >
      {Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
};



export const CutomButton = ({
  title,
  leftIcon,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
}) => {
  const baseClasses =
    "font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white",
    secondary:
      "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 bg-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${
        fullWidth ? "w-full" : "px-6"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {title && <span>{title}</span>}
    </motion.button>
  );
};


CutomButton.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "outline"]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};
