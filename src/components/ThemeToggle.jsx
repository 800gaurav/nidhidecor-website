// import React from "react";
// import { Moon, Sun } from "lucide-react";
// import { motion } from "framer-motion";
// import { useTheme } from "../context/ThemeContext";

// const ThemeToggle = ({ className = "" }) => {
//   const { isDarkMode, toggleTheme } = useTheme();

//   return (
//     <motion.button
//       onClick={toggleTheme}
//       className={`relative w-12 h-6 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${
//         isDarkMode
//           ? "bg-gray-600 focus:ring-offset-gray-800"
//           : "bg-gray-300 focus:ring-offset-white"
//       } ${className}`}
//       whileTap={{ scale: 0.95 }}
//       aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
//     >
//       <motion.div
//         className="w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
//         initial={false}
//         animate={{
//           x: isDarkMode ? 24 : 0,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 500,
//           damping: 30,
//         }}
//       >
//         <motion.div
//           key={isDarkMode ? "dark" : "light"}
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           transition={{ duration: 0.2 }}
//         >
//           {isDarkMode ? (
//             <Moon className="w-3 h-3 text-blue-600" />
//           ) : (
//             <Sun className="w-3 h-3 text-yellow-500" />
//           )}
//         </motion.div>
//       </motion.div>
//     </motion.button>
//   );
// };

// export default ThemeToggle;
