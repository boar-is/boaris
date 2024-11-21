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
    'border border-transparent font-medium no-underline cursor-default focus-visible:outline-ring rounded-lg',
    'hover:opacity-90 pressed:opacity-80 disabled:opacity-60',
  ],
  variants: {
    intent: {
      primary: 'text-bg bg-fg',
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
      className: 'after:rounded-lg',
    },
    {
      intent: ['secondary', 'destructive'],
      className:
        'after:absolute after:-inset-px after:-z-10 after:shadow-inset after:disabled:shadow-none',
    },
  ],
  defaultVariants: {
    intent: 'secondary',
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
