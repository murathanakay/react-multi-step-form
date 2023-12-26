module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./src/layouts/**/*.{js,jsx,ts,tsx}",
    // "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./public/index.html",
  ],
  safelist: [
    "bg-gray-600",
    "mt-5",
    "text-transparent",
    "to-cyan-400",
    "from-[#0033cc]",
    "bg-clip-text",
    "bg-gradient-to-l",
    "animate-gradient-text-background",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
