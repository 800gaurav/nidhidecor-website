import { motion } from "framer-motion";
import GradientButton from "../reuseis/GradientButton";

const AuthButtons = ({ className = "", isMobile = false }) => {
  const buttons = [
    { label: "REGISTER", path: "/Signup" },
    { label: "LOGIN", path: "/Login" },
  ];

  const containerClass = isMobile
    ? "flex flex-col gap-3 w-full"
    : "flex gap-3 lg:gap-4";

  const buttonSize = isMobile ? "mobile" : "medium";

  return (
    <div className={`${containerClass} ${className}`}>
      {buttons.map(({ label, path }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isMobile ? 0.2 + i * 0.1 : 0.4 + i * 0.1 }}
        >
          <GradientButton to={path} size={buttonSize} >
            {label}
          </GradientButton>
        </motion.div>
      ))}
    </div>
  );
};

export default AuthButtons;
