'use client'

import { useHover } from '@react-aria/interactions'
import type { ComponentPropsWithoutRef } from 'react'
import {
  type BackgroundImageProps,
  useBackgroundContext,
} from '~/lib/surfaces/background'

export function BlogPostArticle({
  posterImageProps,
  ...props
}: ComponentPropsWithoutRef<'article'> & {
  posterImageProps: BackgroundImageProps
}) {
  const { setBackground } = useBackgroundContext()

  const { hoverProps } = useHover({
    onHoverStart: () => setBackground(posterImageProps),
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
