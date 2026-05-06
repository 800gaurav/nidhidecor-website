// import React, { createContext, useContext, useState, useEffect } from "react";

// const ThemeContext = createContext();

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     // Initialize from localStorage or default to dark mode
//     if (typeof window !== "undefined") {
//       const savedTheme = localStorage.getItem("theme");
//       if (savedTheme) {
//         return savedTheme === "dark";
//       }
//       // Check system preference
//       return window.matchMedia("(prefers-color-scheme: dark)").matches;
//     }
//     return true; // Default to dark mode
//   });

//   useEffect(() => {
//     // Apply theme to document immediately
//     const applyTheme = () => {
//       if (isDarkMode) {
//         document.documentElement.classList.add("dark");
//         document.documentElement.classList.remove("light");
//         document.body.classList.add("dark");
//         document.body.classList.remove("light");
//       } else {
//         document.documentElement.classList.add("light");
//         document.documentElement.classList.remove("dark");
//         document.body.classList.add("light");
//         document.body.classList.remove("dark");
//       }
//     };

//     applyTheme();

//     // Save theme preference
//     localStorage.setItem("theme", isDarkMode ? "dark" : "light");
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode((prev) => !prev);
//   };

//   const value = {
//     isDarkMode,
//     toggleTheme,
//     theme: isDarkMode ? "dark" : "light",
//   };

//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// };
