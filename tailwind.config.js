const {heroui} = require('@heroui/theme');
import { Container } from "postcss";

const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "flowbite.content()",
    "./node_modules/@heroui/theme/dist/components/navbar.js"
  ],
  theme: {
    container:{
      center: true
    },
    extend: {
colors :{
  "main": "#0aad0a",
}

    },
    
    
  },
  plugins: [flowbite.plugin(),heroui()],
}

