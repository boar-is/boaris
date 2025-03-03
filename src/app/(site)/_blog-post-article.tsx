'use client'

import { useHover } from '@react-aria/interactions'
import type { ComponentPropsWithoutRef } from 'react'
import {
  type BackgroundImageProps,
  useBackgroundContext,
} from '~/lib/surfaces/background'

export function BlogPostArticle({
  thumbnailImageProps,
  ...props
}: ComponentPropsWithoutRef<'article'> & {
  thumbnailImageProps: BackgroundImageProps
}) {
  const { setBackground } = useBackgroundContext()

  const { hoverProps } = useHover({
    onHoverStart: () => setBackground(thumbnailImageProps),
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
