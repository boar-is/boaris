import { tv } from 'tailwind-variants'

export const buttonStyles = tv({
  base: [
    'relative isolate after:content-none transition',
    'inline-flex items-center justify-center',
    'border border-transparent font-medium no-underline rounded-lg after:rounded-lg',
    'hover:opacity-95 pressed:opacity-90 disabled:opacity-75 focus-visible:outline-ring cursor-default',
  ],
  variants: {
    intent: {
      primary: 'bg-white text-black',
      secondary: 'bg-secondary text-secondary-fg border-white/5',
      tertiary: 'hover:bg-tertiary/35 text-tertiary-fg',
      destructive: 'bg-danger text-danger-fg border-white/15',
    },
    size: {
      xs: 'min-h-8 px-3 py-1 text-xs',
      sm: 'min-h-9 px-4 py-1.5 text-sm',
      md: 'min-h-10 px-4 py-2 text-base',
      lg: 'min-h-10 px-6 py-3 text-xl',
    },
  },
  compoundVariants: [
    {
      intent: ['secondary', 'destructive'],
      className:
        'after:content-[""] after:absolute after:-inset-px after:-z-10 after:shadow-inset after:disabled:shadow-none',
    },
  ],
  defaultVariants: {
    intent: 'tertiary',
    size: 'md',
  },
})
