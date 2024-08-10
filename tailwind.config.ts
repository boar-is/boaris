import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import tailwindRac from 'tailwindcss-react-aria-components'

const tailwindConfig = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindAnimate, tailwindRac],
} satisfies Config

export default tailwindConfig
