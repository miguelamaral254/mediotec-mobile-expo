/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{ts,tsx}",  
    "./*.tsx",              
    "./*.ts",               
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
