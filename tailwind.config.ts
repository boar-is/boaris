import tailwindFade from '@eioluseyi/tailwind-fade'
import { redDark, sageDark, tealDark } from '@radix-ui/colors'
import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import tailwindRac from 'tailwindcss-react-aria-components'
import { fontFamily, spacing } from 'tailwindcss/defaultTheme'

type RadixColorScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

const radixColor = (record: Record<`${string}${RadixColorScale}`, string>) =>
  Object.entries(record).reduce(
    (acc, [k, v]) => {
      acc[k.match(/\d+$/)?.[0] as unknown as RadixColorScale] = v
      return acc
    },
    {} as Record<RadixColorScale, string>,
  )

const gray = radixColor(sageDark)
const accent = radixColor(tealDark)
const destructive = radixColor(redDark)

const tailwindConfig: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      black: '#000',
      white: '#fff',
      gray,
      accent,
      destructive,
    },
    borderRadius: {
      full: '9999px',
      '5xl': 'calc(var(--radius) + 20px)',
      '4xl': 'calc(var(--radius) + 12px)',
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
    extend: {
      boxShadow: {
        inset: 'inset 0 1px rgb(255 255 255 / 20%)',
      },
    },
  },
  plugins: [tailwindAnimate, tailwindRac, tailwindFade],
}

export default tailwindConfig
