'use client'

import { useHover } from '@react-aria/interactions'
import { useBackgroundContext } from '~/features/background'
import { Image } from '~/lib/media/image'

export function BlogPostPosterImage({
  url,
  alt,
}: { url: string; alt: string }) {
  const { setBackgroundUrl } = useBackgroundContext()

  const { hoverProps } = useHover({
    onHoverStart: () => setBackgroundUrl(url),
    onHoverEnd: () => setBackgroundUrl(),
  })

  return (
    <Image
      src={url}
      alt={alt}
      width={640}
      height={360}
      className="object-cover sizes-full rounded-xl lg:rounded-2xl"
      {...hoverProps}
    />
  )
}
