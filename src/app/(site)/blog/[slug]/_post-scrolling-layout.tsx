'use client'

import type { ComponentPropsWithoutRef } from 'react'

export function PostScrollingLayout({
  ...props
}: ComponentPropsWithoutRef<'div'> & {}) {
  return <div {...props}>layout</div>
}
