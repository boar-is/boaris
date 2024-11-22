'use client'

import { forwardRef } from 'react'
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

export const Link = forwardRef<HTMLAnchorElement, LinkPrimitiveProps>(
  function Link({ className, ...props }, ref) {
    return (
      <LinkPrimitive
        ref={ref}
        {...props}
        className={cr(className, (className, renderProps) =>
          linkStyles({ ...renderProps, className }),
        )}
      />
    )
  },
)

export { LinkContext } from 'react-aria-components'
