'use client'

import type { Ref } from 'react'
import {
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components'
import { type VariantProps, tv } from 'tailwind-variants'
import { cr } from '~/lib/react/cr'

export const linkStyles = tv({
  base: ['text-current'],
})

export interface LinkProps
  extends LinkPrimitiveProps,
    VariantProps<typeof linkStyles> {}

export function Link(
  { className, ...props }: LinkProps,
  ref: Ref<HTMLAnchorElement>,
) {
  return (
    <LinkPrimitive
      ref={ref}
      {...props}
      className={cr(className, (className, renderProps) =>
        linkStyles({ ...renderProps, className }),
      )}
    />
  )
}

export { LinkContext } from 'react-aria-components'
