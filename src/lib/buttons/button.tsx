'use client'

import { forwardRef } from 'react'
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from 'react-aria-components'
import { type VariantProps, tv } from 'tailwind-variants'
import { cr } from '~/lib/react/cr'

export const buttonStyles = tv({
  base: [
    'relative isolate transition',
    'inline-flex items-center justify-center',
    'border font-medium no-underline cursor-default',
  ],
  variants: {
    intent: {
      primary: ['text-bg bg-fg border-transparent'],
      secondary: [
        'bg-secondary text-secondary-fg border-white/5 hover:bg-secondary/90 pressed:bg-secondary/80',
        'after:absolute after:-inset-px after:-z-10 after:shadow-inset',
      ],
      tertiary: '',
      destructive: '',
    },
    size: {
      xs: 'gap-1',
      sm: 'gap-1.5',
      md: ['gap-2 min-h-10 px-4 py-2 text-base lg:text-sm', 'rounded-lg'],
      lg: 'gap-2.5',
    },
    isDisabled: {
      true: 'opacity-60',
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

export interface ButtonProps
  extends ButtonPrimitiveProps,
    VariantProps<typeof buttonStyles> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, intent, size, ...props }, ref) {
    return (
      <ButtonPrimitive
        ref={ref}
        {...props}
        className={cr(className, (className, renderProps) =>
          buttonStyles({
            ...renderProps,
            intent,
            size,
            className,
          }),
        )}
      />
    )
  },
)

export { ButtonContext } from 'react-aria-components'
