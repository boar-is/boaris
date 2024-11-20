'use client'

import type { HTMLAttributes } from 'react'
import type { ButtonProps } from 'react-aria-components'
import type { VariantProps } from 'tailwind-variants'
import { buttonStyles } from './button-styles'

export {
  Button,
  type ButtonProps,
  ButtonContext,
  ToggleButton,
  ToggleButtonContext,
} from 'react-aria-components'

export const getButtonProps = (
  props: VariantProps<typeof buttonStyles> = {},
): [buttonProps: ButtonProps, iconProps: HTMLAttributes<HTMLElement>] => {
  const { root, icon } = buttonStyles(props)

  return [
    {
      type: 'button' as const,
      className: root({}),
    },
    {
      className: icon(),
    },
  ]
}
