'use client'

import { useHover } from '@react-aria/interactions'
import type { ComponentPropsWithoutRef } from 'react'
import { useBackgroundContext } from '~/lib/surfaces/background'

export function BlogPostArticle({
  posterUrl,
  ...props
}: ComponentPropsWithoutRef<'article'> & { posterUrl: string }) {
  const { setBackground } = useBackgroundContext()

  const { hoverProps } = useHover({
    onHoverStart: () => setBackground(posterUrl),
    onHoverEnd: () => setBackground(null),
  })

  return (
    <article
      {...{
        ...props,
        ...hoverProps,
      }}
    />
  )
}
