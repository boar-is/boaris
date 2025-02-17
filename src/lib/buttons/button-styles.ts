import { tv } from 'tailwind-variants'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'

export const buttonStyles = tv({
  base: [
    'relative isolate after:content-none transition-colors',
    'inline-flex items-center justify-center',
    'border border-transparent font-medium no-underline rounded-lg after:rounded-lg',
    'hover:opacity-95 pressed:opacity-90 disabled:opacity-75 focus-visible:outline-accent-8/90 cursor-default',
  ],
  variants: {
    intent: {
      primary: 'bg-white text-black',
      secondary:
        'bg-gray-3 hover:bg-gray-4 pressed:bg-gray-5 border-gray-6 text-gray-11',
      tertiary:
        'hover:bg-gray-3/35 pressed:bg-gray-5/35 text-gray-11 hover:text-gray-12',
      destructive:
        'bg-destructive-9 pressed:bg-destructive-10 text-destructive-12 border-destructive-6',
    },
    size: {
      xs: 'min-h-8 px-3 py-1 text-xs',
      sm: 'min-h-9 px-4 py-1.5 text-sm',
      md: 'min-h-10 px-4 py-2 text-base',
      lg: '~min-h-6/10 ~px-3/6 ~py-2/3 ~text-lg/xl',
    },
  },
  compoundVariants: [
    {
      intent: ['secondary', 'destructive'],
      className: cx(shadowInsetStyles, 'after:disabled:shadow-none'),
    },
  ],
  defaultVariants: {
    intent: 'tertiary',
    size: 'md',
  },
})
