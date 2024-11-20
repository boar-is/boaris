import { tv } from 'tailwind-variants'

export const focusRing = tv({
  base: 'outline-none focus:outline-none',
  variants: {
    isFocused: { true: 'ring-4 ring-ring/20' },
    isInvalid: { true: 'ring-4 ring-danger/20' },
  },
})

export const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: 'border-ring/85' },
    isInvalid: { true: 'border-danger' },
  },
})

export const focusButtonStyles = tv({
  base: 'outline outline-ring outline-offset-2',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2',
    },
  },
})
