import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { colors } from "../variables/colors";



const GradientButton = ({
  children,
  onClick,
  to,
  className = "",
  size = "medium",
  icon = "",
  disabled = false,
  type = "button",
  variant = "secondary", // primary, secondary
  ...props
}) => {
  const sizeClasses = {
    small: "px-3 py-2 text-xs",
    medium: "px-4 py-2 text-sm lg:px-5 lg:py-2.5 lg:text-base",
    large: "px-6 py-3 text-base lg:px-8 lg:py-4 lg:text-lg",
    mobile: "w-full py-3 px-6 text-base",
  };

  // Use inline styles for gradient backgrounds since Tailwind doesn't support dynamic colors
  const variantStyles = {
    primary: {
      background: `linear-gradient(to right, ${colors.theme1}, ${colors.theme2})`,
    },
    secondary: {
      background: `linear-gradient(to right, ${colors.theme1}, ${colors.theme2})`,
    },
    confirm: {
      background: `linear-gradient(to right, ${colors.theme1}, ${colors.theme2})`,
    },
  };

  const baseClasses = `
    rounded-lg 
    transition-all duration-300 
    flex items-center justify-center gap-2
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${sizeClasses[size]}
    ${className}
  `;

  const buttonContent = (
    <>
      {icon && <span className="text-base lg:text-lg">{icon}</span>}
      <span className="font-bold text-black">{children}</span>
    </>
  );

  const MotionButton = motion.button;
  const MotionNavLink = motion(NavLink);

  if (to) {
    return (
      <MotionNavLink
        to={to}
        className={baseClasses}
        style={variantStyles[variant]}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        {...props}
      >
        {buttonContent}
      </MotionNavLink>
    );
  }

  return (
    <MotionButton
      type={type}
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      style={variantStyles[variant]}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        boxShadow: disabled ? "" : "0 10px 25px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </MotionButton>
  );
};

export default GradientButton;