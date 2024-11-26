import { tv } from 'tailwind-variants'

export const focusRing = tv({
  base: 'outline-none focus:outline-none',
  variants: {
    isFocused: { true: 'outline-4 outline-accent-6/75' },
    isInvalid: { true: 'outline-4 outline-destructive-6/75' },
  },
})

export const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: 'border-accent-7/75' },
    isInvalid: { true: 'border-destructive-7/75' },
  },
})
