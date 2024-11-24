'use client'

import { useHover } from '@react-aria/interactions'
import type { ComponentPropsWithoutRef } from 'react'
import {
  type BackgroundImageProps,
  useBackgroundContext,
} from '~/lib/overlays/background'

export function BlogPostArticle({
  imageProps,
  ...props
}: ComponentPropsWithoutRef<'article'> & { imageProps: BackgroundImageProps }) {
  const { setBackground } = useBackgroundContext()

  const { hoverProps } = useHover({
    onHoverStart: () => setBackground(imageProps),
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
