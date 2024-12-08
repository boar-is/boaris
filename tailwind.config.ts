import tailwindFade from '@eioluseyi/tailwind-fade'
import { redDark, sageDark, tealDark } from '@radix-ui/colors'
import tailwindFluid, {
  extract,
  type FluidThemeConfig,
  fontSize,
  screens,
} from 'fluid-tailwind'
import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'
import tailwindRac from 'tailwindcss-react-aria-components'
import { fontFamily } from 'tailwindcss/defaultTheme'

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
  content: {
    files: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    extract,
  },
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
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
      mono: ['var(--font-mono)', ...fontFamily.mono],
    },
    fontSize,
    screens: {
      lg: screens.lg,
    },
    fluid: () =>
      ({
        defaultScreens: ['40rem', screens.lg],
      }) satisfies FluidThemeConfig,
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [tailwindAnimate, tailwindRac, tailwindFade, tailwindFluid],
}

export default tailwindConfig
