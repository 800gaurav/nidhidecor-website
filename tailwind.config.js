/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom colors for the NFT theme
        autonix: {
          purple: "#7B2CBF",
          magenta: "#FF4D6D",
          cyan: "#00BFFF",
          indigo: "#3A0CA3",
          black: "#0D0D0D",
        },
      },
      backgroundImage: {
        'autonix-gradient': "linear-gradient(90deg, #7B2CBF, #FF4D6D, #00BFFF, #3A0CA3)",
        'custom-gradient': 'linear-gradient(to right, #1A73E8, #0D1B2A)',
      },


      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
};
