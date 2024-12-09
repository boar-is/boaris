'use client'

import type { Ref } from 'react'
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from 'react-aria-components'
import type { VariantProps } from 'tailwind-variants'
import { cr } from '~/lib/react/cr'
import { buttonStyles } from './button-styles'

export interface ButtonProps
  extends ButtonPrimitiveProps,
    VariantProps<typeof buttonStyles> {}

export function Button(
  { className, type, intent, size, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      type={type ?? 'button'}
      className={cr(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          className,
          intent,
          size,
        }),
      )}
    />
  )
}

export { ButtonContext } from 'react-aria-components'
