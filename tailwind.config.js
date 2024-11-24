/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",  
    "./*.tsx",              
    "./*.ts",               
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary-color': '#000000',   
        'secondary-color': '#3B82F6', 
        'third-color': '#06B6D4',     
        'fourth-color': '#9333EA',    
        'fifth-color': '#EC4899',
        'background-color': '#94A3D2',
        'navbar-color': '#4666AF'
      },
    },
  },
  plugins: [],
}
