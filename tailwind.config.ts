import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import tailwindRac from 'tailwindcss-react-aria-components'
import { fontFamily, spacing } from 'tailwindcss/defaultTheme'

const tailwindConfig: Config = {
  // TODO more specific
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      black: '#000',
      white: '#fff',
      light: 'hsl(223.81 0% 98%)',
      dark: 'hsl(239.95 9% 6%)',
      border: 'hsl(240.01 7% 15%)',
      input: 'hsl(239.95 3% 16%)',
      ring: 'hsl(216.04 98% 52%)',
      toggle: 'hsl(239.99 5% 26%)',
      bg: 'hsl(0 0% 1%)',
      fg: 'hsl(223.81 0% 98%)',
      primary: {
        DEFAULT: 'hsl(216.04 98% 52%)',
        fg: 'hsl(0 0% 100%)',
      },
      secondary: {
        DEFAULT: 'hsl(240.06 5% 11%)',
        fg: 'hsl(223.81 0% 98%)',
      },
      tertiary: {
        DEFAULT: 'hsl(240.02 10% 6%)',
        fg: 'hsl(239.99 4% 96%)',
      },
      accent: {
        DEFAULT: 'hsl(216.04 98% 52%)',
        fg: 'hsl(0 0% 100%)',
        subtle: 'hsl(215.99 94% 6%)',
        'subtle-fg': 'hsl(204.92 100% 77%)',
      },
      success: {
        DEFAULT: 'hsl(161.17 91% 31%)',
        fg: 'hsl(151.77 82% 96%)',
      },
      info: {
        DEFAULT: 'hsl(205.77 100% 50%)',
        fg: 'hsl(0 0% 100%)',
      },
      danger: {
        DEFAULT: 'hsl(0.01 72% 51%)',
        fg: 'hsl(360 86% 97%)',
      },
      warning: {
        DEFAULT: 'hsl(43.2 96% 57%)',
        fg: 'hsl(20.91 91% 14.1%)',
      },
      muted: {
        DEFAULT: 'hsl(239.95 3% 16%)',
        fg: 'hsl(240 5.03% 64.9%)',
      },
      overlay: {
        DEFAULT: 'hsl(240.03 6% 6%)',
        fg: 'hsl(223.81 0% 98%)',
      },
    },
    borderRadius: {
      full: '9999px',
      '3xl': 'calc(var(--radius) + 6px)',
      '2xl': 'calc(var(--radius) + 4px)',
      xl: 'calc(var(--radius) + 2px)',
      lg: 'calc(var(--radius))',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
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
}

export default tailwindConfig
