import { tv } from 'tailwind-variants'

export const buttonStyles = tv({
  slots: {
    root: [
      'box-border isolate',
      'inline-flex items-center justify-center',
      'border font-medium no-underline',
    ],
    icon: '-mx-0.5, my-1 size-4 shrink-0',
  },
  variants: {
    intent: {
      primary: {
        root: [
          'relative text-primary-fg bg-primary border-transparent',
          'before:absolute before:inset-0 before:-z-10 before:bg-primary before:shadow',
          'after:absolute after:inset-0 after:-z-10 after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:active:bg-white/10 after:hover:bg-white/10',
          'dark:after:-inset-px dark:before:hidden dark:border-white/5',
        ],
      },
      secondary: {
        root: '',
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
        root: 'gap-2 h-10 px-4 py-2 text-base lg:text-sm',
      },
      lg: {
        root: 'gap-2.5',
      },
    },
    isDisabled: {
      true: {
        root: 'opacity-60 before:shadow-none after:shadow-none',
      },
    },
  },
  defaultVariants: {
    intent: 'tertiary',
    size: 'md',
  },
})
