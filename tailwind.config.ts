import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
        colors:{ 
          primary100:'#EDF5FF',
          primary200:'#D1E2FF',
          primary300:'#0F67FE',
          primary400:'#0151DA',
          primary500:'#01294C',
          black:'#09111D',
          white:'#ffffff',
          secondary100:'#F2F6F9',
          secondary200:'#D9E4ED',
          secondary300:'#BACEDE',
          secondary400:'#8B9298',
          yellow100:'#FFFDED',
          yellow200:'#FDE74C',
          yellow300:'#FDE121',
          yellow400:'#BEAD39',
          red100:'#FBE9EC',
          red200:'#F3BCC3',
          red300:'#D7263D',
          red400:'#A11D2E'
        },
        screens: {
          '4xl': '1600px',
          '3xl': '1500px',
          '2xl': '1440px',
          'xl': '1280px',
          'lg': '1024px',
          'md': '768px',
          'sm': '450px',
          'xs': '300px',
        },
    },
  },

  plugins: [],
}
export default config
