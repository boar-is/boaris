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
    'relative isolate after:content-none transition',
    'inline-flex items-center justify-center',
    'border border-transparent font-medium no-underline rounded-lg after:rounded-lg',
    'hover:opacity-95 pressed:opacity-90 disabled:opacity-75 focus-visible:outline-ring cursor-default',
  ],
  variants: {
    intent: {
      primary:
        'bg-primary text-primary-fg shadow-lg shadow-primary/20 hover:shadow-primary/25 pressed:shadow-primary/30',
      secondary: 'bg-secondary text-secondary-fg border-white/5',
      tertiary: 'hover:bg-tertiary text-tertiary-fg',
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
