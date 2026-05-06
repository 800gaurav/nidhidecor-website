import React from "react";
import { motion } from "framer-motion";

const EnhancedButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "medium",
  disabled = false,
  type = "button",
  ...props
}) => {
  const sizeClasses = {
    small: "px-3 py-1.5 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#faf8f7] to-[#00f5d4] 
      hover:from-[#00c29a] hover:to-[#00e5c4]
      text-black font-semibold
    `,
    secondary: `
      bg-gradient-to-r from-[#0d0f00] to-[#f7f776] 
      hover:from-[#7debf2] hover:to-[#e6e665]
      text-black font-semibold
    `,
    accent: `
      bg-gradient-to-r from-[#f53100] to-[#8dfcff] 
      hover:from-[#00e5c4] hover:to-[#7debf2]
      text-black font-semibold
    `,
  };

  const baseClasses = `
    rounded-lg 
    transition-all duration-300 
    shadow-lg hover:shadow-xl
    transform hover:scale-105
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default EnhancedButton;
