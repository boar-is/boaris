import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import tailwindRac from 'tailwindcss-react-aria-components'
import { fontFamily, spacing } from 'tailwindcss/defaultTheme'

const radixGray = {
  1: '#111111',
  2: '#191919',
  3: '#222222',
  4: '#2A2A2A',
  5: '#313131',
  6: '#3A3A3A',
  7: '#484848',
  8: '#606060',
  9: '#6E6E6E',
  10: '#7B7B7B',
  11: '#B4B4B4',
  12: '#EEEEEE',
} as const

const tailwindConfig = {
  // TODO more specific
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      gray: radixGray,
      error: '#E5484D',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: spacing['3'],
        md: spacing['4'],
      },
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
      mono: ['var(--font-mono)', ...fontFamily.mono],
    },
    extend: {
      maxWidth: {
        prose: '75ch',
      },
    },
    animation: {
      rainbow: 'rainbow var(--speed, 2s) infinite linear',
    },
    keyframes: {
      rainbow: {
        '0%': { 'background-position': '0%' },
        '100%': { 'background-position': '200%' },
      },
    },
  },
  plugins: [tailwindAnimate, tailwindRac],
} satisfies Config

export default tailwindConfig
