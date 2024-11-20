import { tv } from 'tailwind-variants'

export const buttonStyles = tv({
  slots: {
    root: [
      'relative isolate transition',
      'inline-flex items-center justify-center',
      'border font-medium no-underline cursor-default',
    ],
    icon: '-mx-0.5, my-1 size-4 shrink-0',
  },
  variants: {
    intent: {
      primary: {
        root: ['text-bg bg-fg border-transparent'],
      },
      secondary: {
        root: [
          'bg-secondary text-secondary-fg border-white/5 hover:bg-secondary/90 pressed:bg-secondary/80',
          'after:absolute after:-inset-px after:-z-10 after:shadow-inset',
        ],
      },
      tertiary: {
        root: '',
      },
      destruction: {
        root: '',
      },
    },
    size: {
      xs: {
        root: 'gap-1',
      },
      sm: {
        root: 'gap-1.5',
      },
      md: {
        root: [
          'min-h-10 gap-2 h-10 px-4 py-2 text-base lg:text-sm',
          'rounded-lg',
        ],
      },
      lg: {
        root: 'gap-2.5',
      },
    },
    isDisabled: {
      true: {
        root: 'opacity-60',
      },
    },
  },
  compoundVariants: [
    {
      intent: 'secondary',
      size: 'md',
      className: 'after:rounded-lg',
    },
    {
      intent: 'secondary',
      isDisabled: true,
      className: 'after:shadow-none',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})
