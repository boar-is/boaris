'use client'

import {
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components'
import { type VariantProps, tv } from 'tailwind-variants'
import { cr } from '~/lib/react/cr'
import type { WithRef } from '~/lib/react/with-ref'

export const linkStyles = tv({
  base: ['text-current'],
})

export interface LinkProps
  extends LinkPrimitiveProps,
    VariantProps<typeof linkStyles>,
    WithRef<HTMLAnchorElement> {}

export function Link({ className, ref, ...props }: LinkProps) {
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
