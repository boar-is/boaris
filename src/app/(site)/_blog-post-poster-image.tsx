'use client'

import { useHover } from '@react-aria/interactions'
import type { ComponentPropsWithoutRef } from 'react'
import { useBackgroundContext } from '~/features/background'

export function BlogPostArticle({
  url,
  ...props
}: ComponentPropsWithoutRef<'article'> & { url: string }) {
  const { setBackgroundUrl } = useBackgroundContext()

  const { hoverProps } = useHover({
    onHoverStart: () => setBackgroundUrl(url),
    onHoverEnd: () => setBackgroundUrl(),
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
