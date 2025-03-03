import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { Image, type ImageProps, defaultImageSizes } from './image'

export function PostImage(props: Pick<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      {...props}
      sizes={defaultImageSizes}
      placeholder="blur"
      className={cx(
        shadowInsetStyles,
        '~rounded-xl/2xl after:~rounded-xl/2xl bg-clip-padding border border-white/10',
      )}
    />
  )
}
