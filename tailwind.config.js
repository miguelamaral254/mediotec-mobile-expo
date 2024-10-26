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
        'primary-color': '#1D4ED8',   // Azul
        'secondary-color': '#3B82F6', // Azul claro
        'third-color': '#06B6D4',     // Ciano
        'fourth-color': '#9333EA',    // Roxo
        'fifth-color': '#EC4899',     // Rosa
      },
    },
  },
  plugins: [],
}
