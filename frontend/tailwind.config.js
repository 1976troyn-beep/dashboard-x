/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0E14',      
        cardBg: '#161B22',      
        neonPurple: '#8B5CF6',  
        neonPink: '#C026D3',    
        neonCyan: '#06B6D4',    
      },
      boxShadow: {
        'neon': '0 0 15px rgba(192, 38, 211, 0.4)', 
      }
    },
  },
  plugins: [],
}

