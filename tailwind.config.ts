import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import tailwindRac from 'tailwindcss-react-aria-components'
import colors from 'tailwindcss/colors'
import { fontFamily, spacing } from 'tailwindcss/defaultTheme'

const twGray = colors.zinc

const tailwindConfig = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      gray: {
        '50': twGray['950'],
        '100': twGray['900'],
        '200': twGray['800'],
        '300': twGray['700'],
        '400': twGray['600'],
        '500': twGray['500'],
        '600': twGray['400'],
        '700': twGray['300'],
        '800': twGray['200'],
        '900': twGray['100'],
        '950': twGray['50'],
      },
      error: colors.red[500],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: spacing['3'],
        md: spacing['4'],
      },
    },
    fontFamily: {
      sans: ['var(--font-switzer)', ...fontFamily.sans],
      mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
    },
  },
  plugins: [tailwindAnimate, tailwindRac],
} satisfies Config

export default tailwindConfig
