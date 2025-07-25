const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "flowbite.content()",
  ],
  darkMode:'class',
  theme: {
    container:{
      center: true
    },
    extend: {
colors :{
  "main": "#9675FA",
}

    },
    
    
  },
  plugins: [flowbite.plugin()],
}

