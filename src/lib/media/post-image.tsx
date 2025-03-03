import { Image, type ImageProps, defaultImageSizes } from './image'

export function PostImage(props: Pick<ImageProps, 'src' | 'alt'>) {
  return <Image {...props} sizes={defaultImageSizes} placeholder="blur" />
}
