// Comprehensive Button Gradient Styles for the Application

export const gradientStyles = {
  // Primary gradient - Main action buttons
  buttons:{
    background: "linear-gradient(135deg, #1e40af 0%, #1e40af 100%)",
    textColor: "text-white",
    hover: "linear-gradient(to right, #1e40af, #647099ff)",
     description: "Main action buttons like Register, Login, Confirm",
     color:"white",
     marginTop:'20px'
  },
  primary: {
    background: "linear-gradient(to right, #00d4aa, #00f5d4)",
    hover: "linear-gradient(to right, #00c29a, #00e5c4)",
    textColor: "text-black",
    description: "Main action buttons like Register, Login, Confirm",
  },

  // Secondary gradient - Alternative buttons
  secondary: {
    background: "linear-gradient(to right, #8dfcff, #f7f776)",
    hover: "linear-gradient(to right, #7debf2, #e6e665)",
    textColor: "text-black",
    description: "Secondary actions like Cancel, Alternative options",
  },

  // Accent gradient - Special highlight buttons
  accent: {
    background: "linear-gradient(to right, #00f5d4, #8dfcff)",
    hover: "linear-gradient(to right, #00e5c4, #7debf2)",
    textColor: "text-black",
    description: "Special highlight buttons and featured actions",
  },

  // Tailwind CSS Classes
  tailwindClasses: {
    primary:
      "bg-gradient-to-r from-[#00d4aa] to-[#00f5d4] hover:from-[#00c29a] hover:to-[#00e5c4] text-black",
    secondary:
      "bg-gradient-to-r from-[#8dfcff] to-[#f7f776] hover:from-[#7debf2] hover:to-[#e6e665] text-black",
    accent:
      "bg-gradient-to-r from-[#00f5d4] to-[#8dfcff] hover:from-[#00e5c4] hover:to-[#7debf2] text-black",
  },
};

// Button Components that use these gradients:
export const buttonComponents = [
  "GradientButton.jsx - Main reusable button component",
  "AuthButtons.jsx - Login/Register buttons",
  "NFTCard.jsx - View Details buttons",
  "HomeRouter.jsx - Tab buttons, Load More button, Navigation arrows",
  "LoginPage.jsx - Confirm and Cancel buttons",
  "SignUpPage.jsx - Sign Up button",
  "Footer.jsx - Submit button",
  "WhatIsNFTSection.jsx - Explore More button",
];

export default gradientStyles;
