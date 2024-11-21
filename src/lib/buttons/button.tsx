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
    'border border-transparent font-medium no-underline cursor-default focus-visible:outline-ring',
    'hover:opacity-90 pressed:opacity-80 disabled:opacity-60',
  ],
  variants: {
    intent: {
      primary: ['text-bg bg-fg'],
      secondary: [
        'bg-secondary text-secondary-fg border-white/5 ',
        'after:absolute after:-inset-px after:-z-10 after:shadow-inset after:disabled:shadow-none',
      ],
      tertiary: 'hover:bg-tertiary text-tertiary-fg',
      destructive: '',
    },
    size: {
      xs: 'gap-1',
      sm: 'gap-1.5',
      md: ['gap-2 min-h-10 px-4 py-2 text-base lg:text-sm', 'rounded-lg'],
      lg: 'gap-2.5',
    },
  },
  compoundVariants: [
    {
      intent: 'secondary',
      size: 'md',
      className: 'after:rounded-lg',
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
  function Button({ className, type, intent, size, ...props }, ref) {
    return (
      <ButtonPrimitive
        ref={ref}
        {...props}
        type={type ?? 'button'}
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
